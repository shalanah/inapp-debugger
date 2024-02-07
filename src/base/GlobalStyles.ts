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
    .justify-content-start {
      justify-content: flex-start;
    }
    .justify-content-end {
      justify-content: flex-end;
    }
    .justify-content-center {
      justify-content: center;
    }
    .justify-content-between {
      justify-content: space-between;
    }
    .justify-content-around {
      justify-content: space-around;
    }
    .align-items-start {
      align-items: flex-start;
    }
    .align-items-end {
      align-items: flex-end;
    }
    .align-items-center {
      align-items: center;
    }
    .align-items-baseline {
      align-items: baseline;
    }
    .align-items-stretch {
      align-items: stretch;
    }
    .g-5 {
      gap: 5px;
    }
    .flex-fill {
      flex: 1 1 auto;
    }
    .m-auto {
      margin: auto;
    }
`;
