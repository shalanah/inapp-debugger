import Bowser from "bowser";
import InAppSpy from "inapp-spy";
import { toSentenceCase } from "../utils";
import styled, { keyframes } from "styled-components";
import { Modal } from "../base/Modal";
import {
  InfoCircledIcon,
  CopyIcon,
  GitHubLogoIcon,
  CheckIcon,
} from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
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

const FadeInIcon = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  animation: ${fadeUp} 0.3s ease;
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
  border-radius: var(--border-radius);
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

const StatBox = styled(Box)`
  background: var(--white);
  color: var(--navy);
`;

const InAppBox = styled(Box)`
  flex-direction: row;
  padding: 20px;
  h2 {
    font-weight: bold;
    margin-bottom: 0;
  }
  p {
    margin-bottom: 0;
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

export const getIsIOSOrIPadOSSafari = (ua: string) => {
  const iOS = !!ua.match(/iP(ad|hone)/i);
  const webkit = !!ua.match(/WebKit/i);
  return iOS && webkit && !ua.match(/CriOS/i) && !ua.match(/OPiOS/i);
};

export const getIsSFSafariViewController =
  ({ isInApp, delay = 100 }: { isInApp: boolean; delay: number }) =>
  async () => {
    const ua = window.navigator.userAgent;
    if (isInApp) return false; // don't want any false positives like with Messenger or FB
    if (typeof window === "undefined") return false;
    if (!getIsIOSOrIPadOSSafari(ua)) return false; // not iOS/iPadOS Safari

    // Experimental... `MicrodataExtractor` is undefined in SFSafariViewController but not in full iOS / iPadOS Safari
    // @ts-ignore
    return await new Promise<boolean>((resolve) => {
      setTimeout(() => {
        // @ts-ignore
        resolve(!window?.MicrodataExtractor);
      }, delay);
    });
  };

export const DeviceInfo = () => {
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
  const { isInApp, appName } = InAppSpy();

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

  const copyText =
    `User Agent:\n${ua}\n\n` +
    copyData.map((d) => `${d.name}: ${d.value}`).join("\n");

  const [deviceCopy, setDeviceCopied] = useState({
    copied: 0,
    showCheck: false,
  });

  const [isSFSafariViewController, setIsSFSafariViewController] =
    useState<boolean>(false);
  useEffect(() => {
    const fn = async () => {
      const result = await getIsSFSafariViewController({
        isInApp,
        delay: 300,
      })();
      setIsSFSafariViewController(result);
    };
    fn();
  }, []);

  // const [isSFSafariViewController, setIsSFSafariViewController] =
  //   useState<boolean>(true);
  // useEffect(() => {
  //   const prox = new Proxy(window, {
  //     get: (target, prop, receiver) => {
  //       if (prop === "MicrodataExtractor") {
  //         console.log({ target, prop, receiver });
  //         setIsSFSafariViewController(false);
  //       }
  //       return Reflect.get(target, prop, receiver);
  //     },
  //   });
  // }, []);
  // console.log({ isSFSafariViewController });

  useEffect(() => {
    let timer: number | undefined;
    if (deviceCopy.copied > 0) {
      timer = setTimeout(() => {
        setDeviceCopied((v) => ({ ...v, showCheck: false }));
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [deviceCopy.copied]);

  console.log({
    isInApp,
    appName,
    isSFSafariViewController,
    window,
    // @ts-ignore
    me: window?.MicrodataExtractor,
  });

  // Inapp section
  let inAppTitle = isInApp ? `In-app detected` : "In-app not detected";
  let color = isInApp ? "#fff" : "#007d75";
  let bg = isInApp ? "#B92158" : "#E9FFF6";
  let buttonBg = isInApp ? "#fff" : "#449C82";
  let buttonColor = isInApp ? "#b92158" : "#fff";
  let inAppSubtitle = appName
    ? `${appName} App`
    : isInApp
    ? "That's a bummer."
    : "No news is good news";
  if (isSFSafariViewController) {
    inAppTitle = "SFSafariViewController detected";
    color = "#d14923";
    bg = "#ffecdd";
    buttonBg = color;
    buttonColor = bg;
    inAppSubtitle =
      "This browser is a mix between full-fledge Safari and in-app. Its download UX is extremely poor. Detection is highly experimental. The hope is that Apple will improve the poor download UX so detection is not necessary.";
  }

  return (
    <>
      <Section style={{ marginBottom: 0 }}>
        <Box className="flex-row justify-content-between align-items-center">
          <h2 style={{ margin: 0 }}>Inapp Debugger</h2>
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
          <p style={{ marginBottom: ".65rem" }}>{osText}</p>
          <div className="d-flex flex-row justify-content-between g-5">
            <div>
              <h2 style={{ marginBottom: "2rem" }}>{browserText}</h2>
              <p style={{ wordBreak: "break-word" }}>{ua}</p>
            </div>
            <CopyToClipboard
              text={copyText}
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
              <div className="d-flex justify-content-end align-items-end">
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
            background: bg,
            color,
          }}
        >
          <div className="d-flex flex-column g-5 flex-fill">
            <h2 style={{ color }}>{inAppTitle}</h2>
            <p>{inAppSubtitle}</p>
          </div>
          <Modal
            button={
              <div className="d-flex justify-content-end">
                <Circle
                  as={"button"}
                  style={{
                    color: buttonColor,
                    background: buttonBg,
                  }}
                >
                  <InfoCircledIcon className="m-auto" width={20} height={20} />
                </Circle>
              </div>
            }
          >
            <PackageNote>
              Using the{" "}
              <a
                href="https://www.npmjs.com/package/inapp-spy"
                target="_blank"
                style={{
                  color: "#000",
                  fontWeight: "bold",
                  textDecoration: "underline",
                  textUnderlineOffset: ".2em",
                }}
              >
                `inapp-spy`
              </a>{" "}
              library to detect in-app and SFSafariViewController.
              <br />
              <br />
              If you find this result is incorrect, create an issue on{" "}
              <a
                style={{
                  color: "#000",
                  fontWeight: "bold",
                  textDecoration: "underline",
                  textUnderlineOffset: ".2em",
                }}
                href="https://github.com/shalanah/inapp-spy/issues"
                target="_blank"
              >
                GitHub
              </a>
              .
            </PackageNote>
          </Modal>
        </InAppBox>
      </Section>
    </>
  );
};
