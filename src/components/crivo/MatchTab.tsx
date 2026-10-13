import type { AnalysisResult, KeywordResult, Level } from "@/lib/analysis";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const LEVEL_LABEL: Record<Level, string> = {
  obrigatoria: "Obrigatórias",
  desejavel: "Desejáveis",
};

const TYPE_LABEL: Record<KeywordResult["type"], string> = {
  tecnica: "técnica",
  comportamental: "comportamental",
};

function KeywordBadge({ keyword }: { keyword: KeywordResult }) {
  const badge = keyword.found ? (
    <Badge className="bg-success text-success-foreground">
      {keyword.canonical} · encontrada · {TYPE_LABEL[keyword.type]}
    </Badge>
  ) : (
    <Badge className="bg-warning text-warning-foreground">
      {keyword.canonical} · faltando · {TYPE_LABEL[keyword.type]}
    </Badge>
  );
  if (keyword.found) return badge;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="inline-flex cursor-help">{badge}</span>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">{keyword.suggestion}</TooltipContent>
    </Tooltip>
  );
}

function LevelGroup({ level, keywords }: { level: Level; keywords: KeywordResult[] }) {
  const items = keywords.filter((k) => k.level === level);
  if (items.length === 0) return null;
  const found = items.filter((k) => k.found);
  const missing = items.filter((k) => !k.found);
  return (
    <section className="space-y-3">
      <h3 className="text-sm font-semibold">
        {LEVEL_LABEL[level]}{" "}
        <span className="font-normal text-muted-foreground">
          ({found.length} de {items.length} encontradas)
        </span>
      </h3>
      {missing.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {missing.map((k) => (
            <KeywordBadge key={k.id} keyword={k} />
          ))}
        </div>
      )}
      {found.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {found.map((k) => (
            <KeywordBadge key={k.id} keyword={k} />
          ))}
        </div>
      )}
    </section>
  );
}

export function MatchTab({ result }: { result: AnalysisResult }) {
  if (result.match === null) {
    return (
      <div className="rounded-md border border-border bg-card p-4 text-sm text-card-foreground">
        Não encontramos competências conhecidas no texto da vaga. Confira se você colou a descrição
        completa da vaga.
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-4xl font-semibold">{result.match}%</span>
          <span className="text-sm text-muted-foreground">de match com a vaga</span>
        </div>
        <Progress value={result.match} aria-label={`Match de ${result.match} por cento`} />
      </div>
      <LevelGroup level="obrigatoria" keywords={result.keywords} />
      <LevelGroup level="desejavel" keywords={result.keywords} />
    </div>
  );
}
