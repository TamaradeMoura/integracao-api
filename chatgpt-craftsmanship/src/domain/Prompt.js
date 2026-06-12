/**
 * Camada de domínio — value object Prompt.
 *
 * Encapsula a regra de validação do que será ENVIADO ao modelo.
 * É imutável (Object.freeze) para garantir que um Prompt válido
 * permaneça válido durante todo o seu ciclo de vida.
 *
 * Princípios: SRP (uma única responsabilidade) e fail-fast.
 */
class Prompt {
  constructor(text) {
    if (text === null || text === undefined || !String(text).trim()) {
      throw new Error("O prompt não pode ser vazio.");
    }
    if (String(text).length > 4000) {
      throw new Error("O prompt excede o limite de 4000 caracteres.");
    }

    this.text = String(text).trim();
    Object.freeze(this);
  }
}

module.exports = { Prompt };
