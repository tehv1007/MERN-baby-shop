import SideBar from "../../pages/User/SideBar";

const Layout = ({ children }) => {
  return (
    <div className="w-full mx-auto max-w-screen-xl  flex-grow px-3 sm:px-10 bg-gray-50">
      <div className="py-10 lg:py-12 flex flex-col lg:flex-row w-full">
        <SideBar />
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
