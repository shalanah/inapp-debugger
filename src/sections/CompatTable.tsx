import { useMemo } from "react";
import {
  getCompatRows,
  resolveNotes,
  type CompatRow,
  type Platform,
} from "../../compat/utils";
import compatJson from "../../compat/compat.json";
import { cn } from "../utils/cn";

const noteDefinitions = compatJson.noteDefinitions as Record<string, string>;

const CellSupports = ({
  title,
  type,
  row,
}: {
  title: string;
  type: string;
  row: CompatRow;
}) => {
  const status = {
    cls: "text-white bg-rose-600",
    support: "Unknown",
    msg: "",
  };
  switch (row.support[type]) {
    case "y":
      status.cls = "bg-[rgb(137_244_199)]";
      status.support = "Yes";
      status.msg = row.notes[type]
        ? resolveNotes(row.notes[type], noteDefinitions)
        : "";
      break;
    case "n":
      status.cls = "bg-[#FF185D]";
      status.support = "No";
      status.msg = row.notes[type]
        ? resolveNotes(row.notes[type], noteDefinitions)
        : "";
      break;
  }

  return (
    <div>
      <div className="flex items-center">
        <span className="sr-only">
          {status.support === "Yes" ? "Supports " : "Does not support "}
        </span>
        {status.support === "Yes" ? (
          <span
            className={cn("rounded-full w-[10px] h-[10px] mr-1", status.cls)}
          />
        ) : (
          <span
            className={cn("rounded-full w-[10px] h-[10px] mr-1", status.cls)}
          />
        )}
        {title}
      </div>
      {status.msg && (
        <div className="mt-0.5 ml-[calc(10px+0.25rem)] text-xs text-[rgb(88_103_134)]">
          <span className="sr-only">Behavior:</span> {status.msg}
        </div>
      )}
    </div>
  );
};

function PlatformTable({ platform }: { platform: Platform }) {
  const rows = useMemo(() => getCompatRows(platform), [platform]);
  const platformLabel = platform === "android" ? "Android" : "iOS";
  const headerCellClasses = cn(
    "pt-5 pb-3 px-4 border-b border-gray-200 border-solid border-x-transparent border-t-transparent font-normal  rounded-tl-[var(--border-radius)] text-left",
  );
  const cellClasses = cn(
    "pt-2 pb-2.5 px-4 border-b border-gray-200 border-solid border-x-transparent border-t-transparent font-normal align-top",
  );
  const isIOS = platform === "ios";
  return (
    <div>
      <div>
        <table className="bg-white rounded-[var(--border-radius)] text-sm font-normal border-spacing-0 text-[rgb(17_16_77)] mb-10 mx-auto">
          <thead>
            <tr>
              <th className={cn(headerCellClasses, "sticky left-0 bg-white")}>
                {platformLabel} apps
              </th>
              <th className={cn(headerCellClasses)} colSpan={2}>
                Downloads
              </th>
              <th
                className={cn(headerCellClasses, "pr-8")}
                colSpan={isIOS ? 2 : 1}
              >
                {platform === "android" ? "Escape links" : "Escape links"}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const last = i === rows.length - 1;
              const appType = {
                text: "Unknown",
                cls: "bg-gray-400",
              };
              if (row.engine?.type) {
                if (
                  ["android_webview", "webview", "wkwebview"].includes(
                    row.engine.type.toLowerCase(),
                  )
                ) {
                  appType.text = "In-app";
                  appType.cls = "bg-[#FF185D] text-white";
                }
                if (
                  ["sfsafariviewcontroller"].includes(
                    row.engine.type.toLowerCase(),
                  )
                ) {
                  appType.text = "SFSVC";
                  appType.cls = "bg-[#F6ECEF] text-[#C30B42]";
                }
                if (
                  ["default_browser"].includes(row.engine.type.toLowerCase())
                ) {
                  appType.text = "Default browser";
                  appType.cls = "text-[rgb(0_125_117)] bg-[rgb(233_255_246)]";
                }
                if (
                  ["android_tab_view"].includes(row.engine.type.toLowerCase())
                ) {
                  appType.text = "Tab view";
                  appType.cls = "bg-slate-100";
                }
              }

              return (
                <tr key={row.appId}>
                  <td
                    className={cn(
                      cellClasses,
                      "sticky left-0 bg-white",
                      last && "rounded-bl-[var(--border-radius)]",
                    )}
                  >
                    <div className="flex flex-col gap-0.5 w-[18ch]">
                      <span>{row.appName}</span>
                      <span>
                        <span
                          className={cn(
                            "rounded-full inline-block py-0.5 px-2.5 whitespace-nowrap text-[.7rem]",
                            appType.cls,
                          )}
                        >
                          {appType.text}
                        </span>
                      </span>
                    </div>
                  </td>
                  <td className={cn(cellClasses)}>
                    <div className="w-[18ch]">
                      <CellSupports
                        title="Blob URLs"
                        type="blob_download"
                        row={row}
                      />
                    </div>
                  </td>
                  <td className={cn(cellClasses)}>
                    <div className="w-[18ch]">
                      <CellSupports
                        title="Static assets"
                        type="static_download"
                        row={row}
                      />
                    </div>
                  </td>
                  {isIOS ? (
                    <>
                      <td className={cn(cellClasses)}>
                        <div className="w-[18ch]">
                          <CellSupports
                            title="Safari scheme"
                            type="safari_escape"
                            row={row}
                          />
                        </div>
                      </td>
                      <td
                        className={cn(
                          cellClasses,
                          last && "rounded-br-[var(--border-radius)]",
                        )}
                      >
                        <div className="w-[18ch]">
                          <CellSupports
                            title="Browser scheme"
                            type="browser_escape"
                            row={row}
                          />
                        </div>
                      </td>
                    </>
                  ) : (
                    <td
                      className={cn(
                        cellClasses,
                        last && "rounded-br-[var(--border-radius)]",
                      )}
                    >
                      <div className="w-[18ch]">
                        <CellSupports
                          title="Intent links"
                          type="intent_escape"
                          row={row}
                        />
                      </div>
                    </td>
                  )}
                  {/* <td className={cn(cellClasses)}>
                    <div className="w-[18ch] flex flex-col gap-2">
                      {platform === "android" ? (
                        <CellSupports
                          title="Intent links"
                          type="intent_escape"
                          row={row}
                        />
                      ) : (
                        <>
                          <CellSupports
                            title="Safari scheme"
                            type="safari_escape"
                            row={row}
                          />
                          <CellSupports
                            title="Browser scheme"
                            type="browser_escape"
                            row={row}
                          />
                        </>
                      )}
                    </div>
                  </td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function CompatTable() {
  return (
    <div className="p-4 flex flex-col gap-4 w-full  ">
      <div className="mx-auto">
        <p className="text-sm mb-6 mt-3 ml-3 text-center">
          Based on most recent app builds. Open a{" "}
          <a
            href="https://github.com/shalanah/inapp-debugger/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#5c60f8] hover:underline font-bold"
          >
            ticket
          </a>{" "}
          if you find any issues.
        </p>
        <div className="max-w-[calc(100vw-2rem)] overflow-x-scroll">
          <PlatformTable platform="android" />
          <PlatformTable platform="ios" />
        </div>
      </div>
    </div>
  );
}
