import Bowser from "bowser";
import InApp from "detect-inapp"; // using "detect-inapp": "github:shalanah/detect-inapp#shalanah-build", for now while Android Chrome but in regular detect-inapp package
import { toSentenceCase } from "./utils";
import styled from "styled-components";

const StatBoxContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
  padding: 0px 0px;
`;
const StatBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 25px 20px 20px;
  border-radius: 20px;
  background: var(--white);
  color: var(--navy);
  h2 {
    font-size: 1.35rem;
    font-weight: normal;
    line-height: 1.3;
    text-wrap: balance;
  }
  p {
    font-size: 0.8rem;
    height: 3rem;
  }
`;
const UABox = styled.div`
  text-align: left;
  font-size: 0.8rem;
  padding: 5px 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const InAppBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 20px;
  border-radius: 20px;
  color: var(--white);
  h2 {
    font-size: 1.35rem;
    font-weight: bold;
    line-height: 1.2;
  }
  p {
    font-size: 0.8rem;
  }
`;

export const DeviceInfo = () => {
  const browser = Bowser.getParser(window.navigator.userAgent);
  const platform = browser.getPlatform() || "";
  const vendor = toSentenceCase(platform.vendor || "");
  // const device = toSentenceCase(platform.type || "Unknown Device");
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
        <StatBoxContainer>
          <StatBox>
            <p>
              {osVersionName || osVersion ? (
                <>
                  {osVersionName} {osVersion}
                </>
              ) : (
                "Unknown version"
              )}
            </p>
            <h2>
              {vendor}
              {osName && (
                <>
                  <br />
                  {osName}
                </>
              )}
            </h2>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div
                style={{
                  width: 30,
                  height: 30,
                  background: "#000",
                  borderRadius: "50%",
                }}
              />
            </div>
          </StatBox>
          <StatBox>
            <p>{browserVersion || "Unknown version"}</p>
            <h2>
              {browserName}
              {engine && (
                <>
                  <br />
                  {engine}
                </>
              )}
            </h2>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div
                style={{
                  width: 30,
                  height: 30,
                  background: "#000",
                  borderRadius: "50%",
                }}
              />
            </div>
          </StatBox>
        </StatBoxContainer>
        <StatBoxContainer>
          <UABox>
            <p>
              <strong>User Agent</strong>
            </p>
            <p style={{ wordBreak: "break-word" }}>{ua}</p>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div
                style={{
                  width: 30,
                  height: 30,
                  background: "#000",
                  borderRadius: "50%",
                }}
              />
            </div>
          </UABox>
        </StatBoxContainer>
        <StatBoxContainer>
          <InAppBox
            style={{
              background: isInApp ? "#B92158" : "#E9FFF6",
              color: isInApp ? "#fff" : "#449C82",
            }}
          >
            <h2 style={{ color: isInApp ? "#fff" : "#007D75" }}>
              {isInApp ? "In-app detected" : "In-app not detected"}
            </h2>
            <p>Not 100% accurate.</p>
            <p>
              Using package "detect-inapp":
              <code>"github:shalanah/detect-inapp#shalanah-build"</code> while
              detect-inapp has false positives on Android Chrome
            </p>
          </InAppBox>
        </StatBoxContainer>
      </div>
    </>
  );
};
