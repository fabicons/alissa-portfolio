const INSTAGRAM_HANDLE = "alissaborsaniart";
const EMAIL = "alissaborsani@hotmail.com";

/**
 * Instagram handle + contact email, shown in the footer of every page.
 */
export default function ContactLinks() {
  return (
    <div className="flex flex-col items-center gap-2 text-sm text-[#011f60]/70 sm:flex-row sm:gap-6">
      <a
        href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 underline-offset-4 transition-colors hover:text-[#011f60] hover:underline"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
        @{INSTAGRAM_HANDLE}
      </a>
      <a
        href={`mailto:${EMAIL}`}
        className="inline-flex items-center gap-2 underline-offset-4 transition-colors hover:text-[#011f60] hover:underline"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-10 6L2 7" />
        </svg>
        {EMAIL}
      </a>
    </div>
  );
}
