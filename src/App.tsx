import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/authComponents/Public'
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import DashLayout from './components/dashComponents/DashLayout'
import Home from './features/auth/Home'
import Players from './features/players/Players'
import Teams from './features/teams/Teams'
import Events from './features/events/Events'
import { store } from './redux/store'
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
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

            <Route path="teams">
              <Route index element={<Teams />} />
            </Route>

          </Route>{/* End Dash */}
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
