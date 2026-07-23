import { useRef } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { uploadImage } from "../../services/cloudinary";

function ImageUploader({ image, setImage }) {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      const imageUrl = await uploadImage(file);

      setImage(imageUrl);

      console.log("Uploaded:", imageUrl);
    } catch (error) {
      console.error(error);
      alert("Image upload failed.");
    }
  };

  return (
    <div>
      <label className="block text-lg font-semibold mb-3">
        Car Image
      </label>

      <div
        onClick={!image ? handleClick : undefined}
        className="
          border-2
          border-dashed
          border-gray-300
          rounded-3xl
          p-10
          text-center
          hover:border-blue-500
          hover:bg-blue-50
          transition
          cursor-pointer
        "
      >
        {!image ? (
          <>
            <FaCloudUploadAlt className="mx-auto text-6xl text-blue-500" />

            <h3 className="text-2xl font-semibold mt-5">
              Upload Car Photo
            </h3>

            <p className="text-gray-500 mt-3">
              Click to browse your computer
            </p>

            <p className="text-sm text-gray-400 mt-2">
              JPG • PNG • WEBP
            </p>
          </>
        ) : (
          <div className="space-y-6">
            <img
              src={image}
              alt="Car Preview"
              className="
                w-full
                h-80
                object-cover
                rounded-2xl
                shadow-lg
              "
            />

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-6
                py-3
                rounded-xl
                font-semibold
                transition
              "
            >
              📷 Change Image
            </button>
          </div>
        )}

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
}

export default ImageUploader;