import './App.css'
import ShowProfiles from './components/allProfiles'
import NewProfile from './components/newProfile'

function App() {
  return (
    <>
      <nav>
        <h1>Profile Manager</h1>
        <h3>New Profile</h3>
        <h3>All Profiles</h3>
      </nav>
      <div>
        <NewProfile></NewProfile>
        <ShowProfiles></ShowProfiles>
      </div>
    </>
  )
}

export default App
