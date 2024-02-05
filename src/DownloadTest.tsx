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
  a.download = "builtBlob.svg";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const DownloadTest = () => {
  return (
    <>
      <div>
        <h2>Download</h2>
        <p className="desc">
          Downloads are not supported in most in-app browsers. Sometimes assets
          open up as stand-alone files but no UI to download resulting graphic.
        </p>
        <ul>
          <li>
            <button onClick={onClick}>SVG blob download</button>
          </li>
          <li>
            <a download href="blob.svg">
              SVG static download
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};
