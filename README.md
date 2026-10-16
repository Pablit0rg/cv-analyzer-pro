# Crivo — Analisador de Currículo ATS

O **Crivo** é uma aplicação web de análise e adequação de currículos para sistemas de rastreamento de candidatos (*Applicant Tracking Systems* — ATS). O projeto nasceu como um desafio prático de curso e foi desenhado com foco em transparência, determinismo na análise e proteção dos dados de quem o utiliza.

## O que o Crivo faz

1. **Análise de Match Determinística**: compara o texto da vaga com o texto do currículo usando um dicionário curado de competências técnicas, comportamentais e de idiomas, reconhecendo sinônimos, variações e termos compostos.
2. **Mapeamento de Lacunas**: separa os requisitos presentes na vaga que ainda não aparecem no currículo, diferenciando itens obrigatórios e desejáveis com sugestões práticas de preenchimento.
3. **Reescrita ATS com Verificação de Fidelidade**: reorganiza opcionalmente o currículo em seções compatíveis com leitores ATS (Resumo, Experiência, Formação, Habilidades, Idiomas) por meio de IA e audita cada tópico gerado contra o currículo original, sinalizando em vermelho qualquer termo técnico ou número (anos, percentuais, quantidades, datas) que não estivesse no documento original.
4. **Exportação em PDF ATS-friendly**: gera no navegador o arquivo `curriculo-ats.pdf` em coluna única, com fonte padrão e texto selecionável, contendo apenas as seções do currículo ajustado (sem incluir avisos da IA nem alertas de fidelidade).

## Como o cálculo de match funciona

O cálculo do percentual de compatibilidade é 100% determinístico e executado localmente:

- **Classificação por seção**: a descrição da vaga é segmentada em seções de requisitos obrigatórios e de diferenciais/desejáveis (quando a vaga não possui subtítulos explícitos, todos os requisitos identificados são tratados como obrigatórios).
- **Pesos**:
  - Requisitos **obrigatórios** possuem **peso 2**.
  - Requisitos **desejáveis** (diferenciais) possuem **peso 1**.
- **Fórmula**: a pontuação final corresponde à soma dos pesos das competências da vaga encontradas no currículo dividida pela soma total dos pesos das competências exigidas pela vaga, arredondada para o inteiro percentual mais próximo (`0%` a `100%`).

## Tese de privacidade

- **Match 100% no navegador**: toda a análise de compatibilidade e de lacunas acontece exclusivamente no cliente (navegador), sem enviar currículo ou vaga para servidores externos.
- **Envio sob demanda apenas na reescrita**: os textos de currículo e vaga só são transmitidos ao servidor e ao modelo de IA quando a pessoa clica explicitamente em **"Gerar versão ATS"** na aba *Currículo ajustado*. A exportação em PDF também ocorre inteiramente no navegador.
- **Nada é salvo**: o Crivo não exige cadastro, não utiliza banco de dados para armazenar currículos ou vagas e nunca registra o conteúdo enviado em logs.

## Limitações conhecidas

- **Ausência de limite de chamadas por usuário (*rate limit*)**: a aplicação não implementa controle individual de frequência de requisições por usuário ou IP na função de reescrita.
- **Dependência da cota do plano**: a geração da versão ATS depende da disponibilidade e dos créditos do gateway de IA configurado no ambiente (`LOVABLE_API_KEY`). Quando a cota do plano é atingida ou o serviço falha, a reescrita retorna um aviso amigável, mas a análise determinística de match e lacunas continua funcionando normalmente no navegador.
- **Escopo do dicionário**: a análise determinística reconhece apenas competências cadastradas no dicionário interno e suas variações previstas.

## Como o projeto foi construído

O processo de construção do Crivo — da pesquisa inicial e prototipação ao mega prompt enviado ao Lovable e às correções posteriores — está documentado em [docs/PROMPT.md](docs/PROMPT.md).

## Como rodar o projeto e os testes

Pré-requisitos: Node.js (v20+) e npm.

```sh
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Executar a suíte de testes automatizados
npx vitest run

# Executar a checagem estática de tipos (TypeScript)
npx tsc --noEmit
```
