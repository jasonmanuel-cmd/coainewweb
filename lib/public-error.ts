/**
 * An error whose message is safe to show a visitor (bad URL, blocked host, ...).
 * Anything that is NOT a PublicError is treated as internal and never echoed to the client.
 * Dependency-free on purpose: it is imported by small utilities that also run in the browser.
 */
export class PublicError extends Error {
  readonly status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.name = "PublicError";
    this.status = status;
  }
}
