export async function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not available."));
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude } = position.coords;
          const { longitude } = position.coords;
          resolve({
            latitude,
            longitude,
          });
        },
        (error) => {
          reject(error);
        },
      );
    }
  });
}
