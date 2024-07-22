import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Modal } from "../base/Modal";
import { ModalContentStyling } from "./DeviceInfo";

export const InappEscapeShortcutsDesc = () => {
  return (
    <p
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      Works on iOS 17 + 18&nbsp;beta{" "}
      <Modal
        button={
          <button
            style={{
              width: "1.75rem",
              height: "1.75rem",
              display: "flex",
              margin: "0 0 0 0.45rem",
              alignItems: "center",
              justifyContent: "center",
              padding: 4,
            }}
          >
            <p className="sr-only">Shortcuts fallback info</p>
            <InfoCircledIcon width={"100%"} height={"100%"} />
          </button>
        }
      >
        <ModalContentStyling>
          The{" "}
          <a
            href="https://github.com/shalanah/inapp-debugger/pull/2"
            target="_blank"
            style={{
              color: "#000",
              fontWeight: "bold",
              textDecoration: "underline",
              textUnderlineOffset: ".2em",
            }}
          >
            Shortcuts fallback
          </a>{" "}
          method will run a shortcut that doesn't exist, reference your URL in
          an error callback, and then open that URL in the user's default
          browser.
          <br />
          <br />
          This approach comes with side effects. It opens the Shortcuts app on
          the device and adds some query params to the URL.
          <br />
          <br />
          Works on iOS 17 + 18 beta, latest iPadOS, and latest MacOS. Might work
          on earlier Apple OS versions.
          <br />
          <br />
          Shortcuts app is installed by default on Mac products but could be
          uninstalled by the user, although unlikely.
        </ModalContentStyling>
      </Modal>
    </p>
  );
};
