import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/authComponents/Public'
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import DashLayout from './components/dashComponents/DashLayout'
import Home from './features/auth/Home'
import Events from './features/events/Events'
import Players from './features/players/Players'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route path="dashboard" element={<DashLayout />}>

          <Route index element={<Home />} />

          <Route path="events">
            <Route index element={<Events />} />
          </Route>

          <Route path="players">
            <Route index element={<Players />} />
          </Route>

        </Route>{/* End Dash */}

      </Route>
    </Routes>
  );
}

export default App;
