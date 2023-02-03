import TitlePage from "../../components/common/TitlePage";
import UserTable from "./UserTable";

const Users = () => {
  return (
    <>
      <div>
        <TitlePage title="Users" />
        <div className="flex justify-between items-center mt-5 my-2">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search"
              className="bg-white input input-bordered w-full max-w-xs"
            />
          </div>
        </div>
        <UserTable />
      </div>
    </>
  );
};

export default Users;
