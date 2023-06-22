import CreateButton from '../CreateButton';
import Heading from '../Heading';

const DashHeader = () => {
  return (
    <div className="flex justify-between items-center -mr-16" style={{borderBottom: "1px solid #e5e7eb"}}>
      <div className="p-6">
        <Heading text="Home" />
      </div>
      <div className="flex items-center pr-12">
        <div className="mr-6">
          <CreateButton text="Create event" />
        </div>
        <div className="flex items-center rounded-md" style={{border: "1px solid #e5e7eb"}}>
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