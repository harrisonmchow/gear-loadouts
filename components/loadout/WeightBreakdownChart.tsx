"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { formatWeight } from "@/lib/utils";
import { getGearCategoryMeta } from "@/lib/gear-categories";
import { usePreferences } from "@/stores/preferences";
import type { LoadoutItemWithGear } from "@/types";

interface WeightBreakdownChartProps {
  items: LoadoutItemWithGear[];
}

interface ChartDatum {
  slotType: string;
  label: string;
  weight: number;
  color: string;
}

export function WeightBreakdownChart({ items }: WeightBreakdownChartProps) {
  const { weightUnit } = usePreferences();

  const data: ChartDatum[] = items
    .map((item) => {
      const meta = getGearCategoryMeta(item.slotType);
      return {
        slotType: item.slotType,
        label: meta.label,
        weight: (item.gear.weightGrams ?? 0) * item.quantity,
        color: meta.color,
      };
    })
    .filter((d) => d.weight > 0);

  const totalWeight = data.reduce((sum, d) => sum + d.weight, 0);

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Weight Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Add gear with weights to see a breakdown.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Weight Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-2">
          {/* Donut chart with centre label */}
          <div className="relative h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="weight"
                  nameKey="label"
                  cx="50%"
                  cy="50%"
                  innerRadius="62%"
                  outerRadius="90%"
                  paddingAngle={2}
                  stroke="none"
                >
                  {data.map((d) => (
                    <Cell key={d.slotType} fill={d.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [
                    formatWeight(value, weightUnit),
                    "Weight",
                  ]}
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid #e5e7eb",
                    fontSize: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xs text-muted-foreground">Total</span>
              <span className="text-2xl font-semibold">
                {formatWeight(totalWeight, weightUnit)}
              </span>
            </div>
          </div>

          {/* Legend with per-category weights */}
          <ul className="space-y-2">
            {data
              .slice()
              .sort((a, b) => b.weight - a.weight)
              .map((d) => {
                const pct = totalWeight > 0 ? (d.weight / totalWeight) * 100 : 0;
                return (
                  <li
                    key={d.slotType}
                    className="flex items-center gap-3 text-sm"
                  >
                    <span
                      className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: d.color }}
                    />
                    <span className="flex-1 truncate text-muted-foreground">
                      {d.label}
                    </span>
                    <span className="font-medium tabular-nums">
                      {formatWeight(d.weight, weightUnit)}
                    </span>
                    <span className="w-10 text-right text-xs tabular-nums text-muted-foreground">
                      {pct.toFixed(0)}%
                    </span>
                  </li>
                );
              })}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
