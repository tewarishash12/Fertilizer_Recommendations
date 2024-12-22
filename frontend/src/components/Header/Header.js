import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import logo from "../img/logo1.jpeg";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="h-10 inPhone my-2" id="head">
      <div className="flex content-center">
        <div className="flex items-center cursor-pointer ml-auto lg:ml-16">
          <img
            onClick={() => navigate("/")}
            src={logo}
            className="logoWeb"
            alt=""
          />
          <h3 className="text-md font-bold opacity-[.70]">
            AgroSense Solutions
          </h3>
        </div>
        <div className="flex-2 w-6/12 mx-auto" id="t">
          <ul className="flex mt-4 items-around">
            <li
              onClick={() => navigate("/")}
              className="text-sm cursor-pointer font-semibold text-[#219653] hover:opacity-90 lg:ml-7 ml-6 mr-1.5"
            >
              Home
            </li>
            <li
              onClick={() => navigate("/fertilizer")}
              className="text-sm cursor-pointer font-semibold text-[#219653] hover:opacity-90 ml-6 mr-1.5"
            >
              Fertilizer Recommendation
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
