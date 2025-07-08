import { useState } from "react";
import ApprovedDoctors from "./ApprovedDoctors";
import DoctorApprovalDashboard from "./PendingDoctors";

export default function DoctorManagement() {
    const [refresh, setRefresh] = useState(false);

    const handleRefresh = () => {
        setRefresh((prev) => !prev);
    };

    return (
        <div>
            <ApprovedDoctors refresh={refresh} onChange={handleRefresh} />
            <DoctorApprovalDashboard
                refresh={refresh}
                onChange={handleRefresh}
            />
        </div>
    );
}
