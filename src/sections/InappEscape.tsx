import Bowser from "bowser";
import { toSentenceCase } from "../utils";
import { Card } from "../base/Card";
import { InappEscapeShortcutsDesc } from "./InappEscapeShortcutsDesc";
import { IconIos } from "./IconIos";
import { IconAndroid } from "./IconAndroid";

export const InappEscape = () => {
  const browser = Bowser.getParser(window.navigator.userAgent);
  const platform = browser.getPlatform() || "";
  const vendor = toSentenceCase(platform.vendor || "");
  const order = vendor === "Apple" ? ["iOS", "Android"] : ["Android", "iOS"];

  return order.map((os, i) => {
    switch (os) {
      case "iOS":
        return (
          <Card
            key={os}
            icon={<IconIos />}
            light={i % 2 === 1}
            title={
              <>
                iOS In-App
                <br />
                Escape Links
              </>
            }
            intro={
              <>
                <p>
                  The most reliable way to exit in-app browsers is the Shortcuts
                  fallback.
                </p>
                <p>
                  Links go to <strong>example.com</strong>
                </p>
              </>
            }
            items={[
              {
                type: "desc",
                desc: <InappEscapeShortcutsDesc />,
              },
              {
                type: "link",
                title: "Shortcuts fallback",
                href: `shortcuts://x-callback-url/run-shortcut?name=${crypto.randomUUID()}&x-error=${encodeURIComponent(
                  "https://example.com"
                )}`,
              },
              {
                type: "desc",
                desc: (
                  <p style={{ marginTop: 25, marginBottom: 8 }}>
                    Experiment with the less reliable search and browser links
                    below.
                  </p>
                ),
              },
              {
                type: "link",
                title: "Safari search",
                href: "x-web-search://?site:example.com",
              },
              {
                type: "link",
                title: "Chrome https",
                href: "googlechromes://example.com",
              },
              {
                type: "link",
                title: "Chrome http",
                href: "googlechrome://example.com",
              },
              {
                type: "link",
                title: "Firefox",
                href: "firefox://open-url?url=https://example.com",
              },
              {
                type: "link",
                title: "Edge",
                href: "microsoft-edge-https://example.com",
              },
              {
                type: "link",
                title: "Opera",
                href: "touch-https://example.com",
              },
              {
                type: "link",
                title: "Yandex",
                href: "yandexbrowser-open-url://example.com",
              },
            ]}
          />
        );
      case "Android":
      default:
        return (
          <Card
            key={os}
            icon={<IconAndroid />}
            light={i % 2 === 1}
            title={
              <>
                Android In-App
                <br />
                Escape Links
              </>
            }
            intro={
              <>
                <p>
                  To reliably exit in-app browsers on Android devices, use the
                  default browser intent link.
                </p>
                <p>
                  Link goes to <strong>example.com</strong>
                </p>
              </>
            }
            items={[
              {
                type: "link",
                title: "Open in default browser",
                href: "intent:https://example.com#Intent;end",
              },
            ]}
          />
        );
    }
  });
};
