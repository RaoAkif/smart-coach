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
    <div className="max-w-[1450px] mx-auto">
      <div className="flex">
        <aside className="w-2/12 pt-5">
          <DashSidebar />
        </aside>
        <main className="border-l-2 border-[#eaecf0] w-full">
          <DashHeader />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashLayout;
