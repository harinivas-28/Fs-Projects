import EmployeeCard from "./EmployeeCard";

const AdminPanel = ({employees, updateEmployeeStatus})=>{
    if(employees.length===0){
        return (
            <div className="admin-panel">
                <h2 className="section-title">Admin Panel</h2>
                <p>No pending employees to approve.</p>
            </div>
        );
    }
    return (
        <div className="admin-panel">
            <h2 className="section-title">Admin Panel - Pending Approvals</h2>
            <p>Pending Approvals: {employees.length}</p>
            <div className="employee-grid">
                {employees.map(e => (
                    <EmployeeCard
                        key={e.id}
                        employee={e}
                        showActions={true}
                        onUpdateStatus={updateEmployeeStatus}
                    />
                ))}
            </div>
        </div>
    );
};

export default AdminPanel;