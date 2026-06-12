/**
 * Camada de comunicação externa — adapter da API da OpenAI.
 *
 * Adapta o SDK oficial `openai` ao nosso contrato interno ChatClient
 * (padrão Adapter). O SDK é carregado de forma tardia (require dentro do
 * construtor) para que o domínio e os testes não dependam do pacote.
 *
 * O parâmetro `client` permite injetar um cliente já pronto — útil em
 * testes de integração — mantendo o código aberto para extensão.
 */
const { ChatClient } = require("./ChatClient");
const { ChatResponse } = require("../domain/ChatResponse");

class OpenAIChatClient extends ChatClient {
  constructor(apiKey, model = "gpt-4o-mini", client = null) {
    super();

    if (!apiKey) {
      throw new Error("API key da OpenAI não configurada.");
    }

    this.model = model;

    if (client) {
      this.client = client;
    } else {
      const OpenAI = require("openai"); // import tardio
      this.client = new OpenAI({ apiKey });
    }
  }

  async complete(prompt) {
    const completion = await this.client.chat.completions.create({
      model: this.model,
      messages: [{ role: "user", content: prompt.text }],
    });

    const content = completion.choices[0].message.content ?? "";
    return new ChatResponse(content);
  }
}

module.exports = { OpenAIChatClient };
