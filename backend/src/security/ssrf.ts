/**
 * SSRF mitigation: validate that a URL's host is in the allowlist
 * and does not resolve to a private IP before fetching or redirecting.
 * Never use user-provided URLs without this check.
 */
import dns from "dns/promises";

const PRIVATE_IP_RANGES = [
  /^127\./,
  /^10\./,
  /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
  /^192\.168\./,
  /^169\.254\./,
  /^::1$/,
  /^fc00:/,
  /^fe80:/,
];

function normalizeIp(ip: string): string {
  if (ip.startsWith("::ffff:")) {
    return ip.slice(7);
  }
  return ip;
}

function isPrivateIp(ip: string): boolean {
  const normalized = normalizeIp(ip);
  return PRIVATE_IP_RANGES.some((range) => range.test(normalized));
}

export const isUrlAllowed = async (
  url: string,
  allowlist: string[]
): Promise<boolean> => {
  try {
    const parsed = new URL(url);

    if (!["http:", "https:"].includes(parsed.protocol)) {
      return false;
    }

    const hostname = parsed.hostname.toLowerCase();

    if (hostname === "localhost") {
      return false;
    }

    const allowedDomains = allowlist
      .map((d) => d.toLowerCase().trim())
      .filter(Boolean);

    const allowed = allowedDomains.some(
      (d) => hostname === d || hostname.endsWith(`.${d}`)
    );

    if (!allowed) {
      return false;
    }

    const addresses = await dns.lookup(hostname, { all: true });

    for (const addr of addresses) {
      if (isPrivateIp(addr.address)) {
        return false;
      }
    }

    return true;
  } catch {
    return false;
  }
};
