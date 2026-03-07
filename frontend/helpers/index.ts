import { Theme } from "@/components/layout/theme-provider";

type setCookiesProps = {
  STORAGE_KEY: string;
  value: Theme;
};

export const setCookies = ({ STORAGE_KEY, value }: setCookiesProps) => {
  document.cookie = `${STORAGE_KEY}=${value}; path=/; max-age=31536000`;
};