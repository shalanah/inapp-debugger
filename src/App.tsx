import { DeviceInfo } from "./sections/DeviceInfo";
import { Download } from "./sections/Download";
import { GlobalStyle } from "./base/GlobalStyles";
import { InappEscape } from "./sections/InappEscape";
import styled from "styled-components";
import "./index.css";

const Div = styled.div`
  overflow: auto;
  max-width: 400px;
  margin: 0 auto;
`;

export const App = () => {
  if (typeof window === "undefined") return null; // make sure latest + greatest browser info

  // polyfill crypto.randomUUID
  if (!crypto.randomUUID) {
    crypto.randomUUID = () => {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      ) as `${string}-${string}-${string}-${string}-${string}`;
    };
  }

  return (
    <Div>
      <GlobalStyle />
      <DeviceInfo />
      <Download />
      <InappEscape />
    </Div>
  );
};
