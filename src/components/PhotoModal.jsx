import { useEffect, useRef } from "react";
import { FiX } from "react-icons/fi";

function PhotoModal({ photo, onClose }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "Tab") {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [photo.id, onClose]);

  return (
    <div
      className="gallery-modal-backdrop fixed inset-0 z-50 grid place-items-center bg-slate-950/75 p-3 backdrop-blur-sm sm:p-6"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}>
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="photo-modal-title"
        className="gallery-modal-panel relative max-h-[94vh] w-full max-w-4xl overflow-auto rounded-2xl bg-white shadow-2xl dark:bg-slate-900">
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close photo preview"
          className="absolute right-3 top-3 z-10 grid size-10 place-items-center rounded-full bg-slate-950/70 text-white transition hover:bg-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
          <FiX aria-hidden="true" size={20} />
        </button>
        <img
          src={photo.url}
          alt={photo.title}
          className="max-h-[68vh] w-full bg-slate-100 object-contain dark:bg-slate-950"
        />
        <div className="flex flex-wrap items-start justify-between gap-4 p-5 sm:p-7">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-violet-700 dark:text-violet-300">
              Photo {photo.id} <span className="px-1 text-slate-400">/</span>{" "}
              Album {photo.albumId}
            </p>
            <h2
              id="photo-modal-title"
              className="text-lg font-semibold capitalize text-slate-900 dark:text-white">
              {photo.title}
            </h2>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PhotoModal;
