import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const pathName = window.location.pathname;
  return (
    <nav className="sidebar">
      <div className="flex items-center ml-2">
        <img
          src="/assets/images/SmartCoachLogo.jpg"
          alt="Smart Coach Logo"
          width={28}
          height={28}
        />
        <span className="pl-2 font-semibold text-xl">Smart Coach</span>
      </div>

      {/* Menu Items Start */}
      <div className="flex flex-col justify-between min-h-screen">
        <ul className="mt-8">
          <NavLink to="/">
            <li
              className={
                pathName === '/'
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
          <NavLink to="/players">
            <li
              className={
                pathName === '/players'
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
                  My Team
                </span>
              </div>
            </li>
          </NavLink>

          {/* Events menu item */}
          <NavLink to="/events">
            <li
              className={
                pathName === '/events'
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
                <span className="events-tag">0</span>
              </div>
            </li>
          </NavLink>
        </ul>

        {/* Help menu item */}
        <div className="p-2">
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
        </div>
      </div>
      {/* Menu Items End */}
    </nav>
  );
};

export default Sidebar;
