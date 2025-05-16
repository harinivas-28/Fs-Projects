import EmployeeCard from "./EmployeeCard";

const HrPanel = ({employees}) => {
    if (employees.length === 0) {
    return (
      <div>
        <h2 className="section-title">HR Panel</h2>
        <p>No accepted employees to display.</p>
      </div>
    );
  }
  return (
    <div>
      <h2 className="section-title">HR Panel - Accepted Employees</h2>
      <p>Accepted Employees: {employees.length}</p>
      
      <div className="employee-grid">
        {employees.map(employee => (
          <EmployeeCard 
            key={employee.id} 
            employee={employee} 
          />
        ))}
      </div>
    </div>
  );
};

export default HrPanel;