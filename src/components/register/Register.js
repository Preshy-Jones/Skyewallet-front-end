import React from "react";
import { useState } from "react";
import Axios from "axios";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();
  Axios.defaults.withCredentials = true;

  const register = (e) => {
    e.preventDefault();
    setisLoading(true);
    console.log(
      JSON.stringify({
        email: email,
        password: password,
      })
    );
    Axios({
      method: "POST",
      url: "https://skyewalletapi.herokuapp.com/users/register",
      data: {
        name: name,
        email: email,
        phone: phone,
        password: password,
      },
    })
      .then(function (response) {
        console.log(response.data);
        setisLoading(false);
        setIsOpen(true);

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
  function closeModal() {
    setIsOpen(false);
    navigate("/login");
  }

  return (
    <div>
      <h1 className="text-center">Register</h1>
      {isLoading && (
        <h1 className="text-green-400 text-lg text-center">Loading....</h1>
      )}
      <div onSubmit={register} className="flex justify-center">
        <form className=" w-4/12 flex flex-col px-6 space-y-6 sm:px-10 sm:space-y-8">
          <div className="flex flex-wrap">
            <label className="block text-white text-sm  mb-2 sm:mb-4">
              Name
            </label>
            <input
              type="text"
              className="form-input h-12 w-full rounded-md border border-fourth "
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap">
            <label className="block text-white text-sm  mb-2 sm:mb-4">
              E-Mail Address
            </label>
            <input
              id="email"
              className="form-input h-12 w-full rounded-md"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap">
            <label className="block text-white text-sm  mb-2 sm:mb-4">
              Phone Number
            </label>
            <input
              type="phone"
              className="form-input h-12 w-full rounded-md"
              value={phone}
              required
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap">
            <label className="block text-white text-sm  mb-2 sm:mb-4">
              Password
            </label>
            <input
              type="password"
              className="form-input h-12 w-full rounded-md"
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
              Register
            </button>
            <p className="w-full text-xs text-center text-primary my-6 sm:text-sm sm:my-8">
              Already have an account?
              <a
                className="text-primary hover:text-blue-700 no-underline hover:underline"
                href="{{ route('admin.login') }}"
              >
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{ color: "blue" }}
      >
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-center mb-16">Registered Successfully</h1>
          <button
            onClick={closeModal}
            className="select-none font-bold whitespace-no-wrap py-2 px-20 rounded-lg text-base leading-normal no-underline text-white bg-primary hover:bg-blue-700 sm:py-2"
          >
            Go to Login
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Register;
