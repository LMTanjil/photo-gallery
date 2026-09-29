import { useMemo } from "react";
import { FiAlertCircle, FiImage, FiRefreshCw } from "react-icons/fi";
import PhotoCard from "./PhotoCard.jsx";

function PhotoGallery({
  photos,
  loading,
  error,
  onRetry,
  onPhotoSelect,
  searchQuery,
  albumId,
  onAlbumChange,
  onClearFilters,
}) {
  const filteredPhotos = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return photos.filter(
      (photo) =>
        (albumId === "all" || photo.albumId === Number(albumId)) &&
        (!normalizedQuery ||
          photo.title.toLowerCase().includes(normalizedQuery) ||
          String(photo.id).includes(normalizedQuery)),
    );
  }, [photos, searchQuery, albumId]);
  const albumIds = useMemo(
    () => [...new Set(photos.map((photo) => photo.albumId))].sort((a, b) => a - b),
    [photos],
  );

  if (loading) {
    return (
      <section
        aria-label="Loading photos"
        aria-busy="true"
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 12 }, (_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
            aria-hidden="true">
            <div className="aspect-4/3 animate-pulse bg-slate-200 dark:bg-slate-800" />
            <div className="space-y-3 p-5">
              <div className="h-3 w-1/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>
        ))}
      </section>
    );
  }

  if (error) {
    return (
      <div
        role="alert"
        className="mx-auto flex max-w-lg flex-col items-center rounded-2xl border border-red-200 bg-red-50 px-6 py-12 text-center dark:border-red-900 dark:bg-red-950/40">
        <span className="mb-4 grid size-14 place-items-center rounded-2xl bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300">
          <FiAlertCircle aria-hidden="true" size={26} />
        </span>
        <h2 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">
          We couldn’t load the gallery
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300">{error}</p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 font-semibold text-white transition hover:bg-violet-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600">
          <FiRefreshCw aria-hidden="true" /> Try again
        </button>
      </div>
    );
  }

  if (filteredPhotos.length === 0) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center py-20 text-center">
        <span className="mb-4 grid size-14 place-items-center rounded-2xl bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
          <FiImage aria-hidden="true" size={26} />
        </span>
        <h2 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">
          {photos.length === 0 ? "No photos to show" : "No photos found"}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {photos.length === 0
            ? "The collection is empty right now. Please check back soon."
            : "Try adjusting your search or album selection to find what you’re looking for."}
        </p>
        {photos.length > 0 && (
          <button
            type="button"
            onClick={onClearFilters}
            className="mt-5 rounded-lg px-3 py-2 text-sm font-semibold text-violet-700 transition hover:bg-violet-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 dark:text-violet-300 dark:hover:bg-violet-950">
            Clear filters
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="mb-5 flex flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <p aria-live="polite">
          Showing{" "}
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            {filteredPhotos.length}
          </span>{" "}
          of {photos.length} photos
        </p>
        <label className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-300">
          <span>Album</span>
          <select
            value={albumId}
            onChange={(event) => onAlbumChange(event.target.value)}
            className="min-w-36 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-800 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
            <option value="all">All albums</option>
            {albumIds.map((id) => (
              <option key={id} value={id}>Album {id}</option>
            ))}
          </select>
        </label>
      </div>
      <section
        aria-label="Photo collection"
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredPhotos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} onSelect={onPhotoSelect} />
        ))}
      </section>
    </>
  );
}

export default PhotoGallery;
