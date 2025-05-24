import { NavLink } from "react-router-dom";
import CustomButton from "./UI/CustomButton";

function Header() {
  return (
    <header>
      <div className="logo"></div>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to='/about'>
                About
            </NavLink>
          </li>
          <li>
            <NavLink to='/posts'>
                Posts
            </NavLink>
          </li>
        </ul>
        <div className="btns">
          <NavLink to='signup'>
            <CustomButton
            btnText="Sign up"
            onHandleClick={() => console.log("hello sign")}
          />
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Header;
