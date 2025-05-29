import './App.css'
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import ShowProfiles from './components/allProfiles'
import NewProfile from './components/newProfile'

function App() {
  return (
    <>
      <div>
        <Router>
          <nav>
            <h1><Link to="/">Profile Manager</Link></h1>
            <h3><Link to="/newprofile">New Profile</Link></h3>
            <h3><Link to="/allprofiles">All Profiles</Link></h3>
          </nav>
          <Routes>
            <Route path="/newprofile" element={<NewProfile/>}></Route>
            <Route path="/allprofiles" element={<ShowProfiles/>}></Route>
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
