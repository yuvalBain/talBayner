/**
 * Route paths – single source of truth for navigation & links.
 */
export const ROUTES = {
  home: "/",
  contact: "/contact",
  postertube: "/postertube",
  agency: "/agency",
  blog: "/blog",
  shop: "/shop",
  training: "/training",
  myStory: "/my-story",
  projects: "/projects",
} as const;

export type RouteKey = keyof typeof ROUTES;

/** Nav items in display order (RTL: first = rightmost). */
export const NAV_ITEMS: { href: string; label: string }[] = [
  { href: ROUTES.contact, label: "צור קשר" },
  { href: ROUTES.postertube, label: "פוסטר טיוב" },
  { href: ROUTES.agency, label: "סוכנות מיתוג ופרסום" },
  { href: ROUTES.blog, label: "בלוג" },
  { href: ROUTES.shop, label: "חנות" },
  { href: ROUTES.training, label: "תוכנית ההכשרה למעצבים גרפים" },
  { href: ROUTES.myStory, label: "הסיפור שלי" },
  { href: ROUTES.projects, label: "פרויקטים" },
];