function ManageGallery({ car }) {

    return (

        <div className="bg-white rounded-3xl shadow-xl p-8">

            <h2 className="text-3xl font-bold mb-6">

                Photos

            </h2>

            <img
                src={car.image}
                alt=""
                className="rounded-2xl w-full h-[500px] object-cover"
            />

        </div>

    );

}

export default ManageGallery;