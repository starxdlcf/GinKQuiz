
/**
 * Função de log padronizado
 * @param {'AUTH' | 'QUIZ' | 'APP'} type - O tipo do log (Prefixo)
 * @param {string} message - A mensagem descritiva
 * @param {any} [data] - Dados opcionais (objeto de erro ou dados técnicos)
 */
export const logEvent = (type, message, data = null) => {
    const timestamp = new Date().toLocaleTimeString();
    const prefix = `[${type}] ${timestamp}:`;
  
    if (data) {
      console.log(prefix, message, data);
    } else {
      console.log(prefix, message);
    }
  };
  
  export const logError = (type, message, error) => {
    console.error(`X [${type} ERROR]: ${message}`, error);
  };