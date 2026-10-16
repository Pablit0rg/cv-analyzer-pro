import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { AnalysisResult } from "@/lib/analysis";
import { newTechnicalTerms } from "@/lib/analysis/fidelity-terms";
import { rewriteResume } from "@/lib/rewrite.functions";
import type { Rewrite } from "@/lib/rewrite.schema";

interface Props {
  job: string;
  resume: string;
  result?: AnalysisResult;
}

export function AdjustedResumeTab({ job, resume }: Props) {
  const generate = useServerFn(rewriteResume);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Rewrite | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const r = await generate({
        data: {
          job,
          resume,
        },
      });
      if (r.ok) setData(r.data);
      else setError(r.message);
    } catch {
      setError("Não foi possível gerar agora. A análise de match continua funcionando.");
    } finally {
      setLoading(false);
    }
  };

  const plainText = data
    ? data.secoes.map((s) => [s.titulo.toUpperCase(), ...s.itens.map((i) => `- ${i}`)].join("\n")).join("\n\n")
    : "";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(plainText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <Button onClick={handleGenerate} disabled={loading}>
          {loading ? "Gerando..." : "Gerar versão ATS"}
        </Button>
        {data && (
          <Button variant="outline" onClick={handleCopy}>
            {copied ? "Copiado" : "Copiar texto"}
          </Button>
        )}
      </div>

      {loading && (
        <div className="space-y-2" aria-label="Gerando">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" aria-hidden />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {data && (
        <div className="space-y-5">
          {data.secoes.map((s, si) => (
            <section key={si} className="space-y-2">
              <h3 className="text-sm font-semibold uppercase tracking-wide">{s.titulo}</h3>
              <ul className="space-y-1.5 text-sm">
                {s.itens.map((item, ii) => {
                  const flagged = newTechnicalTerms(resume, item);
                  return (
                    <li key={ii}>
                      <span className={flagged.length ? "text-destructive" : undefined}>
                        – {item}
                      </span>
                      {flagged.length > 0 && (
                        <span className="block text-xs text-destructive">
                          Confira: este termo não estava no seu currículo ({flagged.join(", ")})
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
          {data.avisos.length > 0 && (
            <div className="space-y-1 border-t pt-3 text-sm text-muted-foreground">
              <p className="font-medium">Avisos da IA</p>
              <ul className="list-disc pl-5">
                {data.avisos.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
