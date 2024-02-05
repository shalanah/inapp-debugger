export const escapeLinks = {
  iOS: {
    intro: (
      <>
        <p className="desc" style={{ marginBottom: ".4rem" }}>
          No reliable default browser link exists to escape in-app iOS. Try some
          of these specific browser links anyways. No Safari link exists except
          for the kooky search link.
        </p>
        <p className="desc">
          If successful, you should be redirected to example.com
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
        <p className="desc" style={{ marginBottom: ".4rem" }}>
          To escape an in-app browser on Android device, a default browser
          intent link seems to always work.
        </p>
        <p className="desc">
          If successful, you should be redirected to example.com
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
