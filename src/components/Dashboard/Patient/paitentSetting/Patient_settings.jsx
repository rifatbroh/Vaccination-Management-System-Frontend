import { useParams } from "react-router-dom";
import UpdateMedicalHistory from "./updateMedicalhistory";

export default function Patient_settings() {
    const { id } = useParams(); // ✅ get id from the URL
    console.log("Patient_settings received id:", id);

    return (
        <div>
            <UpdateMedicalHistory id={id} />
        </div>
    );
}
