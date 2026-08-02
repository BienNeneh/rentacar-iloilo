function FullscreenGallery({
  showGallery,
  setShowGallery,
  currentImage,
  images,
  currentIndex,
  previousImage,
  nextImage,
  car,
}) {
  if (!showGallery) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-50">

      <button
        onClick={previousImage}
        className="absolute left-8 top-1/2 -translate-y-1/2 text-white text-6xl hover:text-blue-400 transition"
      >
        ❮
      </button>

      <button
        onClick={nextImage}
        className="absolute right-8 top-1/2 -translate-y-1/2 text-white text-6xl hover:text-blue-400 transition"
      >
        ❯
      </button>

      <button
        onClick={() => setShowGallery(false)}
        className="absolute top-8 right-8 text-white text-5xl hover:text-gray-300"
      >
        ✕
      </button>

      <div className="absolute top-8 left-8 bg-black/50 text-white px-4 py-2 rounded-full">
        {currentIndex + 1} / {images.length}
      </div>

      {currentImage && (
        <img
          src={currentImage}
          alt={`${car.brand} ${car.model}`}
          onClick={(e) => e.stopPropagation()}
          className="max-w-[90%] max-h-[90%] rounded-2xl shadow-2xl"
        />
      )}

    </div>
  );
}

export default FullscreenGallery;