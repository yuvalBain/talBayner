type RateLimitEntry = {
  timestamps: number[];
};

type RateLimitStore = {
  get: (key: string) => RateLimitEntry | undefined;
  set: (key: string, entry: RateLimitEntry) => void;
};

const inMemoryStore = new Map<string, RateLimitEntry>();

const inMemoryRateLimitStore: RateLimitStore = {
  get: (key) => inMemoryStore.get(key),
  set: (key, entry) => {
    inMemoryStore.set(key, entry);
  },
};

export type RateLimitConfig = {
  windowMs: number;
  maxRequests: number;
  store?: RateLimitStore;
};

const defaultConfig: RateLimitConfig = {
  windowMs: 60_000,
  maxRequests: 5,
  store: inMemoryRateLimitStore,
};

export const createRateLimiter = (config: Partial<RateLimitConfig> = {}) => {
  const { windowMs, maxRequests, store } = { ...defaultConfig, ...config };
  const rateLimitStore = store ?? inMemoryRateLimitStore;

  return {
    isRateLimited: (key: string, now: number): boolean => {
      const existing = rateLimitStore.get(key) ?? { timestamps: [] };
      const windowStart = now - windowMs;

      const recent = existing.timestamps.filter((ts) => ts > windowStart);
      recent.push(now);

      rateLimitStore.set(key, { timestamps: recent });

      return recent.length > maxRequests;
    },
  };
};

export const getClientKey = (headers: Headers, ip?: string | null): string => {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    const [first] = forwardedFor.split(",");
    return first.trim();
  }
  if (ip) {
    return ip;
  }
  const ua = headers.get("user-agent") ?? "unknown";
  return `fallback:${ua}`;
};
