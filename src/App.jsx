import { usePhotos } from "./hooks/usePhotos.js";

function App() {
  const { photos, loading, error, retry } = usePhotos();

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-violet-600">
          Photo Gallery
        </p>
        <h1 className="my-2 text-3xl font-bold">
          A little inspiration, in every frame
        </h1>
        <p>Browse the first 100 photos from the collection.</p>
      </header>

      {loading && <p role="status">Loading photos…</p>}

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-300 bg-red-50 p-6 text-red-900">
          <p>{error}</p>
          <button
            type="button"
            onClick={retry}
            className="mt-4 rounded-lg bg-red-800 px-4 py-2 font-semibold text-white">
            Try again
          </button>
        </div>
      )}

      {!loading && !error && (
        <section
          aria-label="Photo collection"
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {photos.map((photo) => (
            <article
              key={photo.id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <img
                src={photo.thumbnailUrl}
                alt={photo.title}
                className="aspect-4/3 w-full object-cover"
              />
              <div className="p-4">
                <p className="line-clamp-2 font-medium">{photo.title}</p>
                <p className="mt-2 text-sm text-slate-500">
                  Photo {photo.id} · Album {photo.albumId}
                </p>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default App;
