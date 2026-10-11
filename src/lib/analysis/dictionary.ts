export type CompetencyType = "tecnica" | "comportamental";

export interface Competency {
  id: string;
  canonical: string;
  type: CompetencyType;
  variants: string[];
  /** Fixed suggestion of how to develop the skill (study or practice). */
  suggestion: string;
}

type Row = [canonical: string, variants: string[], suggestion: string];

const tecnicas: Row[] = [
  ["JavaScript", ["js", "javascript", "ecmascript", "es6"], "Faça um curso gratuito de JavaScript e construa uma pequena aplicação interativa no navegador."],
  ["TypeScript", ["ts", "typescript"], "Migre um projeto seu de JavaScript para TypeScript, tipando as funções principais."],
  ["HTML", ["html", "html5"], "Monte uma página pessoal só com HTML semântico e valide no validador do W3C."],
  ["CSS", ["css", "css3"], "Recrie o layout de um site conhecido usando Flexbox e Grid."],
  ["Sass", ["sass", "scss"], "Refatore o CSS de um projeto para Sass usando variáveis e mixins."],
  ["Tailwind CSS", ["tailwind", "tailwindcss", "tailwind css"], "Construa uma landing page simples com Tailwind seguindo a documentação oficial."],
  ["Bootstrap", ["bootstrap"], "Crie um painel responsivo usando o grid e os componentes do Bootstrap."],
  ["React", ["react", "react.js", "reactjs"], "Siga o tutorial oficial do React e publique um app de lista de tarefas."],
  ["Next.js", ["next.js", "nextjs"], "Crie um blog com Next.js usando rotas e páginas estáticas."],
  ["Vue.js", ["vue", "vue.js", "vuejs"], "Faça o guia oficial do Vue e construa um pequeno catálogo de produtos."],
  ["Angular", ["angular", "angularjs"], "Siga o tutorial Tour of Heroes do Angular até o fim."],
  ["Svelte", ["svelte", "sveltekit"], "Faça o tutorial interativo do Svelte e publique um app simples."],
  ["Redux", ["redux", "redux toolkit"], "Adicione gerenciamento de estado com Redux Toolkit a um projeto React."],
  ["Node.js", ["node", "node.js", "nodejs"], "Crie uma API simples com Node.js que leia e grave dados em arquivo."],
  ["Express", ["express", "express.js", "expressjs"], "Construa uma API REST com Express com rotas de CRUD."],
  ["NestJS", ["nestjs", "nest.js"], "Siga a documentação do NestJS e crie um módulo com controller e service."],
  ["Python", ["python", "python3"], "Resolva exercícios de Python em plataformas gratuitas e automatize uma tarefa do seu dia a dia."],
  ["Django", ["django"], "Faça o tutorial oficial do Django e publique o app de enquetes."],
  ["Flask", ["flask"], "Crie uma API pequena com Flask e documente os endpoints."],
  ["FastAPI", ["fastapi"], "Monte uma API com FastAPI e explore a documentação automática gerada."],
  ["Java", ["java"], "Estude orientação a objetos em Java e crie um sistema de cadastro em linha de comando."],
  ["Spring Boot", ["spring", "spring boot", "springboot"], "Crie uma API REST com Spring Boot conectada a um banco em memória."],
  ["Kotlin", ["kotlin"], "Faça os exercícios do Kotlin Koans e crie um app Android simples."],
  ["C#", ["c#", "csharp"], "Faça o curso introdutório de C# da Microsoft Learn e crie um app de console."],
  [".NET", [".net", "dotnet", ".net core"], "Construa uma API mínima com .NET seguindo a documentação oficial."],
  ["ASP.NET", ["asp.net", "asp.net core", "aspnet"], "Crie um projeto ASP.NET Core com uma página e uma API."],
  ["C++", ["c++", "cpp"], "Resolva problemas de algoritmos em C++ para praticar a linguagem."],
  ["PHP", ["php"], "Crie um formulário com PHP que grave dados em um banco MySQL."],
  ["Laravel", ["laravel"], "Siga o bootcamp oficial do Laravel e publique o projeto."],
  ["Ruby", ["ruby"], "Faça exercícios básicos de Ruby e escreva scripts de automação."],
  ["Ruby on Rails", ["rails", "ruby on rails"], "Siga o guia Getting Started do Rails e crie um blog."],
  ["Go", ["golang", "linguagem go"], "Faça o Tour of Go e crie um pequeno servidor HTTP."],
  ["Rust", ["rust"], "Leia os primeiros capítulos do livro oficial de Rust e faça os exercícios."],
  ["Swift", ["swift"], "Crie um app iOS simples com Swift seguindo os tutoriais da Apple."],
  ["Dart", ["dart"], "Faça os exercícios introdutórios de Dart antes de começar com Flutter."],
  ["Flutter", ["flutter"], "Construa um app de lista de compras com Flutter."],
  ["React Native", ["react native"], "Crie um app mobile simples com React Native e Expo."],
  ["Android", ["android"], "Siga o curso Android Basics do Google e publique um app de estudo."],
  ["iOS", ["ios"], "Faça um app de exemplo para iOS com SwiftUI."],
  ["SQL", ["sql"], "Pratique consultas SQL com JOIN e GROUP BY em um banco de exemplo."],
  ["Banco de dados", ["banco de dados", "base de dados", "database", "databases"], "Modele o banco de um sistema pequeno (por exemplo, uma biblioteca) e crie as tabelas."],
  ["Modelagem de dados", ["modelagem de dados", "modelagem de banco de dados"], "Desenhe um diagrama entidade-relacionamento para um projeto seu."],
  ["PostgreSQL", ["postgres", "postgresql", "psql"], "Instale o PostgreSQL localmente e use-o em um projeto de API."],
  ["MySQL", ["mysql"], "Crie um banco MySQL para um projeto e pratique consultas."],
  ["SQL Server", ["sql server", "mssql"], "Instale o SQL Server Express e pratique consultas com T-SQL."],
  ["Oracle", ["oracle", "oracle database"], "Faça os tutoriais gratuitos do Oracle Live SQL."],
  ["SQLite", ["sqlite"], "Use SQLite como banco em um app pequeno de anotações."],
  ["MongoDB", ["mongodb", "mongo"], "Faça o curso gratuito da MongoDB University e use-o em uma API."],
  ["Redis", ["redis"], "Adicione cache com Redis a uma API de estudo."],
  ["Firebase", ["firebase"], "Crie um app com autenticação e banco em tempo real usando Firebase."],
  ["ORM", ["orm"], "Use um ORM (Prisma, Sequelize ou Hibernate) em um projeto com banco."],
  ["Prisma", ["prisma"], "Conecte um projeto Node.js a um banco usando Prisma."],
  ["APIs REST", ["api", "apis", "rest", "restful", "api rest", "apis rest", "api restful", "apis restful"], "Construa uma API REST com rotas de CRUD e teste com Postman ou Insomnia."],
  ["GraphQL", ["graphql"], "Crie uma API GraphQL simples e consuma-a em um front-end."],
  ["JSON", ["json"], "Pratique leitura e escrita de JSON consumindo uma API pública."],
  ["Microsserviços", ["microsservicos", "microservicos", "microservices", "microsservico"], "Divida um projeto pequeno em dois serviços que conversam por HTTP."],
  ["Mensageria", ["mensageria", "rabbitmq", "kafka", "fila de mensagens"], "Faça um exemplo com RabbitMQ enviando e consumindo mensagens."],
  ["Git", ["git"], "Pratique branches, merge e resolução de conflitos em um repositório seu."],
  ["GitHub", ["github"], "Publique seus projetos no GitHub com README explicando como rodar."],
  ["GitLab", ["gitlab"], "Hospede um projeto no GitLab e configure um pipeline simples."],
  ["Versionamento de código", ["versionamento", "controle de versao", "versionamento de codigo"], "Mantenha um projeto com commits pequenos e mensagens claras."],
  ["CI/CD", ["ci/cd", "integracao continua", "entrega continua", "deploy continuo", "ci cd"], "Configure um pipeline no GitHub Actions que rode os testes a cada push."],
  ["GitHub Actions", ["github actions"], "Crie um workflow do GitHub Actions que faça lint e testes."],
  ["Jenkins", ["jenkins"], "Rode o Jenkins localmente e crie um job que execute os testes de um projeto."],
  ["Docker", ["docker", "containers", "conteineres", "container"], "Crie um Dockerfile para um projeto seu e rode-o em container."],
  ["Docker Compose", ["docker compose", "docker-compose"], "Suba uma aplicação com banco de dados usando Docker Compose."],
  ["Kubernetes", ["kubernetes", "k8s"], "Faça o tutorial interativo do Kubernetes e implante um app de exemplo."],
  ["AWS", ["aws", "amazon web services"], "Use o nível gratuito da AWS para hospedar um site estático no S3."],
  ["Azure", ["azure", "microsoft azure"], "Faça a trilha AZ-900 da Microsoft Learn e publique um app no Azure."],
  ["Google Cloud", ["gcp", "google cloud", "google cloud platform"], "Explore o nível gratuito do Google Cloud implantando uma função simples."],
  ["Computação em nuvem", ["cloud", "nuvem", "computacao em nuvem", "cloud computing"], "Estude os conceitos básicos de nuvem e publique um projeto em um provedor gratuito."],
  ["Serverless", ["serverless", "lambda"], "Crie uma função serverless que responda a uma requisição HTTP."],
  ["Linux", ["linux", "ubuntu"], "Use Linux no dia a dia e pratique comandos de terminal."],
  ["Terminal", ["terminal", "shell", "bash", "linha de comando"], "Automatize uma tarefa repetitiva com um script em Bash."],
  ["DevOps", ["devops"], "Estude os fundamentos de DevOps e automatize o deploy de um projeto pessoal."],
  ["Terraform", ["terraform"], "Crie um recurso simples de nuvem usando Terraform."],
  ["Nginx", ["nginx"], "Configure o Nginx como proxy reverso para uma aplicação local."],
  ["Testes unitários", ["testes unitarios", "teste unitario", "unit test", "unit tests", "testes de unidade"], "Escreva testes unitários para as funções principais de um projeto seu."],
  ["Testes de integração", ["testes de integracao", "teste de integracao", "integration tests"], "Adicione testes de integração a uma API de estudo, testando as rotas com o banco."],
  ["Testes end-to-end", ["testes e2e", "e2e", "testes end-to-end", "testes end to end", "end-to-end"], "Escreva um teste end-to-end com Cypress ou Playwright para um fluxo do seu app."],
  ["Testes de acessibilidade", ["testes de acessibilidade", "teste de acessibilidade"], "Audite um projeto com Lighthouse e axe e corrija os problemas encontrados."],
  ["Testes automatizados", ["testes automatizados", "automacao de testes", "teste automatizado"], "Monte uma suíte de testes automatizados que rode a cada alteração."],
  ["TDD", ["tdd", "desenvolvimento orientado a testes"], "Desenvolva uma pequena funcionalidade escrevendo o teste antes do código."],
  ["Jest", ["jest"], "Adicione Jest a um projeto JavaScript e escreva os primeiros testes."],
  ["Vitest", ["vitest"], "Configure o Vitest em um projeto Vite e escreva testes de funções."],
  ["Cypress", ["cypress"], "Crie testes de interface com Cypress para um formulário."],
  ["Playwright", ["playwright"], "Escreva um teste com Playwright que percorra o fluxo principal de um site."],
  ["Selenium", ["selenium"], "Automatize um formulário web com Selenium."],
  ["JUnit", ["junit"], "Escreva testes com JUnit para as classes de um projeto Java."],
  ["Pytest", ["pytest"], "Adicione testes com pytest a um script Python seu."],
  ["Qualidade de software", ["qa", "qualidade de software", "quality assurance"], "Estude os fundamentos de QA e crie um plano de testes para um projeto."],
  ["Acessibilidade", ["acessibilidade", "wcag", "a11y"], "Estude as diretrizes WCAG e aplique-as em uma página sua."],
  ["Design responsivo", ["responsivo", "responsividade", "design responsivo", "layout responsivo", "mobile first"], "Adapte um projeto seu para funcionar bem em celular, tablet e desktop."],
  ["UX/UI", ["ux", "ui", "ux/ui", "ui/ux", "experiencia do usuario", "interface do usuario"], "Faça um curso introdutório de UX e redesenhe uma tela de um projeto seu."],
  ["Figma", ["figma"], "Prototipe as telas de um projeto no Figma antes de codar."],
  ["SEO", ["seo"], "Aplique boas práticas de SEO em uma página e meça com Lighthouse."],
  ["Webpack", ["webpack"], "Configure o Webpack do zero em um projeto pequeno para entender o build."],
  ["Vite", ["vite"], "Crie um projeto com Vite e explore o build e o servidor de desenvolvimento."],
  ["npm", ["npm", "yarn", "pnpm"], "Publique um pacote simples no npm para entender o ecossistema."],
  ["Front-end", ["front-end", "frontend", "front end"], "Construa e publique um projeto front-end completo com HTML, CSS e JavaScript."],
  ["Back-end", ["back-end", "backend", "back end"], "Construa uma API com autenticação e banco de dados."],
  ["Full stack", ["full stack", "fullstack", "full-stack"], "Faça um projeto que tenha front-end e back-end integrados e publicados."],
  ["Programação orientada a objetos", ["poo", "orientacao a objetos", "programacao orientada a objetos", "oop"], "Estude os pilares da orientação a objetos e aplique em um projeto pequeno."],
  ["Programação funcional", ["programacao funcional"], "Refatore um código usando funções puras, map, filter e reduce."],
  ["Estruturas de dados", ["estruturas de dados", "estrutura de dados"], "Implemente listas, pilhas, filas e árvores em uma linguagem que você conhece."],
  ["Algoritmos", ["algoritmos", "algoritmo", "logica de programacao"], "Resolva exercícios de lógica e algoritmos em plataformas gratuitas."],
  ["Design patterns", ["design patterns", "padroes de projeto"], "Estude os padrões de projeto mais comuns e aplique um deles em um projeto."],
  ["Clean Code", ["clean code", "codigo limpo"], "Leia sobre Clean Code e refatore um projeto antigo seu."],
  ["SOLID", ["solid"], "Estude os princípios SOLID com exemplos e aplique-os em um projeto."],
  ["Arquitetura de software", ["arquitetura de software", "clean architecture", "arquitetura limpa"], "Organize um projeto em camadas e documente as decisões."],
  ["Segurança da informação", ["seguranca da informacao", "owasp", "seguranca"], "Estude o OWASP Top 10 e corrija vulnerabilidades em um projeto de estudo."],
  ["Autenticação", ["autenticacao", "jwt", "oauth", "login"], "Implemente login com JWT em uma API de estudo."],
  ["Power BI", ["power bi", "powerbi"], "Monte um dashboard no Power BI com uma base de dados pública."],
  ["Excel", ["excel", "planilhas"], "Pratique fórmulas, tabelas dinâmicas e gráficos com dados públicos."],
  ["Análise de dados", ["analise de dados", "data analysis"], "Analise uma base pública e escreva um relatório com as conclusões."],
  ["Pandas", ["pandas"], "Explore uma base de dados pública com Pandas em um notebook."],
  ["Machine Learning", ["machine learning", "aprendizado de maquina"], "Faça um curso introdutório de Machine Learning e treine um modelo simples."],
  ["Jira", ["jira"], "Organize um projeto pessoal em um quadro no Jira."],
  ["Inglês", ["ingles", "english"], "Pratique leitura de documentação técnica em inglês e faça conversação semanal."],
  ["Espanhol", ["espanhol", "spanish"], "Pratique espanhol com aplicativos e conteúdos da área de tecnologia."],
  ["Scrum", ["scrum", "sprint", "sprints"], "Estude o Guia do Scrum e organize um projeto pessoal em sprints."],
  ["Kanban", ["kanban"], "Gerencie suas tarefas de estudo em um quadro Kanban."],
  ["Metodologias ágeis", ["metodologias ageis", "metodologia agil", "agil", "agile", "metodos ageis"], "Estude o Manifesto Ágil e participe de um projeto em equipe usando práticas ágeis."],
];

const comportamentais: Row[] = [
  ["Trabalho em equipe", ["trabalho em equipe", "colaboracao", "colaborativo", "colaborativa", "teamwork", "espirito de equipe"], "Participe de um projeto open source ou de um hackathon para trabalhar com outras pessoas."],
  ["Comunicação", ["comunicacao", "boa comunicacao", "comunicativo", "comunicativa"], "Apresente seus projetos em meetups ou escreva posts explicando o que você construiu."],
  ["Proatividade", ["proatividade", "proativo", "proativa"], "Proponha e execute melhorias em projetos dos quais você participa."],
  ["Resolução de problemas", ["resolucao de problemas", "solucao de problemas", "problem solving", "resolver problemas"], "Resolva desafios de programação com regularidade e documente seu raciocínio."],
  ["Pensamento crítico", ["pensamento critico", "senso critico"], "Revise código de outras pessoas e justifique suas sugestões."],
  ["Pensamento analítico", ["pensamento analitico", "raciocinio logico", "perfil analitico"], "Pratique quebrar problemas grandes em partes menores antes de codar."],
  ["Organização", ["organizacao", "organizado", "organizada"], "Planeje seus estudos com metas semanais e acompanhe o progresso."],
  ["Gestão do tempo", ["gestao do tempo", "gerenciamento de tempo", "cumprimento de prazos"], "Use técnicas como Pomodoro e defina prazos para seus projetos pessoais."],
  ["Aprendizado contínuo", ["aprendizado continuo", "vontade de aprender", "curiosidade", "aprender rapido", "autodidata"], "Mantenha uma rotina de estudo e registre o que aprende em um repositório público."],
  ["Adaptabilidade", ["adaptabilidade", "flexibilidade", "flexivel", "adaptavel"], "Experimente tecnologias novas em projetos curtos."],
  ["Autonomia", ["autonomia", "autonomo", "autonoma", "independencia"], "Conduza um projeto pessoal do início à publicação sem tutorial."],
  ["Liderança", ["lideranca", "lider"], "Organize um grupo de estudo ou coordene um projeto voluntário."],
  ["Empatia", ["empatia", "empatico", "empatica"], "Faça mentoria voluntária para quem está começando."],
  ["Criatividade", ["criatividade", "criativo", "criativa"], "Crie projetos próprios a partir de problemas reais que você observa."],
  ["Atenção aos detalhes", ["atencao aos detalhes", "detalhista"], "Revise seus próprios pull requests com uma lista de verificação antes de enviar."],
  ["Comprometimento", ["comprometimento", "comprometido", "comprometida", "responsabilidade"], "Cumpra entregas de projetos voluntários ou open source com prazo combinado."],
  ["Inteligência emocional", ["inteligencia emocional"], "Pratique receber e dar feedback em revisões de código."],
  ["Receptividade a feedback", ["feedback", "receber feedback", "aberto a feedback"], "Peça revisão de código em comunidades e aplique as sugestões."],
  ["Negociação", ["negociacao"], "Pratique alinhar escopo e prazos em projetos em grupo."],
  ["Foco no cliente", ["foco no cliente", "orientacao ao cliente", "foco no usuario"], "Converse com usuários reais de um projeto seu e ajuste o produto com base nisso."],
];

function slug(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/#/g, "sharp")
    .replace(/\+/g, "plus")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function build(rows: Row[], type: CompetencyType): Competency[] {
  return rows.map(([canonical, variants, suggestion]) => ({
    id: slug(canonical),
    canonical,
    type,
    variants: Array.from(new Set([canonical, ...variants])),
    suggestion,
  }));
}

export const DICTIONARY: Competency[] = [
  ...build(tecnicas, "tecnica"),
  ...build(comportamentais, "comportamental"),
];

export const DICTIONARY_BY_ID: Record<string, Competency> = Object.fromEntries(
  DICTIONARY.map((c) => [c.id, c]),
);
