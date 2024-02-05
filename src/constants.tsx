export const escapeLinks = {
  iOS: {
    intro: <>Text iOS</>,
    links: [
      { title: "Safari search", url: "x-web-search://?site:example.com" },
      { title: "Chrome https", url: "googlechromes://example.com" },
      { title: "Chrome http", url: "googlechrome://example.com" },
      { title: "Firefox", url: "firefox://open-url?url=https://example.com" },
      { title: "Edge", url: "microsoft-edge-https://example.com" },
      { title: "Opera", url: "touch-https://example.com" },
      { title: "Yandex", url: "yandexbrowser-open-url://example.com" },
    ],
  },
  Android: {
    intro: <>Text Android</>,
    links: [
      {
        title: "Open in default browser",
        url: "intent:https://example.com#Intent;end",
      },
    ],
  },
} as const;

export type EscapeLinksVendor = keyof typeof escapeLinks;
