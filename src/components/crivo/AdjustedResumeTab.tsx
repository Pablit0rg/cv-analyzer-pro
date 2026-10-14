import { Button } from "@/components/ui/button";

export function AdjustedResumeTab() {
  return (
    <div className="space-y-3">
      <Button disabled>Gerar currículo ajustado</Button>
      <p className="text-sm text-muted-foreground">
        Disponível em breve: a IA vai reorganizar seu currículo usando só o que já está nele
      </p>
    </div>
  );
}