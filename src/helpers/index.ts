import { Theme } from "@/components/layout/theme-provider";

type setCookiesProps = {
  STORAGE_KEY: string;
  value: Theme;
};

export const setCookies: setCookiesProps = ({ STORAGE_KEY, value }) => {
  const root = document.documentElement;
  root.setAttribute("data-theme", value);
  document.cookie = `${STORAGE_KEY}=${value}; path=/; max-age=31536000`;
};