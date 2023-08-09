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
    <div>
      <div className="flex">
        <aside className="pt-9 pl-5" style={{width: '15%'}}>
          <DashSidebar />
        </aside>
        <main style={{borderLeft: "1px solid #e5e7eb", width: '80%'}}>
          <DashHeader />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashLayout;
