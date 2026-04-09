"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

interface RadarItem {
  name: string;
  ratings: Record<string, number>;
  color: string;
}

interface GearRadarChartProps {
  items: RadarItem[];
  fields: string[];
}

function formatFieldLabel(field: string): string {
  return field
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function GearRadarChart({ items, fields }: GearRadarChartProps) {
  const data = fields.map((field) => {
    const entry: Record<string, string | number> = {
      field: formatFieldLabel(field),
    };
    items.forEach((item, i) => {
      entry[`item${i}`] = item.ratings[field] ?? 0;
    });
    return entry;
  });

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={280}>
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis
            dataKey="field"
            tick={{ fontSize: 11, fill: "#6b7280" }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 5]}
            tick={{ fontSize: 10, fill: "#9ca3af" }}
            tickCount={6}
          />
          {items.map((item, i) => (
            <Radar
              key={item.name}
              name={item.name}
              dataKey={`item${i}`}
              stroke={item.color}
              strokeWidth={2.5}
              fill={item.color}
              fillOpacity={0.2}
            />
          ))}
        </RadarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-2">
        {items.map((item) => (
          <div key={item.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
