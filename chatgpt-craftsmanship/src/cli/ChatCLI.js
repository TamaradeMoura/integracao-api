/**
 * Camada de apresentação — interface de linha de comando.
 *
 * Responsável APENAS por entrada/saída com o usuário. Não conhece a
 * OpenAI nem regras de negócio; apenas conversa com o ChatService.
 * Separar a interface do núcleo (SRP) permite trocá-la no futuro
 * (web, desktop) sem tocar na lógica.
 */
const readline = require("node:readline");

class ChatCLI {
  /**
   * @param {import("../services/ChatService").ChatService} service
   */
  constructor(service) {
    this.service = service;
  }

  async run() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const pergunta = (texto) =>
      new Promise((resolve) => rl.question(texto, resolve));

    console.log("=== ChatGPT CLI (digite 'sair' para encerrar) ===");

    while (true) {
      const entrada = (await pergunta("\nVocê: ")).trim();

      if (["sair", "exit", "quit"].includes(entrada.toLowerCase())) {
        console.log("Até logo!");
        break;
      }

      try {
        const resposta = await this.service.ask(entrada);
        console.log(`\nChatGPT: ${resposta}`);
      } catch (erro) {
        console.log(`\n[Erro] ${erro.message}`);
      }
    }

    rl.close();
  }
}

module.exports = { ChatCLI };
