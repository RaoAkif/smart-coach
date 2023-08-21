import CreateButton from '../CreateButton';
import Heading from '../Heading';
import EventModal from '../../features/events/EventModal';
import { useState } from "react";

interface DashHeaderProps {
  currentPage: string; // Adjust the type based on your actual usage
}

const DashHeader: React.FC<DashHeaderProps> = ({ currentPage }) => {
  const [openEventModal, setOpenEventModal] = useState(false);
  
  let headingText = "Home"; // Default text
  
  if (currentPage === "players") {
    headingText = "Players";
  } else if (currentPage === "teams") {
    headingText = "Teams";
  } else if (currentPage === "events") {
    headingText = "Events";
  }

  return (
    <div className="flex justify-between items-center -mr-16" style={{borderBottom: "1px solid #e5e7eb", paddingLeft: '20px'}}>
      <div className="p-6">
        <Heading text={headingText} />
      </div>
      <div className="flex items-center pr-12">
        <div className="mr-6 cursor-pointer">
          <CreateButton text="Create event" onClick={() => setOpenEventModal(true)}/>
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
          <img src="/assets/icons/DownIcon.png" width="12px" height="12px" alt="down icon" className="mr-2" />
        </div>
      </div>
      <EventModal openEventModal={openEventModal} setOpenEventModal={setOpenEventModal}/>
    </div>
  );
};

export default DashHeader;
