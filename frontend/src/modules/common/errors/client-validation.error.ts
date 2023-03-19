interface ClientValidationErrorInterface {
  message?: string;
  variables?: Record<string | number | symbol, unknown>;
}

export class ClientValidationError extends Error {
  variables: Record<string | symbol, unknown>

  constructor(options: ClientValidationErrorInterface) {
    const { variables, message } = options;
    super(message);
    this.variables = variables;
  }
}
