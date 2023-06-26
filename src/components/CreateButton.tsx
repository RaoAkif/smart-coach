type CreateButtonProps = {
  text: string;
  onClick: () => void;
};

const CreateButton = ({ text, onClick }: CreateButtonProps) => {
  return (
    <div className="flex items-center py-2 px-4 border-2 border-purple-800 rounded-md" onClick={onClick}>
      <div className="">
        <img
          src="/assets/icons/AddIcon.png"
          alt="Add Icon"
          width={12}
          height={12}
        />
      </div>
      <span className="ml-2 font-bold text-sm text-purple-800 hover:underline">
        {text}
      </span>
    </div>
  );
};

export default CreateButton;
