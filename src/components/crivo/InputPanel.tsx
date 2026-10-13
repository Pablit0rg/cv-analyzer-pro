import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const JOB_LIMIT = 10_000;
const RESUME_LIMIT = 15_000;

interface InputPanelProps {
  job: string;
  resume: string;
  onJobChange: (value: string) => void;
  onResumeChange: (value: string) => void;
}

function Counter({ value, limit }: { value: string; limit: number }) {
  const over = value.length > limit;
  return (
    <span
      className={`font-mono text-xs ${over ? "font-semibold text-destructive" : "text-muted-foreground"}`}
    >
      {value.length.toLocaleString("pt-BR")} / {limit.toLocaleString("pt-BR")}
    </span>
  );
}

export function InputPanel({ job, resume, onJobChange, onResumeChange }: InputPanelProps) {
  const jobOver = job.length > JOB_LIMIT;
  const resumeOver = resume.length > RESUME_LIMIT;
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-2">
        <div className="flex items-baseline justify-between">
          <Label htmlFor="job">Texto da vaga</Label>
          <Counter value={job} limit={JOB_LIMIT} />
        </div>
        <Textarea
          id="job"
          value={job}
          onChange={(e) => onJobChange(e.target.value)}
          placeholder="Cole aqui a descrição completa da vaga..."
          className="min-h-64 resize-y bg-card font-mono text-sm"
          aria-invalid={jobOver}
        />
        {jobOver && (
          <p className="text-sm text-destructive" role="alert">
            O texto da vaga passou do limite de {JOB_LIMIT.toLocaleString("pt-BR")} caracteres.
          </p>
        )}
      </div>
      <div className="space-y-2">
        <div className="flex items-baseline justify-between">
          <Label htmlFor="resume">Seu currículo</Label>
          <Counter value={resume} limit={RESUME_LIMIT} />
        </div>
        <Textarea
          id="resume"
          value={resume}
          onChange={(e) => onResumeChange(e.target.value)}
          placeholder="Cole aqui o texto do seu currículo..."
          className="min-h-64 resize-y bg-card font-mono text-sm"
          aria-invalid={resumeOver}
        />
        {resumeOver && (
          <p className="text-sm text-destructive" role="alert">
            O currículo passou do limite de {RESUME_LIMIT.toLocaleString("pt-BR")} caracteres.
          </p>
        )}
      </div>
    </div>
  );
}

export { JOB_LIMIT, RESUME_LIMIT };
