import Bowser from "bowser";
import InApp from "detect-inapp"; // using "detect-inapp": "github:shalanah/detect-inapp#shalanah-build", for now while Android Chrome but in regular detect-inapp package
import { toSentenceCase } from "./utils";

export const DeviceInfo = () => {
  const browser = Bowser.getParser(window.navigator.userAgent);
  const platform = browser.getPlatform() || "";
  const vendor = toSentenceCase(platform.vendor || "");
  const device = toSentenceCase(platform.type || "Unknown Device");
  const browserName = toSentenceCase(
    browser.getBrowserName() || "Unknown Browser Name"
  );
  const engine = toSentenceCase(browser.getEngineName() || "");
  const osVersion = browser.getOSVersion() || "";
  const osName = toSentenceCase(browser.getOSName() || "");
  const osVersionName = toSentenceCase(browser.getOS()?.versionName || "");
  const browserVersion = browser.getBrowserVersion() || "";
  const ua =
    //@ts-ignore
    window.navigator.userAgent || window.navigator.vendor || window.opera;
  const inAppRes = new InApp(ua);
  const isInApp = inAppRes.isInApp;

  return (
    <>
      <div>
        <h2>Device info</h2>
        <div id="stats">
          <p
            style={{
              marginBottom: 5,
              fontSize: ".75rem",
              textTransform: "uppercase",
              color: "#444",
            }}
          >
            {`${device} ${vendor} ${osName} ${osVersionName} ${osVersion}`}
          </p>
          <p style={{ marginBottom: 5 }}>
            {`${browserName} ${engine} ${browserVersion}`}
          </p>
          <p className="small" style={{ wordBreak: "break-word" }}>
            {ua}
          </p>
          <p style={{ marginBottom: 2, marginTop: 15 }}>
            {`${isInApp ? "✅ In-app" : "❌ No in-app"} browser found*`}
          </p>
          <p className="small">*via a fork of detect-inapp - not 100%</p>
          <p className="small">
            Using{" "}
            <code>
              "detect-inapp": "github:shalanah/detect-inapp#shalanah-build"
            </code>{" "}
            while detect-inapp has false positives on Android Chrome
          </p>
        </div>
      </div>
    </>
  );
};
