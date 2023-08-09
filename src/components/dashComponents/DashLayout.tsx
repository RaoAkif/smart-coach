import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import DashHeader from './DashHeader';
import DashSidebar from './DashSidebar';

const DashLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate('/login');
    }
  }, [navigate]);
  
  return (
    <div className="mx-auto">
      <div className="flex">
        <aside className="w-2/12 pt-5">
          <DashSidebar />
        </aside>
        <main className="w-full" style={{borderLeft: "1px solid #e5e7eb"}}>
          <DashHeader />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashLayout;
