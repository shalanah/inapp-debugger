import Bowser from "bowser";
import InApp from "detect-inapp"; // using "detect-inapp": "github:shalanah/detect-inapp#shalanah-build", for now while Android Chrome but in regular detect-inapp package
import { toSentenceCase } from "./utils";
import styled, { keyframes } from "styled-components";
import { Modal } from "./base/Modal";
import {
  InfoCircledIcon,
  CopyIcon,
  GitHubLogoIcon,
  CheckIcon,
} from "@radix-ui/react-icons";
import { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  padding: 0px 15px;
`;
const Box = styled.div`
  width: 100%;
  padding: 25px 20px 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  h2 {
    font-size: 1.35rem;
    font-weight: normal;
    line-height: 1.15;
    text-wrap: balance;
    flex: 1;
    margin-bottom: 0.25rem;
  }
  p {
    font-size: 0.8rem;
    margin-bottom: 0.25rem;
  }
  p:last-of-type {
    margin-bottom: 0px;
  }
`;

const FadeInIcon = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  animation: ${fadeUp} 0.3s ease;
`;

const StatBox = styled(Box)`
  background: var(--white);
  color: var(--navy);
`;

const InAppBox = styled.div`
  /* position: -webkit-sticky
  position: sticky;
  top: 0px; */
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

const Circle = styled.div`
  width: 34px;
  height: 34px;
  background: #000;
  border-radius: 50%;
  justify-content: center;
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

export const SectionDeviceInfo = () => {
  const browser = Bowser.getParser(window.navigator.userAgent);
  const platform = browser.getPlatform() || "";
  const vendor = toSentenceCase(platform.vendor || "");
  const device = toSentenceCase(platform.type || "");
  const browserName = toSentenceCase(browser.getBrowserName());
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

  console.log(browser);

  let osText = "Unknown device";
  if (osVersionName || osVersion || vendor || osName || device) {
    osText = `${vendor} ${osName} ${device} ${
      osVersionName || "Version"
    } ${osVersion}`;
  }

  let browserText: React.ReactNode = "Unknown Browser";
  if (browserName || browserVersion || engine) {
    browserText = (
      <>
        {browserName} {browserVersion}{" "}
        {engine && (
          <>
            <br />
            {engine}
          </>
        )}
      </>
    );
  }

  const copyData = [
    {
      name: "Device",
      value: device || "N/A",
    },
    { name: "Vendor", value: vendor || "N/A" },
    { name: "OS", value: osName || "N/A" },
    { name: "Version Name", value: osVersionName || "N/A" },
    { name: "Version", value: osVersion || "N/A" },
    { name: "Browser", value: browserName || "N/A" },
    { name: "Browser Version", value: browserVersion || "N/A" },
    { name: "Engine", value: engine || "N/A" },
  ];

  const [deviceCopy, setDeviceCopied] = useState({
    value:
      `User Agent:\n${ua}\n\n` +
      copyData.map((d) => `${d.name}: ${d.value}`).join("\n"),
    copied: 0,
    showCheck: false,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeviceCopied((v) => ({ ...v, showCheck: false }));
    }, 2000);
    return () => clearTimeout(timer);
  }, [deviceCopy.copied]);

  return (
    <>
      <Section style={{ marginBottom: 0 }}>
        <Box style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <h2>Inapp Debugger</h2>
          <Circle
            as={"a"}
            target="_blank"
            href="https://github.com/shalanah/inapp-debugger"
            style={{
              color: "var(--light-blue)",
              background: "var(--navy)",
            }}
          >
            <GitHubLogoIcon width={20} height={20} />
          </Circle>
        </Box>
      </Section>
      <Section>
        <StatBox>
          <p style={{ marginBottom: "1.3rem", wordBreak: "break-word" }}>
            {ua}
          </p>
          <div
            className="d-flex flex-row"
            style={{ justifyContent: "space-between", gap: 5 }}
          >
            <div>
              <h2>{browserText}</h2>
              <p style={{ wordBreak: "break-word" }}>{osText}</p>
            </div>
            <CopyToClipboard
              text={deviceCopy.value}
              onCopy={
                deviceCopy.showCheck
                  ? () => {} // disabled state
                  : () =>
                      setDeviceCopied((v) => ({
                        ...v,
                        copied: v.copied + 1,
                        showCheck: true,
                      }))
              }
            >
              <div
                className="d-flex"
                style={{ justifyContent: "flex-end", alignItems: "flex-end" }}
              >
                <Circle
                  as={"button"}
                  style={{
                    pointerEvents: deviceCopy.showCheck ? "none" : "auto",
                    color: "var(--light-blue)",
                    background: "var(--navy)",
                  }}
                >
                  {deviceCopy.showCheck ? (
                    <FadeInIcon
                      key={`${deviceCopy.showCheck}-${deviceCopy.copied}`}
                    >
                      <CheckIcon width={20} height={20} />
                    </FadeInIcon>
                  ) : (
                    <FadeInIcon
                      key={`${deviceCopy.showCheck}-${deviceCopy.copied}`}
                      style={
                        deviceCopy.copied === 0 ? { animation: "none" } : {}
                      }
                    >
                      <CopyIcon width={17} height={17} />
                    </FadeInIcon>
                  )}
                </Circle>
              </div>
            </CopyToClipboard>
          </div>
        </StatBox>
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
          <Modal
            button={
              <div
                className="d-flex"
                style={{
                  justifyContent: "flex-end",
                }}
              >
                <Circle
                  as={"button"}
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
                </Circle>
              </div>
            }
          >
            <PackageNote>
              Using a fork of the npm package `detect‑inapp` while they have a
              bug with Android Chrome. Package work-around details below:
              <code>
                "detect-inapp": "github:shalanah/detect-inapp#shalanah-build"
              </code>
            </PackageNote>
          </Modal>
        </InAppBox>
      </Section>
    </>
  );
};
