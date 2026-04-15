import { Card, CardContent } from "@/components/ui/card";

interface ItemSpecsProps {
  specEntries: [string, unknown][];
  notes?: string;
}

export function ItemSpecs({ specEntries, notes }: ItemSpecsProps) {
  return (
    <>
      {specEntries.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <h2 className="mb-3 text-lg font-semibold">Specifications</h2>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {specEntries.map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between rounded-md bg-muted/50 px-3 py-2"
                >
                  <span className="text-sm capitalize text-muted-foreground">
                    {key.replace(/_/g, " ")}
                  </span>
                  <span className="text-sm font-medium">{String(value)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {notes && (
        <Card>
          <CardContent className="p-4">
            <h2 className="mb-2 text-lg font-semibold">Notes</h2>
            <p className="text-sm text-muted-foreground">{notes}</p>
          </CardContent>
        </Card>
      )}
    </>
  );
}
