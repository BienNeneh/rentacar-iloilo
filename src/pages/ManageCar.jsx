import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import OverviewCards from "../components/manageCar/OverviewCards";
import ManageHeader from "../components/manageCar/ManageHeader";
import ManageGallery from "../components/manageCar/ManageGallery";
import ManageInfo from "../components/manageCar/ManageInfo";
import OwnerActions from "../components/manageCar/OwnerActions";

function ManageCar() {
    const { id } = useParams();

    const [car, setCar] = useState(null);

    useEffect(() => {
        async function fetchCar() {
            const ref = doc(db, "cars", id);
            const snap = await getDoc(ref);

            if (snap.exists()) {
                setCar({
                    id: snap.id,
                    ...snap.data(),
                });
            }
        }

        fetchCar();
    }, [id]);

    if (!car) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <h1 className="text-3xl font-bold">
                    Loading...
                </h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10">

            <div className="max-w-7xl mx-auto px-6 space-y-8">

                <ManageHeader car={car} />

                <ManageGallery car={car} />

                <ManageInfo car={car} />

                <OwnerActions car={car} />

            </div>

        </div>
    );
}

export default ManageCar;