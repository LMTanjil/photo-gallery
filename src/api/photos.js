const PHOTOS_API_URL = "https://jsonplaceholder.typicode.com/photos";

let cachedPhotos = null;
let photosRequest = null;

export function fetchPhotos() {
  if (cachedPhotos) {
    return Promise.resolve(cachedPhotos);
  }

  if (!photosRequest) {
    photosRequest = fetch(PHOTOS_API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Photo request failed (${response.status}).`);
        }

        return response.json();
      })
      .then((photos) => {
        if (!Array.isArray(photos)) {
          throw new Error("The photo service returned an unexpected response.");
        }

        cachedPhotos = photos.slice(0, 100);
        return cachedPhotos;
      })
      .finally(() => {
        photosRequest = null;
      });
  }

  return photosRequest;
}
