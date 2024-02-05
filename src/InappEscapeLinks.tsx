// const androidHtml = /*html*/ `
//   <h2>Android</h2>
//   <p class="desc" style="margin-bottom: .4rem;">To escape an in-app browser on Android device, a default browser intent link seems to always work.</p>
//   <p class="desc">If successful, you should be redirected to example.com</p>
//   <ul>
//   ${androidLinks
//     .map(
//       (link) =>
//         `<li><a href="${link.url}" target="_blank">${link.title}</a></li>`
//     )
//     .join("")}
//   </ul>
// `;
// const iOSHtml = /*html*/ `
//   <h2>iOS</h2>
//   <p class="desc" style="margin-bottom: .4rem">No reliable default browser link exists to escape in-app iOS. Try some of these specific browser links anyways. No Safari link exists except for the kooky search link.</p>
//   <p class="desc">If successful, you should be redirected to example.com</p>
//   <ul>
//   ${iOSLinks
//     .map(
//       (link) =>
//         `<li><a href="${link.url}" target="_blank">${link.title}</a></li>`
//     )
//     .join("")}
//   </ul>
// `;

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
              {os} Inapp
              <br />
              Escape Links
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
