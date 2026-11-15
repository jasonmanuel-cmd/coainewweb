type FormScope = "contact" | "intake" | "waitlist";
const memory = new Map<FormScope, string>();
const key = (scope: FormScope) => `coai:submission:${scope}:v1`;
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/** Retain only an opaque random ID, never form fields, across retries/reloads in this tab. */
export function submissionIdentity(scope: FormScope): string {
  if (memory.has(scope)) return memory.get(scope)!;
  let id: string | null = null;
  try { id = window.sessionStorage.getItem(key(scope)); } catch { /* storage may be unavailable */ }
  if (!id || !uuid.test(id)) id = crypto.randomUUID();
  memory.set(scope, id);
  try { window.sessionStorage.setItem(key(scope), id); } catch { /* in-memory retry still works */ }
  return id;
}

/** A confirmed response ends this inquiry. Failures deliberately retain its identity. */
export function finishSubmission(scope: FormScope) {
  memory.delete(scope);
  try { window.sessionStorage.removeItem(key(scope)); } catch { /* no persistent state available */ }
}
