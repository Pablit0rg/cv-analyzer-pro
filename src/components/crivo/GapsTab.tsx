import type { AnalysisResult, Level } from "@/lib/analysis";

const GROUPS: { level: Level; label: string }[] = [
  { level: "obrigatoria", label: "Obrigatórias" },
  { level: "desejavel", label: "Desejáveis" },
];

export function GapsTab({ result }: { result: AnalysisResult }) {
  const missing = result.keywords.filter((keyword) => !keyword.found);

  if (result.match === null) {
    return <p className="text-sm text-muted-foreground">Nenhuma competência reconhecida na vaga.</p>;
  }
  if (missing.length === 0) {
    return <p className="text-sm text-muted-foreground">Nenhuma competência faltante nesta análise.</p>;
  }

  return (
    <div className="space-y-6">
      {GROUPS.map(({ level, label }) => {
        const items = missing.filter((keyword) => keyword.level === level);
        if (items.length === 0) return null;
        return (
          <section key={level} className="space-y-3">
            <h3 className="text-sm font-semibold">{label}</h3>
            <ul className="divide-y divide-border">
              {items.map((keyword) => (
                <li key={keyword.id} className="space-y-1 py-3 first:pt-0">
                  <h4 className="text-sm font-medium">{keyword.canonical}</h4>
                  <p className="text-sm text-muted-foreground">{keyword.suggestion}</p>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}