import { DeviceInfo } from "./DeviceInfo";
import { DownloadTest } from "./DownloadTest";
import { InappEscapeLinks } from "./InappEscapeLinks";
import "./style.css";

export const App = () => {
  return (
    <section>
      <DeviceInfo />
      <DownloadTest />
      <InappEscapeLinks />
    </section>
  );
};
