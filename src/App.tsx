import { Routes, Route, useNavigate } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/authComponents/Public'
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import DashLayout from './components/dashComponents/DashLayout'
import Home from './features/auth/Home'
import Players from './features/players/Players'
import Teams from './features/teams/Teams'
import Events from './features/events/Events'
import EventDetails from './features/events/EventDetails'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();
  const pathname = location.pathname;

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && pathname==='/') {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Public />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route path="dashboard" element={<DashLayout />}>

            <Route index element={<Home />} />

            <Route path="players">
              <Route index element={<Players />} />
            </Route>

            <Route path="teams">
              <Route index element={<Teams />} />
            </Route>

            <Route path="events">
              <Route index element={<Events />} />
              <Route path=":eventId" element={<EventDetails />} />
            </Route>

          </Route>{/* End Dash */}
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
