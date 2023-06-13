import Menubar from './Menubar';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const DashLayout = () => {
  return (
    <div className="max-w-[1450px] mx-auto">
      <div className="flex">
        <aside className="w-2/12 pt-5">
          <Sidebar />
        </aside>
        <main className="border-l-2 border-[#eaecf0] w-full">
          <Menubar />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashLayout;
