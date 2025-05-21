import './App.css'
import { useRef, useState } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
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
import Snapshot from './components/stateAsSnapshot'
import MovingDot from './components/MovingDot'
import DynamicUpdate from './components/useImmerDynamic'
import UpdateInState from './components/updateInState'
import ReactingToInput from './components/ReactingToInput'
import UseReducerTasks from './components/useReducerTasks'
import UseMemoHook from './components/useMemoHook'
import patients from './components/patients'
import UseComp from './components/userComp'
import LazyAndSuspense from './components/lazyAndSuspense'
import Arrows from './components/Arrows'
import NavBar from './NavBar'

function App() {
  const [employees, setEmployees] = useState([]);
  const[dark, setDark] = useState(true);
  const bottomRef = useRef(null);
  const topRef = useRef(null);
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
  const handleMode = ()=>{
    setDark(!dark);
  }

  return (
    <div ref={topRef} style={dark ? {backgroundColor: 'black', color:'white'}:{}}>
      <Router>
        <div>
          <NavBar/>
          <br></br>
          <div>
            <button onClick={handleMode}>{dark?"Light Theme":"Dark Theme"}</button>
          </div>
          <div className="content">
            <Routes>
              <Route path="/" element={
                <div className="home">
                  <hr></hr>
                  <div>
                    <Gallery/>
                    <TodoList/>
                    <Render/>
                    <ShopList/>
                    <MyButton/>
                    <Counter/>
                    <Props/>
                    <TicTacToe/>
                    <Ecommerce/>
                    <Snapshot/>
                    <MovingDot/>
                    <DynamicUpdate/>
                    <UpdateInState/>
                    <ReactingToInput/>
                    <UseReducerTasks/>
                    <UseMemoHook patients={patients}/>
                    <UseComp/>
                    <LazyAndSuspense/>
                    <Arrows bottomRef={bottomRef} topRef={topRef}/>
                  </div>
                  <hr></hr>
                  <div>
                    <h1>Welcome to Employee Management Dashboard</h1>
                    <p>Use the navigation menu to manage employees.</p>
                  </div>
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
      <div ref={bottomRef}>Bottom of the Page (uses useRef as Reference to the end to scroll to the end)</div>
    </div>
  )
}

export default App
