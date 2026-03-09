import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Modal } from "../base/Modal";
import { ModalContentStyling } from "./DeviceInfo";

export const InappEscapeSafariDesc = () => {
  return (
    <p
      style={{
        marginTop: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      iOS 17+ try href first, then window.
      <Modal
        title={"Shortcuts fallback info"}
        desc={"Learn more about the Shortcuts fallback method."}
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
              flexShrink: "0",
            }}
          >
            <p className="sr-only">Shortcuts fallback info</p>
            <InfoCircledIcon width={"100%"} height={"100%"} />
          </button>
        }
      >
        <ModalContentStyling>
          In a link's href use:
          <code>"x-safari-https://..."</code>
          <br />
          This does not universally work. So if this fails, next try the click
          method: <code>window.open("x-safari-https://...", "_blank")</code>
        </ModalContentStyling>
      </Modal>
    </p>
  );
};
