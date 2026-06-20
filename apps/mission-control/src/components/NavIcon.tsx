import type { ReactNode } from "react";

type NavIconName = "evidence" | "resource" | "toggle";

const paths: Record<NavIconName, ReactNode> = {
  evidence: <><path d="M6 3h9l3 3v15H6z" /><path d="M15 3v4h4M9 11h6M9 15h6" /></>,
  resource: <><circle cx="12" cy="12" r="8" /><path d="M7.5 15a5 5 0 0 1 9-4M12 12l3-3" /></>,
  toggle: <path d="M9 6l-4 6 4 6M15 5h5v14h-5" />,
};

export function NavIcon({ name }: { name: NavIconName }) {
  return <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
}
