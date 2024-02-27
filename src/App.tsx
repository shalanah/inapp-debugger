import { DeviceInfo } from "./sections/DeviceInfo";
import { Download } from "./sections/Download";
import { GlobalStyle } from "./base/GlobalStyles";
import { InappEscape } from "./sections/InappEscape";
import styled from "styled-components";

const Div = styled.div`
  overflow: auto;
  max-width: 400px;
  margin: 0 auto;
`;

export const App = () => {
  if (typeof window === "undefined") return null; // make sure latest + greatest browser info
  return (
    <Div>
      <GlobalStyle />
      <DeviceInfo />
      <Download />
      <InappEscape />
    </Div>
  );
};
