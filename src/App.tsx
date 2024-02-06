import { DeviceInfo } from "./DeviceInfo";
import { DownloadTest } from "./DownloadTest";
import { GlobalStyle } from "./GlobalStyles";
import { InappEscapeLinks } from "./InappEscapeLinks";
import "./style.css";

export const App = () => {
  return (
    <section>
      <GlobalStyle />
      <DeviceInfo />
      <DownloadTest />
      <InappEscapeLinks />
    </section>
  );
};
