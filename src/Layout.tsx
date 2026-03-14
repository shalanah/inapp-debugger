import { Link, Outlet } from "@tanstack/react-router";
import { GlobalStyle } from "./base/GlobalStyles";
import "./index.css";
import { cn } from "./utils/cn";

import { GitHubLogoIcon } from "@radix-ui/react-icons";

const linkClasses = cn(
  "flex items-center gap-2",
  "pt-3 pb-2 px-4",
  "no-underline text-inherit font-semibold",
  "transition-[background-color,color] duration-200",
  "rounded-[15px_15px_0_0]",
  "[&:hover:not([data-status=active])]:bg-[#5c60f8]",
  "[&:hover:not([data-status=active])]:text-white",
  "[&[data-status=active]]:bg-[var(--light-blue)]",
  "active:[transform:none]",
);

export const Layout = () => (
  <>
    <GlobalStyle />
    <nav className="flex gap-1.5 pt-3 px-4 w-full bg-white leading-none justify-center border-b border-gray-200">
      <Link to="/" className={cn(linkClasses, "whitespace-nowrap")}>
        Inapp Debugger
      </Link>
      <Link to="/compat" className={linkClasses}>
        Stats
      </Link>
      <a
        href="https://github.com/shalanah/inapp-debugger"
        target="_blank"
        className={linkClasses}
      >
        <GitHubLogoIcon width={"1.25rem"} height={"1.25rem"} />
        <span className="sr-only">GitHub</span>
      </a>
    </nav>
    <main
      className={"min-h-[100vh]"}
      style={{ background: "var(--light-blue)" }}
    >
      <Outlet />
    </main>
  </>
);
