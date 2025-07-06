import { ReactNode, Fragment } from "react";

export const toSentenceCase = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getDetectionFeedback = ({
  isInApp,
  isSFSVC,
  appName,
}: {
  isInApp: boolean;
  isSFSVC: boolean;
  appName: string | undefined;
}): {
  inAppTitle: string;
  color: string;
  bg: string;
  buttonBg: string;
  buttonColor: string;
  inAppSubtitle: ReactNode;
} => {
  if (isInApp) {
    return {
      inAppTitle: "In-app detected",
      color: "#fff",
      bg: "#B92158",
      buttonBg: "#fff",
      buttonColor: "#b92158",
      inAppSubtitle: appName ? `${appName} App` : "That's a bummer.",
    };
  } else if (isSFSVC) {
    return {
      inAppTitle: "SFSafariViewController detected",
      color: "#d14923",
      bg: "#ffecdd",
      buttonBg: "#d14923",
      buttonColor: "#ffecdd",
      inAppSubtitle: (
        <Fragment>
          Detection is highly experimental for Safari 17+ using{" "}
          <code>SFSVCExperimental()</code> from <code>inapp-spy</code>.<br />
          <br />
          SFSVC is an in-app browser that has a cumbersome downloading
          experience compared to a native browser. Here's hoping it becomes more
          streamlined so we don't have to detect it!
          <br />
          <br />
          If there is an error in detection please see info button to report any
          issues.
        </Fragment>
      ),
    };
  }
  return {
    inAppTitle: "In-app not detected",
    color: "#007d75",
    bg: "#E9FFF6",
    buttonBg: "#449C82",
    buttonColor: "#fff",
    inAppSubtitle: "No news is good news",
  };
};
