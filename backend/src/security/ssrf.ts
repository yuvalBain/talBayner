/**
 * SSRF mitigation: validate that a URL's host is in the allowlist
 * before fetching or redirecting. Never use user-provided URLs without this check.
 */
export const isUrlAllowed = (
  url: string,
  allowlist: string[]
): boolean => {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();
    return allowlist.some(
      (allowed) => host === allowed.toLowerCase() || host.endsWith(`.${allowed.toLowerCase()}`)
    );
  } catch {
    return false;
  }
};
