import Bowser from "bowser";
import InApp from "detect-inapp"; // using "detect-inapp": "github:shalanah/detect-inapp#shalanah-build", for now while Android Chrome but in regular detect-inapp package
import { toSentenceCase } from "./utils";
import styled from "styled-components";
import { ModalInapp } from "./ModalInapp";
import { InfoCircledIcon, CopyIcon } from "@radix-ui/react-icons";

const Section = styled.section`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
  padding: 0px 15px;
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
    flex: 1;
  }
  p {
    font-size: 0.8rem;
    height: 3rem;
  }
`;
const UABox = styled.div`
  text-align: left;
  font-size: 0.8rem;
  padding: 3px 20px 3px 20px;
  display: flex;
  gap: 5px;
  line-height: 1.2;
`;
const InAppBox = styled.div`
  flex: 1;
  display: flex;
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

const PackageNote = styled.div`
  padding: 10px;
  line-height: 1.4;
  code {
    background: var(--light-blue);
    padding: 20px 25px;
    border-radius: 10px;
    display: block;
    margin: 15px -5px 0px;
    color: var(--navy);
  }
`;

const StandInCircle = ({
  style = {},
  ...props
}: React.HtmlHTMLAttributes<HTMLDivElement>) => (
  <div
    style={{
      width: 34,
      height: 34,
      background: "#000",
      borderRadius: "50%",
      ...style,
    }}
    {...props}
  />
);

export const DeviceInfo = () => {
  const browser = Bowser.getParser(window.navigator.userAgent);
  const platform = browser.getPlatform() || "";
  const vendor = toSentenceCase(platform.vendor || "");
  const device = toSentenceCase(platform.type || "");
  const browserName = toSentenceCase(
    browser.getBrowserName() || "Unknown Browser"
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

  // TODO: Pull out into mini component
  let osVersionText = "Unknown version";
  if (osVersionName || osVersion) {
    osVersionText = `${osVersionName} ${osVersion}`;
    if (osVersionText.split("").length < 6)
      osVersionText = `Version ${osVersion}`;
  }

  console.log(browser);

  // TODO: Pull out into mini component
  let osText: React.ReactNode = (
    <>
      Unknown
      <br />
      OS
    </>
  );
  // Nice if we can get 2 lines of text
  if (vendor || osName || device) {
    if (vendor && osName)
      osText = (
        <>
          {vendor}
          <br />
          {osName}
        </>
      );
    else if (vendor && device)
      osText = (
        <>
          {vendor}
          <br />
          {device}
        </>
      );
    else if (device && osName)
      osText = (
        <>
          {osName}
          <br />
          {device}
        </>
      );
    else osText = vendor || device || osName; // backup
  }

  // TODO: Pull out into mini component
  let browserVersionText: React.ReactNode = "Unknown version";
  if (browserVersion) {
    browserVersionText =
      browserVersion.split("").length > 5
        ? browserVersion
        : `Version ${browserVersion}`;
  }
  // TODO: Pull out into mini component
  let browserNameEngineText: React.ReactNode = "Unknown Browser";
  if (browserName) {
    browserNameEngineText = browserName;
    if (engine) {
      browserNameEngineText = (
        <>
          {browserName}
          <br />
          {engine}
        </>
      );
    }
  }

  return (
    <>
      <div style={{ marginTop: "1rem" }}>
        <Section>
          <StatBox>
            <p>{osVersionText}</p>
            <h2>{osText}</h2>
            <div className="d-flex" style={{ justifyContent: "flex-end" }}>
              <StandInCircle
                className="d-flex"
                style={{
                  flexShrink: 0,
                  justifyContent: "flex-end",
                  color: "var(--light-blue)",
                  background: "var(--navy)",
                }}
              >
                <CopyIcon width={17} height={17} style={{ margin: "auto" }} />
              </StandInCircle>
            </div>
          </StatBox>
          <StatBox>
            <p>{browserVersionText}</p>
            <h2>{browserNameEngineText}</h2>
            <div className="d-flex" style={{ justifyContent: "flex-end" }}>
              <StandInCircle
                className="d-flex"
                style={{
                  flexShrink: 0,
                  justifyContent: "flex-end",
                  color: "var(--light-blue)",
                  background: "var(--navy)",
                }}
              >
                <CopyIcon width={17} height={17} style={{ margin: "auto" }} />
              </StandInCircle>
            </div>
          </StatBox>
        </Section>
        <Section>
          <UABox>
            <div className="d-flex flex-column" style={{ gap: 5 }}>
              <p>
                <strong>User Agent</strong>
              </p>
              <p style={{ wordBreak: "break-word" }}>{ua}</p>
            </div>
            <StandInCircle
              className="d-flex"
              style={{
                flexShrink: 0,
                justifyContent: "flex-end",
                background: "#fff",
              }}
            >
              <CopyIcon width={17} height={17} style={{ margin: "auto" }} />
            </StandInCircle>
          </UABox>
        </Section>
        <Section>
          <InAppBox
            style={{
              background: isInApp ? "#B92158" : "#E9FFF6",
              color: isInApp ? "#fff" : "#449C82",
            }}
          >
            <div
              className="d-flex flex-column"
              style={{
                flex: 1,
                gap: 5,
              }}
            >
              <h2 style={{ color: isInApp ? "#fff" : "#007d75" }}>
                {isInApp ? "In-app detected" : "In-app not detected"}
              </h2>
              <p>Not 100% accurate.</p>
            </div>
            <ModalInapp
              button={
                <button
                  className="d-flex"
                  style={{
                    justifyContent: "flex-end",
                  }}
                >
                  <StandInCircle
                    className="d-flex"
                    style={{
                      color: isInApp ? "#B92158" : "#E9FFF6",
                      background: isInApp ? "#fff" : "#449C82",
                    }}
                  >
                    <InfoCircledIcon
                      style={{ margin: "auto" }}
                      width={20}
                      height={20}
                    />
                  </StandInCircle>
                </button>
              }
            >
              <PackageNote>
                Using a fork of the npm package `detect‑inapp` while they have a
                bug with Android Chrome. Package work-around details below:
                <code>
                  "detect-inapp": "github:shalanah/detect-inapp#shalanah-build"
                </code>
              </PackageNote>
            </ModalInapp>
          </InAppBox>
        </Section>
      </div>
    </>
  );
};
