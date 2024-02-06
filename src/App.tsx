import { SectionDeviceInfo } from "./SectionDeviceInfo";
import { SectionDownload } from "./SectionDownload";
import { GlobalStyle } from "./base/GlobalStyles";
import { SectionInappEscape } from "./SectionInappEscape";
import styled from "styled-components";

const Div = styled.div`
  overflow: auto;
  max-width: 400px;
  margin: 0 auto;
`;

export const App = () => {
  return (
    <Div>
      <GlobalStyle />
      <SectionDeviceInfo />
      <SectionDownload />
      <SectionInappEscape />
    </Div>
  );
};
