# ChatGPT Craftsmanship (CLI)

Aplicação de linha de comando em **Node.js** que integra com a API do
ChatGPT (OpenAI): envia um prompt e exibe a resposta. O foco do projeto
é a **engenharia ao redor do código** — Clean Code, SOLID, testes
automatizados e Integração Contínua.

## Arquitetura

O código é dividido em camadas com responsabilidades isoladas:

```
src/
├── domain/      Prompt e ChatResponse (regras + validações, imutáveis)
├── clients/     ChatClient (contrato/abstração) + OpenAIChatClient (adapter)
├── services/    ChatService (regra de negócio; recebe o client por injeção)
└── cli/         ChatCLI (apresentação no terminal)
index.js         Composition Root (monta e injeta as dependências)
```

Princípios SOLID aplicados:

- **S** — cada classe tem uma única responsabilidade (domínio, comunicação, serviço, interface).
- **O** — para trocar de provedor de IA, cria-se outro `ChatClient` sem alterar o serviço.
- **L** — qualquer subclasse de `ChatClient` substitui a base sem quebrar o `ChatService`.
- **I** — o contrato `ChatClient` expõe só o método necessário (`complete`).
- **D** — o `ChatService` depende da abstração `ChatClient`, não da implementação concreta.

## Pré-requisitos

- Node.js 20+
- Uma chave de API da OpenAI

## Instalação e execução

```bash
npm install
cp .env.example .env   # edite o .env e coloque sua OPENAI_API_KEY
npm start
```

## Testes

```bash
npm test
```

São dois conjuntos de testes unitários:

- **Validação de envio:** prompt vazio é rejeitado antes de chamar a API; o prompt correto chega ao provedor.
- **Validação de recebimento:** o conteúdo retornado é repassado; resposta vazia gera erro.

Os testes usam um *fake client*, então rodam sem chave de API e sem rede.

---

## Etapas do projeto (guia de entrega)

### 1. Versionamento e colaboração

```bash
git init
git add .
git commit -m "feat: estrutura inicial do projeto"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/chatgpt-craftsmanship.git
git push -u origin main
```

No GitHub: **Settings → Collaborators → Add people** e adicione o
usuário do professor.

### 2. Integração com a API

Implementada em `src/clients/OpenAIChatClient.js` (envio do prompt e
leitura da resposta) e exposta pela CLI em `src/cli/ChatCLI.js`.

### 3. Gestão de código via Git (e resolução de conflito)

Demonstração de resolução de conflito em uma branch:

```bash
git checkout -b ajuste-mensagem
# edite alguma linha (ex.: o texto de boas-vindas na CLI)
git commit -am "chore: ajusta mensagem de boas-vindas"

git checkout main
# edite a MESMA linha de forma diferente
git commit -am "chore: outra mensagem de boas-vindas"

git merge ajuste-mensagem   # aqui o Git acusa o CONFLITO
# abra o arquivo, escolha a versão final entre os marcadores
# <<<<<<< / ======= / >>>>>>>, salve, e finalize:
git add .
git commit -m "fix: resolve conflito de mensagem de boas-vindas"
```

### 4. Artesania de software

Clean Code (nomes claros, funções curtas, fail-fast), SOLID e os
padrões Adapter (`OpenAIChatClient`) e Injeção de Dependência
(`ChatService` / `index.js`).

### 5. Qualidade e automação

Testes em `tests/chatService.test.js` e o workflow
`.github/workflows/ci.yml`, que roda `npm test` automaticamente a cada
push e pull request.
