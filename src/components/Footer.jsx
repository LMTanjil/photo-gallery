import { FiCamera } from "react-icons/fi";

function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-center text-sm text-slate-500 sm:flex-row sm:px-6 sm:text-left lg:px-8">
        <a
          href="#top"
          className="inline-flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-300">
          <FiCamera aria-hidden="true" className="text-violet-600" />{" "}
          Frame.byFrame
        </a>
        <p>
          Made for the love of looking closer · Photo data via JSONPlaceholder
        </p>
        <p>© {new Date().getFullYear()} Frame.byFrame</p>
      </div>
    </footer>
  );
}

export default Footer;
