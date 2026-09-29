import { FiCamera, FiMoon, FiSearch, FiSun } from "react-icons/fi";

function Header({ searchQuery, onSearchChange, isDark, onToggleTheme }) {
  return (
    <header className="border-b border-slate-200 bg-white/90 dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-4 py-4 sm:px-6 lg:flex-nowrap lg:px-8">
        <a
          href="#top"
          className="flex shrink-0 items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-600">
          <span className="grid size-10 place-items-center rounded-xl bg-violet-600 text-white">
            <FiCamera aria-hidden="true" />
          </span>
          <span className="font-bold tracking-tight text-slate-950 dark:text-white">
            Frame<span className="text-violet-600">.by</span>Frame
          </span>
        </a>

        <label className="relative order-3 w-full lg:order-none lg:mx-auto lg:max-w-lg">
          <span className="sr-only">Search photos by title or ID</span>
          <FiSearch
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search photos by title or ID..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
        </label>

        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
          className="ml-auto grid size-10 shrink-0 place-items-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-violet-300 hover:text-violet-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-violet-500 dark:hover:text-violet-300">
          {isDark ? (
            <FiSun aria-hidden="true" />
          ) : (
            <FiMoon aria-hidden="true" />
          )}
        </button>
      </div>
    </header>
  );
}

export default Header;
