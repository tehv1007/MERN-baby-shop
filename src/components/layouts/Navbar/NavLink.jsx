import { Link } from "react-router-dom";

const NavLink = ({ to, className, title }) => {
  return (
    <>
      <Link to={to} className={className}>
        {title}
      </Link>
    </>
  );
};

export default NavLink;
