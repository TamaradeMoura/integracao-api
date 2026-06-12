/**
 * Camada de serviço — orquestra o fluxo de negócio.
 *
 * Coordena: validação de envio -> chamada ao provedor -> validação de
 * recebimento. NÃO conhece a OpenAI; depende apenas da abstração
 * ChatClient, recebida por injeção de dependência no construtor (DIP).
 */
const { Prompt } = require("../domain/Prompt");

class ChatService {
  /**
   * @param {import("../clients/ChatClient").ChatClient} client
   */
  constructor(client) {
    this.client = client;
  }

  /**
   * Recebe um texto cru, valida, envia e devolve a resposta tratada.
   * @param {string} question
   * @returns {Promise<string>}
   */
  async ask(question) {
    const prompt = new Prompt(question); // validação de ENVIO (fail-fast)

    const response = await this.client.complete(prompt);

    if (response.isEmpty) {
      // validação de RECEBIMENTO
      throw new Error("O provedor retornou uma resposta vazia.");
    }

    return response.content;
  }
}

module.exports = { ChatService };
