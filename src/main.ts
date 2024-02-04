import "./style.css";
import Bowser from "bowser";
import InApp from "detect-inapp";

const toSentenceCase = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// function docReady(fn: () => void) {
//   // see if DOM is already available
//   if (
//     document.readyState === "complete" ||
//     document.readyState === "interactive"
//   ) {
//     // call on next available tick
//     setTimeout(fn, 1);
//   } else {
//     document.addEventListener("DOMContentLoaded", fn);
//   }
// }

// docReady(() => {
const browser = Bowser.getParser(window.navigator.userAgent);
const platform = browser.getPlatform();
const vendor = toSentenceCase(platform.vendor || "");
const device = toSentenceCase(platform.type || "Unknown Device");
const browserName = toSentenceCase(
  browser.getBrowserName() || "Unknown Browser Name"
);
const engine = toSentenceCase(browser.getEngineName() || "");
const osVersion = browser.getOSVersion();
const osName = toSentenceCase(browser.getOSName() || "");
const osVersionName = toSentenceCase(browser.getOS()?.versionName || "");
const browserVersion = browser.getBrowserVersion();
const ua =
  //@ts-ignore
  window.navigator.userAgent || window.navigator.vendor || window.opera;
const inAppRes = new InApp(ua);
const isInApp = inAppRes.isInApp;

// Logging on purpose for Eruda
console.log({ browser, inAppRes, isInApp });

const statsHtml = /*html*/ `
<div id="stats">
  <p style="margin-bottom: 5px; font-size: .75rem; text-transform: uppercase; color: #444;">${device} ${vendor} ${osName} ${osVersionName} ${osVersion}</p>
  <p style="margin-bottom: 5px">${browserName} ${engine} ${browserVersion}</p>
  <p class="small">${ua}</p>
  <p style="margin-bottom: 2px; margin-top: 15px">${
    isInApp ? "✅ In-app" : "❌ No in-app"
  } browser found*</p>
  <p class="small">*via detect-inapp - not 100%</p>
  <p class="small">Using this in package while false positive on Chrome in Android: <code>"detect-inapp": "github:shalanah/detect-inapp#shalanah-build"</code></p>
</div>
`;

const iOSLinks = [
  { title: "Safari Search", url: "x-web-search://?site:example.com" },
  { title: "Chrome https", url: "googlechromes://example.com" },
  { title: "Chrome http", url: "googlechrome://example.com" },
  { title: "Firefox", url: "firefox://open-url?url=https://example.com" },
  { title: "Edge", url: "microsoft-edge-https://example.com" },
  { title: "Opera", url: "touch-https://example.com" },
  { title: "Yandex", url: "yandexbrowser-open-url://example.com" },
];

const androidLinks = [
  {
    title: "Default Browser Intent Link",
    url: "intent:https://example.com#Intent;end",
  },
];

const androidHtml = /*html*/ `
  <h2>Android</h2>
  <ul>
  ${androidLinks
    .map(
      (link) =>
        `<li><a href="${link.url}" target="_blank">${link.title}</a></li>`
    )
    .join("")}
  </ul>
`;
const iOSHtml = /*html*/ `
  <h2>iOS</h2>
  <ul>
  ${iOSLinks
    .map(
      (link) =>
        `<li><a href="${link.url}" target="_blank">${link.title}</a></li>`
    )
    .join("")}
  </ul>
`;

const downloadTestHtml = /*html*/ `
  <h2>Download</h2>
  <ul><li><a id="download-text" download href="downloadTest.txt">Small .txt Doc</a></li></ul>`;

const content = /*html*/ `
  <section>
  ${statsHtml}
  ${downloadTestHtml}
  ${
    vendor === "Apple" ? `${iOSHtml}${androidHtml}` : `${androidHtml}${iOSHtml}`
  }
</section>
`;

document.querySelector<HTMLDivElement>("#app")!.innerHTML = content;
// });
