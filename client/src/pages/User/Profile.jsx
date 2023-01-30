import "./Profile.css";
function Profile({ user }) {
  return (
    <div className="max-w-screen-xl mx-auto mt-4 mb-4 p-6 flex justify-center">
      <div className="bg-gray-200 p-4">
        <div className="flex flex-col justify-center items-center">
          <button className="btn btn-secondary">
            <img src="{user.image}" alt="user face" height={100} width={100} />
          </button>
          <span className="name mt-3">
            {"{"}user.name{"}"}
          </span>
          {"{"}" "{"}"}
          <div className="d-flex flex-row justify-content-center align-items-center gap-2" />
          <div className="d-flex flex-row justify-content-center align-items-center mt-3">
            <span className="number">
              e-mail 📧 :{" "}
              <span className="follow">
                {"{"}user.email{"}"}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
