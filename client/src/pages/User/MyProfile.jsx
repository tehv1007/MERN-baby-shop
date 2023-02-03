import { Link } from "react-router-dom";
import EditIcon from "../../components/common/icons/EditIcon";

const MyProfile = ({ user }) => {
  return (
    <div className="max-w-screen-xl mx-auto mt-4 p-4">
      <h1 className="mb-8 text-center text-3xl text-gray-700">
        Hello: {user.name}
      </h1>
      <div className="lg:flex p-4 bg-gray-50 rounded-lg">
        <div className="lg:w-[40%] flex flex-row-reverse justify-between lg:block">
          <div className="lg:hidden flex items-center">
            <button className="px-2 flex gap-1">
              <EditIcon />
              <span>Edit Profile</span>
            </button>
          </div>
          <div className="lg:flex-col">
            <button className="pr-2">
              <img
                src={user.image}
                alt="user face"
                className="rounded-lg"
                height={80}
                width={80}
              />
            </button>
            <div className="mt-2" />
            <span className="name mt-3">{user.name}</span>
            <br />
            <span className="number">
              📧 : <span className="font-bold text-base">{user.email}</span>
            </span>
          </div>

          <div className="hidden lg:block mt-2 py-2 text-lg">
            <div className="">
              <button className="mt-1 mb-3">
                <Link
                  to="/profile"
                  className="pr-10 lg:pr-36 py-2 rounded-md hover:pl-2 hover:-pr-2 hover:bg-green-700/70 hover:text-white transition-all">
                  🛒: My Orders
                </Link>
              </button>
              <br />
              <button className="mt-1">
                <Link
                  to="/profile/edit"
                  className="pr-10 lg:pr-36 py-2 rounded-md pl-2 bg-gray-400/95 text-white hover:bg-green-700/70 hover:text-white transition-all">
                  🆔: My Profile
                </Link>
              </button>
            </div>
          </div>
        </div>
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
                <img
                  src="https://thenounproject.com/api/private/icons/1743560/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0&token=gAAAAABj3B4x7ywVEPD1dTqAhXhb3ueGKw1GdEWrSj5B0gYprDfl2-Ws6c1KUU4k8DLWHdx1G0Uz2b6rhSOwVW9zwBIQ9iAwrg%3D%3D"
                  alt=""
                  className="w-40 h-40"
                />
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
