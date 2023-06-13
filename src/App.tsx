import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/authComponents/Public'
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import DashLayout from './components/dashComponents/DashLayout'
import Home from './features/auth/Home'
import Event from './features/event/Event'
import Player from './features/player/Player'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route path="dashboard" element={<DashLayout />}>

          <Route index element={<Home />} />

          <Route path="event">
            <Route index element={<Event />} />
          </Route>

          <Route path="player">
            <Route index element={<Player />} />
          </Route>

        </Route>{/* End Dash */}

      </Route>
    </Routes>
  );
}

export default App;
