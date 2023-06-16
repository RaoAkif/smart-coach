import DashHeader from './DashHeader';
import DashSidebar from './DashSidebar';
import { Outlet } from 'react-router-dom';

const DashLayout = () => {
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
