import ApprovedDoctors from "./ApprovedDoctors";
import DoctorApprovalDashboard from "./PendingDoctors";

export default function DoctorManagement() {
    return (
        <div>
            <ApprovedDoctors />
            <DoctorApprovalDashboard />
        </div>
    );
}
