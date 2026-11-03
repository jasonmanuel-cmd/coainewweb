import { afterEach, expect, it, vi } from "vitest";
import { finishSubmission, submissionIdentity } from "@/lib/forms/submission-identity";

afterEach(() => { vi.restoreAllMocks(); for (const scope of ["contact", "intake", "waitlist"] as const) finishSubmission(scope); window.sessionStorage.clear(); });
it("retains an opaque identity for retries, rotates only on success, and isolates forms", () => {
  const first = submissionIdentity("contact");
  expect(submissionIdentity("contact")).toBe(first);
  expect(submissionIdentity("intake")).not.toBe(first);
  expect(window.sessionStorage.getItem("coai:submission:contact:v1")).toBe(first);
  finishSubmission("contact"); expect(submissionIdentity("contact")).not.toBe(first);
});
it("restores a tab identity after a reload without storing volunteered contact data", () => {
  const id = "00000000-0000-4000-8000-000000000001";
  window.sessionStorage.setItem("coai:submission:contact:v1", id);
  expect(submissionIdentity("contact")).toBe(id);
});
it("uses the same in-memory identity when storage is blocked and discards malformed stored IDs", () => {
  window.sessionStorage.setItem("coai:submission:contact:v1", "private@example.com");
  expect(submissionIdentity("contact")).not.toBe("private@example.com");
  vi.spyOn(window.sessionStorage, "getItem").mockImplementation(() => { throw new Error("blocked"); });
  vi.spyOn(window.sessionStorage, "setItem").mockImplementation(() => { throw new Error("blocked"); });
  const id = submissionIdentity("waitlist"); expect(submissionIdentity("waitlist")).toBe(id);
});
