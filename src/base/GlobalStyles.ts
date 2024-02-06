import { createGlobalStyle } from "styled-components";

const displays = [
  "none",
  "flex",
  "inline-flex",
  "block",
  "inline",
  "inline-block",
  "grid",
  "inline-grid",
];

export const GlobalStyle = createGlobalStyle`
  ${displays
    .map(
      (display) => `
    .d-${display} {
      display: ${display} !important;
    }
  `
    )
    .join("\n")}
    .flex-row {
      flex-direction: row;
    }
    .flex-column {
      flex-direction: column;
    }
`;
