import Bowser from "bowser";
import { escapeLinks, EscapeLinksVendor } from "./constants";
import { toSentenceCase } from "./utils";

export const InappEscapeLinks = () => {
  const browser = Bowser.getParser(window.navigator.userAgent);
  const platform = browser.getPlatform() || "";
  const vendor = toSentenceCase(platform.vendor || "");
  const order: [EscapeLinksVendor, EscapeLinksVendor] =
    vendor === "Apple" ? ["iOS", "Android"] : ["Android", "iOS"];
  return (
    <>
      {order.map((os) => {
        const { links, intro } = escapeLinks[os];
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
