/**
 * Camada de comunicação externa — contrato ChatClient.
 *
 * Em JavaScript não há "interface" nativa, então usamos uma classe base
 * cujo método lança erro se não for sobrescrito. Esse contrato é a
 * ABSTRAÇÃO da qual o ChatService depende (Inversão de Dependência).
 *
 * Para trocar de provedor (Gemini, Claude, etc.) basta criar uma nova
 * subclasse — sem alterar a regra de negócio (Open/Closed).
 */
class ChatClient {
  /**
   * @param {import("../domain/Prompt").Prompt} prompt
   * @returns {Promise<import("../domain/ChatResponse").ChatResponse>}
   */
  // eslint-disable-next-line no-unused-vars
  async complete(prompt) {
    throw new Error("complete() deve ser implementado por uma subclasse.");
  }
}

module.exports = { ChatClient };
