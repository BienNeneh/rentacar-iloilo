function CarGallery({
  car,
  images,
  currentImage,
  setCurrentImage,
  setShowGallery,
}) {
  const currentIndex = images.indexOf(currentImage);

  return (
    <div className="w-full">

      {/* Header */}

      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">

        <h2 className="text-xl md:text-2xl font-bold">
          Photos
        </h2>

        <span className="
          bg-white
          px-3
          py-2
          md:px-4
          rounded-full
          shadow
          text-gray-600
          text-sm
        ">
          📷 {currentIndex + 1} / {images.length}
        </span>

      </div>

      {/* Main Image */}

      {currentImage && (

        <div
          onClick={() => setShowGallery(true)}
          className="
            w-full
            aspect-[4/3]
            md:aspect-[16/10]
            bg-gray-100
            rounded-3xl
            shadow-2xl
            overflow-hidden
            cursor-pointer
          "
        >

          <img
            src={currentImage}
            alt={`${car.brand} ${car.model}`}
            className="
              w-full
              h-full
              object-contain
              hover:scale-[1.02]
              transition-transform
              duration-300
            "
          />

        </div>

      )}

      {/* Thumbnails */}

      <div className="
        flex
        gap-3
        mt-5
        overflow-x-auto
        pb-2
        snap-x
      ">

        {images.map((img, index) => (

          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => setCurrentImage(img)}
            className={`
              w-16
              h-16
              sm:w-20
              sm:h-16
              md:w-24
              md:h-20
              lg:w-28
              lg:h-20

              rounded-2xl
              object-cover
              cursor-pointer
              flex-shrink-0
              snap-start
              transition-all
              duration-300

              ${
                currentImage === img
                  ? "ring-4 ring-blue-500 scale-105"
                  : "hover:scale-105 hover:shadow-xl"
              }
            `}
          />

        ))}

      </div>

    </div>
  );
}

export default CarGallery;