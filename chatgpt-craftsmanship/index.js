/**
 * Ponto de entrada (Composition Root).
 *
 * Aqui — e somente aqui — as dependências concretas são montadas e
 * "injetadas". Isso mantém o restante do código desacoplado e testável.
 */
require("dotenv").config();

const { OpenAIChatClient } = require("./src/clients/OpenAIChatClient");
const { ChatService } = require("./src/services/ChatService");
const { ChatCLI } = require("./src/cli/ChatCLI");

function main() {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  let client;
  try {
    client = new OpenAIChatClient(apiKey, model);
  } catch (erro) {
    console.error(`[Configuração] ${erro.message}`);
    console.error("Defina OPENAI_API_KEY no arquivo .env antes de rodar.");
    process.exit(1);
  }

  const service = new ChatService(client);
  const cli = new ChatCLI(service);

  return cli.run();
}

main();
