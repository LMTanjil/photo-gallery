import { useCallback, useEffect, useState } from "react";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import PhotoGallery from "./components/PhotoGallery.jsx";
import PhotoModal from "./components/PhotoModal.jsx";
import { usePhotos } from "./hooks/usePhotos.js";

function App() {
  const { photos, loading, error, retry } = usePhotos();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDark, setIsDark] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const closeModal = useCallback(() => setSelectedPhoto(null), []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <div
      id="top"
      className="flex min-h-screen flex-col bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isDark={isDark}
        onToggleTheme={() => setIsDark((currentTheme) => !currentTheme)}
      />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <section
          className="mb-9 max-w-2xl sm:mb-12"
          aria-labelledby="gallery-heading">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">
            A collection of moments
          </p>
          <h1
            id="gallery-heading"
            className="mb-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl dark:text-white">
            Find your next favorite frame.
          </h1>
          <p className="text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-400">
            A little inspiration, one photo at a time. Explore the first 100
            snapshots from our community collection.
          </p>
        </section>
        <PhotoGallery
          photos={photos}
          loading={loading}
          error={error}
          onRetry={retry}
          onPhotoSelect={setSelectedPhoto}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery("")}
        />
      </main>
      <Footer />
      {selectedPhoto && (
        <PhotoModal photo={selectedPhoto} onClose={closeModal} />
      )}
    </div>
  );
}

export default App;
