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
        const { links, intro } = escapeLinks[os];
        return (
          <CardLarge
            light={i % 2 === 1}
            title={os}
            text={intro}
            links={links.map((link) => ({
              title: link.title,
              type: "link",
              href: link.url,
            }))}
          />
        );
        return (
          <div key={os}>
            <h2>
              {os}
              <br />
              In-app Escape Links
            </h2>
            {intro}
            <ul>
              {links.map((link) => (
                <li key={link.url}>
                  <a href={link.url} target="_blank">
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </>
  );
};
