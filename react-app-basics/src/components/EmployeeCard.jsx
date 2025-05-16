const EmployeeCard = ({employee, showActions=false, onUpdateStatus}) => {
    const formattedDate = new Date(employee.dob).toLocaleDateString();
    return (
    <div className={`employee-card ${employee.status}`}>
        <div className={`status-badge ${employee.status}`}>
            {employee.status}
        </div>
        
        <h3>{employee.fullName}</h3>
        <p>ID: {employee.id}</p>
        
        <div className="employee-details">
            <h4>Contact Information</h4>
            <p>Email: {employee.email}</p>
            <p>Mobile: {employee.mobile}</p>
            
            <h4>Personal Details</h4>
            <p>Date of Birth: {formattedDate}</p>
            <p>AADHAR: {employee.aadhar}</p>
            <p>PAN: {employee.pan}</p>
            
            <h4>Address</h4>
            <p>
            {employee.address.houseNo}
            {employee.address.buildingName && `, ${employee.address.buildingName}`},<br />
            {employee.address.area},<br />
            {employee.address.city}, {employee.address.state} - {employee.address.pincode}
            </p>
        </div>
        
        {showActions && employee.status === 'Pending' && (
            <div className="employee-action">
            <button onClick={() => onUpdateStatus(employee.id, 'Accepted')}>
                Accept Employee
            </button>
            </div>
        )}
    </div>
    );
};
export default EmployeeCard;