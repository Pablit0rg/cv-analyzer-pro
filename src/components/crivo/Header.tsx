import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="border-b border-border">
      <div className="mx-auto max-w-5xl px-4 py-6">
        <h1 className="text-2xl font-bold tracking-tight">Crivo</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Analisador de currículo ATS: compare seu currículo com a vaga e veja o match de
          palavras-chave.
        </p>
        <Collapsible open={open} onOpenChange={setOpen} className="mt-4">
          <CollapsibleTrigger className="inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline">
            Como funciona
            <ChevronDown
              className={`size-4 transition-transform ${open ? "rotate-180" : ""}`}
              aria-hidden
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3 rounded-md border border-border bg-card p-4 text-sm leading-relaxed text-card-foreground">
            <ol className="list-decimal space-y-2 pl-5">
              <li>
                Cole o texto da vaga e o seu currículo nos campos abaixo. Nada é enviado para
                nenhum servidor nesta etapa.
              </li>
              <li>
                O Crivo lê a vaga e identifica as competências pedidas, separando as obrigatórias
                das desejáveis pelos títulos das seções (como "Requisitos" e "Diferenciais").
              </li>
              <li>
                Cada competência é procurada no seu currículo, reconhecendo sinônimos, siglas e
                variações de escrita (por exemplo, "js" conta como JavaScript).
              </li>
              <li>
                O match é um percentual simples: competências obrigatórias pesam o dobro das
                desejáveis. O cálculo é sempre o mesmo para os mesmos textos — sem IA, sem
                adivinhação.
              </li>
              <li>
                Se quiser, você pode pedir uma versão ajustada do currículo. Só nesse momento, e
                somente após o seu clique, os textos saem do navegador.
              </li>
            </ol>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </header>
  );
}
