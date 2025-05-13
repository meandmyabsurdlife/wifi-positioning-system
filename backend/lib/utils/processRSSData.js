export const processRSSData = (data, accessPoints) => {
    // Untuk setiap AP dalam daftar accessPoints
    accessPoints.forEach((ap) => {
        // Jika akses point tidak ada di dalam data, set nilai menjadi 100
        if (!(ap in data)) {
          data[ap] = 100;
        }
      });
    return data;
};