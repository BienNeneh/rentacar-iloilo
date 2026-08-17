import { useRef } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { uploadImage } from "../../services/cloudinary";

function ImageUploader({ image, setImage }) {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // =========================================================
    // FILE TYPE VALIDATION
    // =========================================================

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a JPG, PNG, or WEBP image.");
      e.target.value = "";
      return;
    }

    // =========================================================
    // FILE SIZE VALIDATION
    // Maximum: 5 MB
    // =========================================================

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      alert("Image must be smaller than 5MB.");
      e.target.value = "";
      return;
    }

    // =========================================================
    // UPLOAD
    // =========================================================

    try {
      const imageUrl = await uploadImage(file);

      setImage(imageUrl);

      console.log("Uploaded:", imageUrl);
    } catch (error) {
      console.error("Image upload error:", error);
      alert("Image upload failed. Please try again.");
    }

    // Allow the user to select the same file again
    e.target.value = "";
  };

  return (
    <div>

      {/* =====================================================
          LABEL
      ===================================================== */}

      <label className="mb-3 block text-lg font-semibold">
        Car Image
      </label>


      {/* =====================================================
          UPLOAD AREA
      ===================================================== */}

      <div
        onClick={!image ? handleClick : undefined}
        className="
          cursor-pointer
          rounded-3xl
          border-2
          border-dashed
          border-gray-300
          p-10
          text-center
          transition

          hover:border-orange-400
          hover:bg-orange-50
        "
      >

        {!image ? (

          /* =================================================
             EMPTY STATE
          ================================================= */

          <>
            <FaCloudUploadAlt
              className="
                mx-auto
                text-6xl
                text-orange-500
              "
            />

            <h3
              className="
                mt-5
                text-2xl
                font-semibold
                text-gray-800
              "
            >
              Upload Car Photo
            </h3>

            <p className="mt-3 text-gray-500">
              Click to browse your computer
            </p>

            <p className="mt-2 text-sm text-gray-400">
              JPG • PNG • WEBP
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Maximum file size: 5MB
            </p>
          </>

        ) : (

          /* =================================================
             IMAGE PREVIEW
          ================================================= */

          <div className="space-y-6">

            <img
              src={image}
              alt="Car Preview"
              draggable={false}
              className="
                h-80
                w-full
                rounded-2xl
                object-cover
                shadow-lg
              "
            />


            {/* Change Image */}

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
              className="
                rounded-xl
                bg-orange-500
                px-6
                py-3
                font-semibold
                text-white
                transition

                hover:bg-orange-600
              "
            >
              📷 Change Image
            </button>

          </div>

        )}


        {/* =====================================================
            HIDDEN FILE INPUT
        ===================================================== */}

        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          onChange={handleFileChange}
          className="hidden"
        />

      </div>

    </div>
  );
}

export default ImageUploader;