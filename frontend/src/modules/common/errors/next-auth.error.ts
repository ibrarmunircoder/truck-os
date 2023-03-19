export class NextAuthError extends Error {
  graphQLErrors
  constructor(stringifiedError: string) {
    let parsedGQLErrors = null;
    let message = null;
    try {
      parsedGQLErrors = JSON.parse(stringifiedError);
      message = parsedGQLErrors?.[0].message;
    } catch (_) {
      message = stringifiedError
    }
    super(message);
    if (parsedGQLErrors) {
      this.graphQLErrors = parsedGQLErrors;
    }
  }
}
