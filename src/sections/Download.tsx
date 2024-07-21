import { Card } from "../base/Card";
import { DownloadIcon } from "@radix-ui/react-icons";

const onClick = () => {
  const svg = new Blob(
    [
      `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="#FF0066"
          d="M64.5,-19.8C71.7,1.1,57.4,30.2,34.6,46.4C11.9,62.6,-19.2,65.9,-39.4,51.8C-59.7,37.7,-69.1,6.1,-60.7,-16.6C-52.3,-39.2,-26.2,-52.9,1.3,-53.3C28.7,-53.7,57.3,-40.8,64.5,-19.8Z"
          transform="translate(100 100)"
        />
      </svg>`,
    ],
    { type: "image/svg+xml" }
  );
  const url = URL.createObjectURL(svg);
  const a = document.createElement("a");
  a.href = url;
  a.download = "blob.svg";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const Download = () => {
  return (
    <Card
      light
      title="Download Tests"
      icon={<DownloadIcon width={30} height={30} />}
      intro={
        <>
          <p>In‑app browsers disable downloads by default.</p>
          <p>
            On‑the‑fly (blob) downloads often fail silently. Assets (static) may
            open in a standalone browser window.
          </p>
        </>
      }
      items={[
        {
          title: "SVG blob download",
          type: "button",
          onClick: onClick,
        },
        {
          download: true,
          title: "SVG static download",
          type: "link",
          href: "static.svg",
        },
      ]}
    />
  );
};
