import { MdDeleteOutline } from "react-icons/md";
import { BsFillCircleFill } from "react-icons/bs";

const UsersCard = ({ imgUrl, name, userName, email }) => {
  return (
    <>
      <tr>
        <td>
          <div className="flex items-center space-x-3 gap-3">
            <div className="mask mask-squircle w-12 h-12">
              <img src={imgUrl} alt="Avatar Tailwind CSS Component" />
            </div>
            <div className="text-[16px]">{name}</div>
          </div>
        </td>
        <td className="text-[16px]">{userName}</td>
        <td className="text-[16px]">{email}</td>
        <td>
          <div className="flex items-center justify-center gap-5">
            <button>
              <BsFillCircleFill className="text-green-400" />
            </button>
            <button>
              <MdDeleteOutline />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

const UsersData = [
  {
    id: 1,
    imgUrl:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80",
    name: "Name",
    userName: "John Ajc",
    email: "nguyenvanA@gmail.com",
  },
  {
    id: 2,
    imgUrl:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80",
    name: "Name",
    userName: "John Ajc",
    email: "nguyenvanA@gmail.com",
  },
  {
    id: 3,
    imgUrl:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80",
    name: "Name",
    userName: "John Ajc",
    email: "nguyenvanA@gmail.com",
  },
  {
    id: 4,
    imgUrl:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80",
    name: "Name",
    userName: "John Ajc",
    email: "nguyenvanA@gmail.com",
  },
  {
    id: 5,
    imgUrl:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80",
    name: "Name",
    userName: "John Ajc",
    email: "nguyenvanA@gmail.com",
  },
];

const UserTable = () => {
  return (
    <>
      <div className="overflow-x-auto w-full my-10">
        <table className="table w-full text-center">
          <thead className="text-[#9FA2B4]">
            <tr>
              <th className="text-left font-normal text-lg">Name</th>
              <th className="font-normal text-lg">UserName</th>
              <th className="font-normal text-lg ">Email</th>
              <th className="font-normal text-lg">Action</th>
            </tr>
          </thead>
          <tbody>
            {UsersData.map((item) => (
              <UsersCard
                key={item.id}
                imgUrl={item.imgUrl}
                name={item.name}
                userName={item.userName}
                email={item.email}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserTable;
