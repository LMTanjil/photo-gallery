import { useEffect, useState } from "react";
import { fetchPhotos } from "../api/photos.js";

export function usePhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let isActive = true;

    fetchPhotos()
      .then((result) => {
        if (isActive) {
          setPhotos(result);
        }
      })
      .catch((requestError) => {
        if (isActive) {
          setError(requestError.message || "Unable to load photos.");
        }
      })
      .finally(() => {
        if (isActive) {
          setLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [retryCount]);

  const retry = () => {
    setLoading(true);
    setError(null);
    setRetryCount((count) => count + 1);
  };

  return {
    photos,
    loading,
    error,
    retry,
  };
}
