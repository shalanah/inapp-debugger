export const escapeLinks = {
  iOS: {
    intro: (
      <>
        <p>
          No link exists to escape in-app iOS reliably. Experiment with the
          search and browser links below.
        </p>
        <p>
          Link goes to <strong>example.com</strong>
        </p>
      </>
    ),
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
    intro: (
      <>
        <p>
          To escape an in-app browser on Android device, use a default browser
          intent link.
        </p>
        <p>
          Link goes to <strong>example.com</strong>
        </p>
      </>
    ),
    links: [
      {
        title: "Open in default browser",
        url: "intent:https://example.com#Intent;end",
      },
    ],
  },
} as const;

export type EscapeLinksVendor = keyof typeof escapeLinks;
