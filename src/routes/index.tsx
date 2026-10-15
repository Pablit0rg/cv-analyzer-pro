import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { analyze, EXAMPLE_JOB, EXAMPLE_RESUME, type AnalysisResult } from "@/lib/analysis";
import { Header } from "@/components/crivo/Header";
import { InputPanel, JOB_LIMIT, RESUME_LIMIT } from "@/components/crivo/InputPanel";
import { MatchTab } from "@/components/crivo/MatchTab";
import { GapsTab } from "@/components/crivo/GapsTab";
import { AdjustedResumeTab } from "@/components/crivo/AdjustedResumeTab";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Crivo — Analisador de Currículo ATS" },
      {
        name: "description",
        content:
          "Compare seu currículo com a vaga e veja o match de palavras-chave. Análise no navegador, sem cadastro e sem enviar nada.",
      },
      { property: "og:title", content: "Crivo — Analisador de Currículo ATS" },
      {
        property: "og:description",
        content:
          "Compare seu currículo com a vaga e veja o match de palavras-chave. Análise no navegador, sem cadastro e sem enviar nada.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  const [job, setJob] = useState("");
  const [resume, setResume] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const jobInvalid = job.trim() === "" || job.length > JOB_LIMIT;
  const resumeInvalid = resume.trim() === "" || resume.length > RESUME_LIMIT;
  const canAnalyze = !jobInvalid && !resumeInvalid;

  const handleJobChange = (value: string) => {
    setJob(value);
    setResult(null);
  };
  const handleResumeChange = (value: string) => {
    setResume(value);
    setResult(null);
  };
  const handleExample = () => {
    setJob(EXAMPLE_JOB);
    setResume(EXAMPLE_RESUME);
    setResult(null);
  };
  const handleAnalyze = () => {
    setResult(analyze(job, resume));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="mx-auto max-w-5xl space-y-6 px-4 py-8">
        <InputPanel
          job={job}
          resume={resume}
          onJobChange={handleJobChange}
          onResumeChange={handleResumeChange}
        />

        <Alert>
          <ShieldCheck className="size-4" aria-hidden />
          <AlertTitle>Privacidade</AlertTitle>
          <AlertDescription>
            A análise de match acontece no seu navegador. Só a reescrita (botão Gerar versão ATS)
            envia o texto a um modelo de IA. O Crivo não salva nada.
          </AlertDescription>
        </Alert>

        <p className="text-sm font-medium text-muted-foreground">
          O Crivo nunca inventa experiência: ele só reorganiza e destaca o que já está no seu
          currículo.
        </p>

        <div className="flex flex-wrap gap-3">
          <Button onClick={handleAnalyze} disabled={!canAnalyze}>
            Analisar
          </Button>
          <Button variant="outline" onClick={handleExample}>
            Usar exemplo
          </Button>
        </div>

        {result && (
          <Tabs defaultValue="match">
            <TabsList>
              <TabsTrigger value="match">Match</TabsTrigger>
              <TabsTrigger value="gaps">Lacunas</TabsTrigger>
              <TabsTrigger value="adjusted">Currículo ajustado</TabsTrigger>
            </TabsList>
            <TabsContent value="match" className="pt-4">
              <MatchTab result={result} />
            </TabsContent>
            <TabsContent value="gaps" className="pt-4">
              <GapsTab result={result} />
            </TabsContent>
            <TabsContent value="adjusted" className="pt-4">
              <AdjustedResumeTab />
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  );
}
