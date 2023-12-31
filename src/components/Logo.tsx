import { NavLink } from 'react-router-dom';

const Logo = () => {
  return (
    <NavLink to="/dashboard">
      <div className='flex items-center ml-2'>
          <img
            src='/assets/images/SmartCoachLogo.png'
            alt='Smart Coach Logo'
            width={28}
            height={28}
          />
          <span className='pl-2 font-semibold text-xl'>Smart Coach</span>
      </div>
    </NavLink>
  );
};

export default Logo;
