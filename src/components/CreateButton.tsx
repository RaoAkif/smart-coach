type CreateButtonProps = {
  text: string;
  onClick: () => void;
};

const CreateButton = ({ text, onClick }: CreateButtonProps) => {
  return (
    <div style={{borderWidth: '1px'}} className="flex items-center py-2 px-4 border-blue-700 rounded-lg" onClick={onClick}>
      <div className="">
        <img
          src="/assets/icons/AddIcon.png"
          alt="Add Icon"
          width={12}
          height={12}
        />
      </div>
      <span className="ml-2 font-bold text-sm text-blue-700 hover:underline">
        {text}
      </span>
    </div>
  );
};

export default CreateButton;
