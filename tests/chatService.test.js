/**
 * Testes unitários do ChatService.
 *
 * Dois grupos exigidos:
 *   1) Validação de ENVIO     -> garante que o que sai está correto.
 *   2) Validação de RECEBIMENTO -> garante que o que volta é tratado.
 *
 * Usamos um dublê de teste (FakeChatClient) que implementa o contrato
 * ChatClient. Por isso os testes NÃO precisam de chave de API nem de
 * rede — só foi possível graças à Inversão de Dependência.
 */
const { ChatService } = require("../src/services/ChatService");
const { ChatClient } = require("../src/clients/ChatClient");
const { ChatResponse } = require("../src/domain/ChatResponse");

class FakeChatClient extends ChatClient {
  constructor(content = "resposta padrão") {
    super();
    this.recebido = null;
    this.content = content;
  }

  async complete(prompt) {
    this.recebido = prompt;
    return new ChatResponse(this.content);
  }
}

describe("Validação de ENVIO", () => {
  test("rejeita prompt vazio antes de enviar (fail-fast)", async () => {
    const fake = new FakeChatClient();
    const service = new ChatService(fake);

    await expect(service.ask("   ")).rejects.toThrow();
    expect(fake.recebido).toBeNull(); // nada chegou ao provedor
  });

  test("envia o prompt correto ao provedor", async () => {
    const fake = new FakeChatClient();
    const service = new ChatService(fake);

    await service.ask("Olá, tudo bem?");

    expect(fake.recebido).not.toBeNull();
    expect(fake.recebido.text).toBe("Olá, tudo bem?");
  });
});

describe("Validação de RECEBIMENTO", () => {
  test("retorna o conteúdo recebido do provedor", async () => {
    const service = new ChatService(new FakeChatClient("Estou bem, obrigado!"));

    const resposta = await service.ask("Como você está?");

    expect(resposta).toBe("Estou bem, obrigado!");
  });

  test("lança erro quando a resposta vem vazia", async () => {
    const service = new ChatService(new FakeChatClient("   "));

    await expect(service.ask("Pergunta qualquer")).rejects.toThrow();
  });
});
