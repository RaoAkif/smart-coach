import CreateButton from '../CreateButton';
import Heading from '../Heading';

const DashHeader = () => {
  return (
    <div className="flex justify-between items-center border-b-2 -mr-16">
      <div className="p-6">
        <Heading text="Home" />
      </div>
      <div className="flex items-center pr-12">
        <div className="mr-6">
          <CreateButton text="Create event" />
        </div>
        <div className="flex items-center border-2 border-gray-300 rounded-md">
          <div className="pl-2">
            <img
              src="/assets/images/ProfilePicture.jpg"
              alt="Profile Picture"
              width={32}
              height={32}
            />
          </div>
          <div className="p-2">
            <h3>Adrian</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashHeader;