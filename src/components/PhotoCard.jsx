import { FiMaximize2 } from "react-icons/fi";

function PhotoCard({ photo, onSelect }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-black/30">
      <button
        type="button"
        onClick={() => onSelect(photo)}
        className="block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-violet-600"
        aria-label={`Open photo ${photo.id}: ${photo.title}`}>
        <span className="relative block overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img
            src={photo.thumbnailUrl}
            alt={photo.title}
            loading="lazy"
            className="aspect-4/3 w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <span
            className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-white/90 text-slate-700 opacity-0 shadow transition group-hover:opacity-100 group-focus-within:opacity-100"
            aria-hidden="true">
            <FiMaximize2 />
          </span>
        </span>
        <span className="block p-4 sm:p-5">
          <span className="mb-3 flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-wider text-violet-700 dark:text-violet-300">
            <span>Photo {photo.id}</span>
            <span className="rounded-full bg-violet-50 px-2.5 py-1 dark:bg-violet-950">
              Album {photo.albumId}
            </span>
          </span>
          <span className="block min-h-12 line-clamp-2 text-sm font-semibold leading-6 text-slate-800 dark:text-slate-100">
            {photo.title}
          </span>
        </span>
      </button>
    </article>
  );
}

export default PhotoCard;
