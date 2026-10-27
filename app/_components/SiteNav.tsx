"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/collection-1", label: "Collection I" },
  { href: "/collection-2", label: "Collection II" },
  { href: "/current-work", label: "Current Work" },
];

/**
 * Primary site navigation. Rendered as a soft "oval" card on the home page
 * (per the mockups) and inline on inner pages. The active route is highlighted.
 */
export default function SiteNav({ variant = "inline" }: { variant?: "hero" | "inline" }) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Collections"
      className={
        variant === "hero"
          ? "rounded-[50%] border border-[#011f60]/20 bg-white/80 px-8 py-6 shadow-sm backdrop-blur-sm sm:px-14 sm:py-8"
          : "w-full border-y border-[#011f60]/15 bg-white/70 py-3 backdrop-blur-sm"
      }
    >
      <ul
        className={
          variant === "hero"
            ? "flex flex-col items-center gap-2 text-lg sm:text-xl"
            : "flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-base sm:text-lg"
        }
      >
        {links.map(({ href, label }) => {
          const active = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`relative inline-block tracking-wide transition-colors hover:text-[#011f60] ${
                  active
                    ? "text-[#011f60] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:bg-[#011f60]"
                    : "text-[#011f60]/70"
                }`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
