function CarDescription({ description }) {
  return (
    <div className="bg-white rounded-3xl shadow-xl mt-10 p-5 md:p-8">

      <h2 className="text-3xl font-bold mb-6">
        Description
      </h2>

      <p className="text-gray-600 leading-8 text-lg">
        {description || "No description available."}
      </p>

    </div>
  );
}

export default CarDescription;