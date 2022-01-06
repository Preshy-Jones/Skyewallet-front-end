import React from "react";
import { useState } from "react";
import Axios from "axios";
import Modal from "react-modal";

function Home() {
  const [paymentId, setPaymentId] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  Axios.defaults.withCredentials = true;

  let handleSubmit = (e) => {
    e.preventDefault();
    //console.log(paymentId);
    Axios({
      method: "GET",
      url: `https://skyewalletapi.herokuapp.com/users/findByPaymentId/${paymentId}`,
      // data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then(function (response) {
        // handle success
        setUserData(response.data);
        console.log(response);
        setIsOpen(true);
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
  }
  return (
    <div className="h-screen flex justify-center items-center bg-background">
      <form onSubmit={handleSubmit}>
        <input
          className="w-thirteenth h-12 px-3 rounded-sm"
          type="text"
          required
          value={paymentId}
          placeholder="Search Account holder by Payment ID"
          onChange={(e) => setPaymentId(e.target.value)}
        />
        <button
          className=" rounded-md font-semibold text-white text-sm h-12 bg-searchbtn px-12"
          type="submit"
        >
          Search
        </button>
      </form>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{ color: "blue" }}
      >
        <div className="flex flex-col justify-center items-center">
          <div className="grid grid-cols-2 mb-4">
            <div className="grid grid-cols-1 gap-3">
              <h1>Name</h1>
              <h1>Email</h1>
              <h1>Phone</h1>
            </div>
            {userData && (
              <div className="grid grid-cols-1 gap-3">
                <h1>{userData.name}</h1>
                <h1>{userData.email}</h1>
                <h1>{userData.phone}</h1>
              </div>
            )}
          </div>

          <button
            onClick={closeModal}
            className="select-none font-bold whitespace-no-wrap py-2 px-20 rounded-lg text-base leading-normal no-underline text-white bg-primary hover:bg-blue-700 sm:py-2"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Home;
