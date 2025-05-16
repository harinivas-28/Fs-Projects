import './App.css'
import Greetings from './components/Greetings'
import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import EmployeeForm from './components/EmployeeForm'
import EmployeeList from './components/EmployeeList'
import AdminPanel from './components/AdminPanel'
import HrPanel from './components/HrPanel'
import Gallery from './components/FirstComponent'
import TodoList from './components/writingMarkup'
import Render from './components/conditionalRendering'
import ShopList from './components/renderLists'
import MyButton from './components/respondEvents'
import Counter from './components/useStateCounter'
import Props from './components/usingProps'
import TicTacToe from './components/TicTacToe'
import Ecommerce from './components/Ecommerce'

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState([])
  const [employees, setEmployees] = useState([]);
  const registerEmployee =  (emp) => {
    const newEmp = {
      ...emp,
      id: Date.now(),
      status: 'Pending'
    };
    setEmployees([...employees, newEmp]);
    return newEmp;
  }
  const updateEmployeeStatus = (id, status) => {
    const updatedEmp = employees.map(emp =>
      emp.id===id ? {...emp, status} : emp
    );
    setEmployees(updatedEmp);
  };

  useEffect(() => {}, [count])
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      setData(await response.json())
    }
    fetchData()
  }, [])

  return (
    <>
      <Router>
        <div>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/register">Register Employee</Link></li>
              <li><Link to="/employees">All Employees</Link></li>
              <li><Link to="/admin">Admin Panel</Link></li>
              <li><Link to="/hr">HR Panel</Link></li>
            </ul>
          </nav>
          <div className="content">
            <Routes>
              <Route path="/" element={
                <div className="home">
                  <div>
                    <hr></hr>
                    <Gallery/>
                    <TodoList/>
                    <Render/>
                    <ShopList/>
                    <MyButton/>
                    <Counter/>
                    <Props/>
                    <TicTacToe/>
                    <Ecommerce/>
                  </div>
                  <hr></hr>
                  <h1>Rough Work</h1>
                  <div className='greet'>
                    <Greetings name="John" /><br />
                    <Greetings name="Jane" /><br />
                    <Greetings name="Doe" /><br />
                  </div>
                  <div className="counter">
                    <p>Count: {count}</p>
                    <button onClick={() => setCount(count + 1)}>Increase</button>
                    <button onClick={() => setCount(count - 1)}>Decrease</button>
                    <button onClick={() => setCount(0)}>Reset</button>
                  </div>
                  <br/>
                  <div className='scraped-data'>
                    <table border={1} cellPadding={5} cellSpacing={0}>
                      <caption>Users List</caption>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Company Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((user) => (
                          <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.company.name}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <h1>Welcome to Employee Management Dashboard</h1>
                  <p>Use the navigation menu to manage employees.</p>
                </div>
              } />
              <Route path="/register" element={<EmployeeForm registerEmployee={registerEmployee} />} />
              <Route path="/employees" element={<EmployeeList employees={employees} />} />
              <Route path="/admin" element={<AdminPanel 
                employees={employees.filter(e => e.status === 'Pending')} 
                updateEmployeeStatus={updateEmployeeStatus} 
              />} />
              <Route path="/hr" element={<HrPanel 
                employees={employees.filter(e => e.status === 'Accepted')} 
              />} />
            </Routes>
          </div>
        </div>
      </Router>
      <div className="footer">
        <p>&copy; 2023 Employee Management System</p>
      </div>
    </>
  )
}

export default App
