"use client";

import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/collection-1", label: "Collection I" },
  { href: "/collection-2", label: "Collection II" },
  { href: "/current-work", label: "Current Work" },
];

/**
 * Primary site navigation: an elegant, letter-spaced horizontal menu with thin
 * dividers and an underline that grows from the centre on hover. The active
 * route stays underlined. The "hero" variant sits open on the landing page; the
 * "inline" variant is framed by a hairline bar on inner pages.
 */
export default function SiteNav({
  variant = "inline",
}: {
  variant?: "hero" | "inline";
}) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Collections"
      className={
        variant === "inline"
          ? "w-full border-y border-[#011f60]/15 bg-white/55 py-4 backdrop-blur-sm"
          : "w-full"
      }
    >
      <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs tracking-[0.25em] uppercase sm:gap-x-9 sm:text-sm">
        {links.map(({ href, label }, index) => {
          const active = pathname === href;
          return (
            <Fragment key={href}>
              {index > 0 && (
                <li
                  aria-hidden
                  className="hidden h-3.5 w-px bg-[#011f60]/25 sm:block"
                />
              )}
              <li>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`group relative inline-block py-1 transition-colors ${
                    active
                      ? "text-[#011f60]"
                      : "text-[#011f60]/55 hover:text-[#011f60]"
                  }`}
                >
                  {label}
                  <span
                    className={`absolute -bottom-0.5 left-1/2 h-px -translate-x-1/2 bg-[#011f60] transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              </li>
            </Fragment>
          );
        })}
      </ul>
    </nav>
  );
}
