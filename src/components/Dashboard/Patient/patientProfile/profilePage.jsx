
import MedicalHistoryByUserId from "./Medical_history";
import PatientProfile from "./PatientProfile";

export default function profilePage() {
    return (
        <div>
            <PatientProfile />
            <MedicalHistoryByUserId />
        </div>
    );
}
