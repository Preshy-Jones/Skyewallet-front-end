import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";

function NavBar() {
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    Axios.get("https://skyewalletapi.herokuapp.com/getauthenticateduserdata", {
      headers: {
        Authorization: "Bearer" + " " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        console.log(response);
        setUserAuthenticated(true);
        setUserData(response.data);
        console.log(userData);
      })
      .catch(function (error) {
        // handle error
        //        console.log("hello");
        console.log(error);
        setUserAuthenticated(false);
        //        setErrorMessage(error.response.data.message);
      });
  }, []);
  return (
    <div className="flex pt-6 pb-4 md:px-28 bg-background">
      <a className="mr-auto" href="/">
        <img src="https://skyewallet.com/img/skye-logo-white.svg" alt="" />
      </a>
      <ul className="flex text-white">
        {!userAuthenticated && (
          <li className="mr-8">
            <a href="/login"> Login</a>
          </li>
        )}
        {!userAuthenticated && (
          <li className="mr-8">
            <a href="/register">SignUp</a>
          </li>
        )}
        {userAuthenticated && (
          <li className="mr-8">
            <a href="/dashboard">Dashboard</a>
          </li>
        )}
        {userAuthenticated && (
          <li>
            <a href="/transaction">Make Transaction</a>
          </li>
        )}
      </ul>
    </div>
  );
}

export default NavBar;
