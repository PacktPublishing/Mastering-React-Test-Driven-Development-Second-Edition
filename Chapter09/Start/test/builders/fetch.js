export const fetchResponseOk = (body) => ({
  ok: true,
  json: () => Promise.resolve(body),
});

export const fetchResponseError = () => ({ ok: false });
