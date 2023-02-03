import Avatar from "../../assets/avatar.png";

const TitlePage = ({ title }) => {
  return (
    <div className="flex items-center justify-between mb-10">
      <h1 className="text-3xl">{title}</h1>
      <div className="flex items-center gap-2">
        <p className="text-lg">Jones Ferdinand</p>
        <p className="border-2 border-gray-200 rounded-full p-1 bg-gray-200">
          <img className="w-10" src={Avatar} alt="" />
        </p>
      </div>
    </div>
  );
};

export default TitlePage;
