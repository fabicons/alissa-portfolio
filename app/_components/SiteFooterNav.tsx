import Link from "next/link";
import ContactLinks from "@/app/_components/ContactLinks";
import SiteNav from "@/app/_components/SiteNav";

/**
 * Shared footer navigation used on every inner page (collections + current
 * work): the main menu followed by a "back to home" link.
 */
export default function SiteFooterNav() {
  return (
    <nav className="mt-16 flex w-full flex-col items-center gap-6 border-t border-[#011f60]/15 pt-10">
      <SiteNav variant="inline" />
      <ContactLinks />
      <Link
        href="/"
        className="text-sm text-[#011f60]/60 underline-offset-4 transition-colors hover:text-[#011f60] hover:underline"
      >
        ← Back to home
      </Link>
    </nav>
  );
}
