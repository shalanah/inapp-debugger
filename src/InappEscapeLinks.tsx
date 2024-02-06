import Bowser from "bowser";
import { escapeLinks, EscapeLinksVendor } from "./constants";
import { toSentenceCase } from "./utils";
import { CardLarge } from "./CardLarge";

export const InappEscapeLinks = () => {
  const browser = Bowser.getParser(window.navigator.userAgent);
  const platform = browser.getPlatform() || "";
  const vendor = toSentenceCase(platform.vendor || "");
  const order: [EscapeLinksVendor, EscapeLinksVendor] =
    vendor === "Apple" ? ["iOS", "Android"] : ["Android", "iOS"];
  return (
    <>
      {order.map((os, i) => {
        const { links, intro, icon } = escapeLinks[os];
        return (
          <CardLarge
            key={os}
            icon={icon}
            light={i % 2 === 1}
            title={
              <>
                {os} In-App
                <br />
                Escape Links
              </>
            }
            text={intro}
            links={links.map((link) => ({
              title: link.title,
              type: "link",
              href: link.url,
            }))}
          />
        );
      })}
    </>
  );
};
