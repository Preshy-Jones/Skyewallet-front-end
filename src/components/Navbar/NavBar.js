import React from "react";

function NavBar() {
  return (
    <div className="flex pt-6 pb-4 md:px-28">
      <a className="mr-auto" href="/">
        <img src="https://skyewallet.com/img/skye-logo-white.svg" alt="" />
      </a>
      <ul className="flex text-white">
        <li className="mr-8">
          <a href="/login"> Login</a>
        </li>
        <li className="mr-8">
          <a href="/register">SignUp</a>
        </li>
        {localStorage.getItem("token") && (
          <li className="">
            <a href="/dashboard">Dashboard</a>
          </li>
        )}
      </ul>
    </div>
  );
}

export default NavBar;