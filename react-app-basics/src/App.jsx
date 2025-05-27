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
import LazyAndSuspense from './components/lazyAndSuspense'
import Arrows from './components/Arrows'
import NavBar from './NavBar'
import { useTheme } from './context/ThemeContext'
import ThemeToggle from './components/ThemeToggle'
import UseRefTime from './components/useRefTime'
import UseContext from './components/useContextComp'
import UseEffectVideoRender from './components/useEffectVideoRender'

function App() {
  const [employees, setEmployees] = useState([]);
  const {theme} = useTheme();
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

  return (
    <div ref={topRef} className={`app-container ${theme}`}>
      <Router>
        <div>
          <NavBar/>
          <br></br>
          <ThemeToggle/>
          <p>Road Map: <a href='https://react.dev/learn/'>Learn React</a></p>
          <div>
            <h1>Learn React With Me</h1>
            <hr></hr>
            <h3><u>You will learn</u></h3>
            <p>1. Creating your first component</p>
            <p>2. Writing Markup</p>
            <p>3. Conditional Rendering</p>
            <p>4. Rendering Lists</p>
            <p>5. Responding to Events</p>
            <p>6. Using Hooks</p>
            <sub>6.1 Use State</sub>{' '}
            <sub>6.2 Using Props</sub>
            <p>7. TicTacToe Game</p>
            <p>8. Ecommerce Example</p>
            <p>9. State as a SnapShot</p>
            <p>10. Moving Dot</p>
            <p>11. Use Immer Hook</p>
            <p>12. Updating Arrays in State</p>
            <p>13. Reacting to Input with State</p>
            <p>14. Use Reducer Hook</p>
            <p>15. Use Memo Hook</p>
            <p>16. Use Context</p>
            <p>17. Lazy Loading and Suspense</p>
            <p>18. Arrow Functionality</p>
            <p>19. Use Ref Hook</p>
            <p>20. Use Effect Hook</p>
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
                    <UseContext/>
                    <LazyAndSuspense/>
                    <Arrows bottomRef={bottomRef} topRef={topRef}/>
                    <UseRefTime/>
                    <UseEffectVideoRender/>
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
      <div ref={bottomRef}>Bottom of the Page (uses useRef as Reference to the end, to scroll to the end)</div>
    </div>
  )
}

export default App
