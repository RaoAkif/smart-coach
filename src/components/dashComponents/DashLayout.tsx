import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import DashHeader from './DashHeader';
import DashSidebar from './DashSidebar';

const DashLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate('/login');
    }
  }, [navigate]);
  
  // Determine the current page based on the pathname
  const getCurrentPage = () => {
    const pathname = location.pathname;
    if (pathname.includes('/players')) {
      return "players";
    } else if (pathname.includes('/teams')) {
      return "teams";
    } else if (pathname.includes('/events')) {
      return "events";
    } else {
      return "home";
    }
  };

  return (
    <div>
      <div className="flex">
        <aside className="pt-9 pl-5" style={{width: '15%'}}>
          <DashSidebar />
        </aside>
        <main style={{borderLeft: "1px solid #e5e7eb", width: '80%'}}>
          <DashHeader currentPage={getCurrentPage()} />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashLayout;
