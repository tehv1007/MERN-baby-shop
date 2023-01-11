import "./Profile.css";
function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div class="container mt-4 mb-4 p-3 d-flex justify-content-center">
      <div class="card p-4">
        <div class=" image d-flex flex-column justify-content-center align-items-center">
          <button class="btn btn-secondary">
            <img src={user.image} alt="user face" height="100" width="100" />
          </button>
          <span class="name mt-3">{user.name}</span>{" "}
          <div class="d-flex flex-row justify-content-center align-items-center gap-2"></div>
          <div class="d-flex flex-row justify-content-center align-items-center mt-3">
            <span class="number">
              e-mail 📧 : <span class="follow">{user.email}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
