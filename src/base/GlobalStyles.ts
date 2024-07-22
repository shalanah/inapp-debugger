import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    /* Modal... TODO: Move into styled comps? */
    .DialogOverlay {
        background-color: rgba(0, 0, 0, 0.5);
        position: fixed;
        inset: 0;
        animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
      }
      .DialogContent {
        background-color: white;
        border-radius: var(--border-radius);
        box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
          hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90vw;
        max-width: 450px;
        max-height: 85vh;
        padding: 30px;
        animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
      }
      .DialogContent:focus {
        outline: none;
      }
      .IconButton {
        font-family: inherit;
        border-radius: 100%;
        height: 25px;
        width: 25px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: #000;
        position: absolute;
        top: 10px;
        right: 10px;
        background-color: #fff;
      }
      .IconButton:hover {
        background-color: #f7f7f7;
      }
      .IconButton:focus {
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
      }

      @keyframes overlayShow {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      @keyframes contentShow {
        from {
          opacity: 0;
          transform: translate(-50%, -48%) scale(0.96);
        }
        to {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
      }
`;
