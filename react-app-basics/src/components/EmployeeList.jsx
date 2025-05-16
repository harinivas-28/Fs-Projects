import EmployeeCard from './EmployeeCard';

const EmployeeList = ({employees}) => {
    if(employees.length===0) {
        return (
            <div>
                <h2 className='section-title'>Employee List</h2>
                <p>No Employees registered yet.</p>
            </div>
        );
    }
    return (
        <div>
            <h2 className='section-title'>Employee List</h2>
            <p>Total Employees: {employees.length}</p>
            <div className='employee-grid'>
                {employees.map(e => (
                    <EmployeeCard key={e.id} employee={e}/>
                ))}
            </div>
        </div>
    );
};

export default EmployeeList;