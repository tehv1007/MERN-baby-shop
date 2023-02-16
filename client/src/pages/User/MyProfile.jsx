import SideBar from "./SideBar";

const MyProfile = ({ user }) => {
  return (
    <div className="max-w-screen-xl mx-auto mt-4 p-4">
      <h1 className="mb-8 text-center text-3xl text-gray-700">
        Hello: {user.name}
      </h1>
      <div className="lg:flex p-4 bg-gray-50 rounded-lg">
        <SideBar user={user} />

        {/* My Profile */}
        <div className="w-full p-2 md:p-4 mt-2lg:mt-0 rounded-md bg-white ">
          <div className="px-4 mb-2">
            <h1 className="text-lg">My Profile</h1>
            <p className="text-sm">Manage and protect your account</p>
          </div>
          <hr className="mx-4" />
          <div className=" lg:flex lg:flex-row-reverse">
            {/* Right */}
            <div className="flex-col text-center pt-4">
              <span className="flex justify-center">
                <img src={user.image} alt="" className="w-40 h-40" />
              </span>
              <button className="border py-2 px-4 mb-2 rounded-md bg-gray-400/80 text-white hover:bg-gray-400">
                Select Image
              </button>
              <p>
                File size: maximum 1 MB <br /> File extension: .JPEG, .PNG
              </p>
            </div>
            {/* Left */}
            <div className="lg:w-4/5">
              <form className="flex-col py-10 w-full">
                <div className="flex gap-8 mb-3">
                  <p className="w-1/4 text-gray-500 text-right">Name</p>
                  <p>{user.name}</p>
                  <button className="text-blue-500 underline">Change</button>
                </div>
                <div className="flex gap-8 mb-3">
                  <p className="w-1/4 text-gray-500 text-right">Email</p>
                  <p>{user.email}</p>
                  <button className="text-blue-500 underline">Change</button>
                </div>
                <div className="flex gap-8 mb-3">
                  <p className="w-1/4 text-gray-500 text-right">Phone number</p>
                  <input
                    type="text"
                    placeholder="0123-456-789"
                    className="pl-2 w-1/2 border rounded"
                  />
                </div>
                <div className="flex gap-8 mb-3">
                  <p className="w-1/4 text-gray-500 text-right">Gender</p>
                  <span className="flex gap-2">
                    <input type="radio" className="border rounded" />
                    <label>Male</label>
                  </span>
                  <span className="flex gap-2">
                    <input type="radio" className="border rounded" />
                    <label>Female</label>
                  </span>
                  <span className="flex gap-2">
                    <input type="radio" className="border rounded" />
                    <label>Other</label>
                  </span>
                </div>
                <div className="flex gap-8">
                  <p className="w-1/4 text-gray-500 text-right">Birth Date</p>
                  <input type="date" className="w-1/2 border rounded" />
                </div>
              </form>
              <div className="text-center">
                <button className="py-2 px-4 bg-green-700/70 text-white rounded-md">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
