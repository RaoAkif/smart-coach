import CreateButton from './Button';
import Heading from './Heading';

const Menubar = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="p-4">
        <Heading text="Hello, John Doe!" />
      </div>
      <div className="flex items-center">
        <div className="mr-6">
          <CreateButton text="Create event" />
        </div>
        <div className="flex items-center border-2 border-gray-300 rounded-full">
          <div className="p-2">
            <img
              src="/assets/icons/HamburgerIcon.png"
              alt="Hamburger Icon"
              width={18}
              height={12}
            />
          </div>
          <div className="pl-2">
            <img
              src="/assets/images/ProfilePicture.jpg"
              alt="Profile Picture"
              width={32}
              height={32}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menubar;