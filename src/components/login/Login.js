import React from "react";
import { useState } from "react";
import Axios from "axios";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  const login = (e) => {
    e.preventDefault();
    console.log(
      JSON.stringify({
        email: email,
        password: password,
      })
    );
    Axios({
      method: "POST",
      url: "https://skyewalletapi.herokuapp.com/auth/login",
      data: {
        email: email,
        password: password,
      },
    })
      .then(function (response) {
        if (!response.data.auth) {
          setLoginStatus(false);
        } else {
          console.log(response.data);
          localStorage.setItem("token", response.data.access_token);
          setLoginStatus(true);
          setIsOpen(true);
        }
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  const checkIfUserAuthenticated = (e) => {
    Axios.get("https://skyewalletapi.herokuapp.com/getauthenticateduserdata", {
      headers: {
        Authorization: "Bearer" + " " + localStorage.getItem("token"),
      },
    }).then((response) => {
      console.log(response);
    });
  };
  // let subtitle;

  // function openModal() {
  //   setIsOpen(true);
  // }

  function closeModal() {
    setIsOpen(false);
    navigate("/dashboard");
  }
  return (
    <div>
      <h1>Login</h1>
      <div className="flex justify-center">
        <form
          onSubmit={login}
          className=" w-4/12 flex flex-col px-6 space-y-6 sm:px-10 sm:space-y-8"
        >
          <div className="flex flex-wrap">
            <label className="block text-white text-sm  mb-2 sm:mb-4">
              E-Mail Address
            </label>
            <input
              id="email"
              type="email"
              className="form-input w-full rounded-md border border-fourth h-12  "
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-wrap">
            <label className="block text-white text-sm  mb-2 sm:mb-4">
              Password
            </label>
            <input
              type="password"
              className="form-input w-full rounded-md border border-fourth  h-12 "
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap justify-center">
            <button
              type="submit"
              className="select-none font-bold whitespace-no-wrap py-2 px-20 rounded-lg text-base leading-normal no-underline text-white bg-primary hover:bg-blue-700 sm:py-2"
            >
              Login
            </button>

            <p className="w-full text-xs text-center text-primary my-6 sm:text-sm sm:my-8">
              Haven't signed up yet?
              <a
                className="text-primary hover:text-blue-700 no-underline hover:underline"
                href="{{ route('admin.login') }}"
              >
                Register
              </a>
            </p>
          </div>
        </form>
      </div>
      {/* <button onClick={openModal}>Open Modal</button> */}
      <div className="flex justify-center">
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={{ color: "blue" }}
        >
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-center mb-16">Logged in Successfully</h1>
            <button
              onClick={closeModal}
              className="select-none font-bold whitespace-no-wrap py-2 px-20 rounded-lg text-base leading-normal no-underline text-white bg-primary hover:bg-blue-700 sm:py-2"
            >
              Go to dashboard
            </button>
          </div>
        </Modal>
      </div>
      {loginStatus && (
        <button
          onClick={checkIfUserAuthenticated}
          className="select-none font-bold whitespace-no-wrap py-2 px-20 rounded-lg text-base leading-normal no-underline text-white bg-primary hover:bg-blue-700 sm:py-2"
        >
          Check
        </button>
      )}
    </div>
  );
}

export default Login;
