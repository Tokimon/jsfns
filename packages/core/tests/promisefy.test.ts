import { promisefy } from "@jsfns/core/promisefy";

/** The method to promisefy, with a callback signature */
type NodeLikeCallback = (
  err?: string | Error | null,
  data?: unknown,
) => unknown;

describe('"promisefy"', () => {
  const err = new Error("error");
  const callback = (ok: boolean, cb: NodeLikeCallback) =>
    ok ? cb(null, "success") : cb(err);

  it("It resolves the promise on success", () => {
    const promised = promisefy(callback);
    return expect(promised(true)).resolves.toBe("success");
  });

  it("It rejects the promise on error", () => {
    const promised = promisefy(callback);
    return expect(promised(false)).rejects.toBe(err);
  });
});
