/**
 * Camada de domínio — value object ChatResponse.
 *
 * Encapsula a resposta RECEBIDA do modelo e expõe a verificação
 * de resposta vazia. Imutável e com validação fail-fast.
 */
class ChatResponse {
  constructor(content) {
    if (content === null || content === undefined) {
      throw new Error("A resposta recebida é inválida.");
    }

    this.content = String(content);
    Object.freeze(this);
  }

  get isEmpty() {
    return this.content.trim().length === 0;
  }
}

module.exports = { ChatResponse };
