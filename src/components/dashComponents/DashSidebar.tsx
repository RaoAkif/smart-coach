import { NavLink } from 'react-router-dom';
import Logo from '../Logo';

const DashSidebar = () => {
  const pathName = window.location.pathname;
  return (
    <nav className="h-screen flex flex-col">
      <Logo />
      {/* Menu Items Start */}
      <div className="flex flex-col h-screen pb-10">
        <ul className="mt-8">
          <NavLink to="/dashboard">
            <li
              className={
                pathName === '/dashboard'
                  ? 'active my-2 py-2 px-3'
                  : 'my-2 py-2 px-3'
              }
            >
              <div className="flex items-center">
                <img
                  src="/assets/icons/HomeIcon.png"
                  alt="Home Icon"
                  width={18}
                  height={18}
                />
                <span className="ml-2 font-semibold text-sm hover:underline">
                  Home
                </span>
              </div>
            </li>
          </NavLink>

          {/* My Team menu item */}
          <NavLink to="/dashboard/players">
            <li
              className={
                pathName === '/dashboard/players'
                  ? 'active my-2 py-2 px-3'
                  : 'my-2 py-2 px-3'
              }
            >
              <div className="flex items-center">
                <img
                  src="/assets/icons/PlayersIcon.png"
                  alt="My Team Icon"
                  width={22}
                  height={22}
                />
                <span className="ml-2 font-semibold text-sm hover:underline">
                  Players
                </span>
              </div>
            </li>
          </NavLink>

          {/* My Team menu item */}
          <NavLink to="/dashboard/teams">
            <li
              className={
                pathName === '/dashboard/teams'
                  ? 'active my-2 py-2 px-3'
                  : 'my-2 py-2 px-3'
              }
            >
              <div className="flex items-center">
                <img
                  src="/assets/icons/MyTeamIcon.png"
                  alt="My Team Icon"
                  width={18}
                  height={18}
                />
                <span className="ml-2 font-semibold text-sm hover:underline">
                  My Teams
                </span>
              </div>
            </li>
          </NavLink>

          {/* Events menu item */}
          <NavLink to="/dashboard/events">
            <li
              className={
                pathName === '/dashboard/events'
                  ? 'active my-2 py-2 px-3'
                  : 'my-2 py-2 px-3'
              }
            >
              <div className="flex justify-between">
                <div className="flex items-center">
                  <img
                    src="/assets/icons/EventsIcon.png"
                    alt="Events Icon"
                    width={18}
                    height={18}
                  />
                  <span className="ml-2 font-semibold text-sm hover:underline">
                    Events
                  </span>
                </div>
              </div>
            </li>
          </NavLink>
        </ul>
        {/* Help menu item */}
        <ul className="mt-auto">
          <li className="my-2 py-2 px-3">
            <div className="flex items-center">
              <img
                src="/assets/icons/HelpIcon.png"
                alt="Help Icon"
                width={18}
                height={18}
              />
              <span className="ml-2 font-semibold text-sm hover:underline">
                Help
              </span>
            </div>
          </li>
        </ul>
      </div>
      {/* Menu Items End */}
    </nav>
  );
};

export default DashSidebar;
