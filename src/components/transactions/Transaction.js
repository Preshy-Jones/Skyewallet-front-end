import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  BaseModal,
  CenterModal,
  ModalTitle,
  ModalCloseTarget,
} from "react-spring-modal";
import "react-spring-modal/styles.css";

function Transaction() {
  const [amount, setAmount] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [userData, setUserData] = useState(null);
  const [recipientData, setRecipientData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [status, setStatus] = useState();
  const [isOpen, setOpen] = useState(false);
  const [recipientFound, setRecipientFound] = useState(false);

  const navigate = useNavigate();
  // const [amount, setAmount] = useState("");

  const restartParams = (e) => {
    e.preventDefault();
    setRecipientData("");
    setRecipientFound(false);
    setAmount("");
    setPaymentId("");
  };

  const handleTransaction = (e) => {
    e.preventDefault();
    console.log(userData);
    setisLoading(true);
    Axios.put(
      `https://skyewalletapi.herokuapp.com/users/${userData._id}/${paymentId}/${amount}/transfer`
    )
      .then((response) => {
        console.log(response);
        // navigate("/dashboard");
        // setUserData(response.data);
        console.log(userData);
        setisLoading(false);
        setStatus("Success");
        setOpen(true);
        setErrorMessage("");
      })
      .catch(function (error) {
        // handle error
        setisLoading(false);
        console.log("hello");
        setStatus("Failed");
        setOpen(true);
        console.log(error);
        console.log(error.response.data.message);
        setErrorMessage(error.response.data.error);
      });
  };

  const handleFindRecipientByPaymentId = (e) => {
    e.preventDefault();
    setisLoading(true);
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
        setRecipientData(response.data.name);
        setRecipientFound(true);
        console.log(response);
        setisLoading(false);
      })
      .catch(function (error) {
        // handle error
        setisLoading(false);
        setRecipientData(error.response.data.message);
        console.log(error);
      });
  };

  useEffect(() => {
    Axios.get("http://127.0.0.1:3002/getauthenticateduserdata", {
      headers: {
        Authorization: "Bearer" + " " + localStorage.getItem("token"),
      },
    }).then((response) => {
      console.log(response);
      setUserData(response.data);
      console.log(userData);
    });
  }, []);

  return (
    <div className="h-screen bg-background">
      <h1 className="text-white">Transaction</h1>
      {isLoading && (
        <h1 className="text-green-400 text-lg text-center">Loading....</h1>
      )}
      {/* <h1 className="text-lg text-center">{status}</h1> */}
      <div className="flex justify-center">
        <form className="w-1/2">
          <label className="block text-white text-sm  mb-2 sm:mb-4">
            Amount
          </label>
          <input
            type="text"
            className="form-input w-full rounded-md border border-fourth h-12  "
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <label className="block text-white text-sm  mb-2 sm:mb-4">
            Payment ID
          </label>
          <input
            type="text"
            className="form-input w-full rounded-md border border-fourth h-12  "
            value={paymentId}
            onChange={(e) => setPaymentId(e.target.value)}
            required
          />
          <h1
            className={
              recipientFound ? "text-green-500 text-xl" : "text-red-500 text-xl"
            }
          >
            {recipientData}
          </h1>
          {!recipientFound && (
            <button
              onClick={handleFindRecipientByPaymentId}
              className="select-none font-bold whitespace-no-wrap py-2 px-20 rounded-lg text-base leading-normal no-underline text-white bg-primary hover:bg-blue-700 sm:py-2"
            >
              Find recipient
            </button>
          )}

          {recipientFound && (
            <button
              onClick={handleTransaction}
              className="select-none font-bold whitespace-no-wrap py-2 px-20 rounded-lg text-base leading-normal no-underline text-white bg-primary hover:bg-blue-700 sm:py-2"
            >
              SEND
            </button>
          )}
        </form>
      </div>

      {/* <button onClick={() => setOpen(true)}>Open custom modal</button> */}
      <CenterModal
        isOpen={isOpen}
        onDismiss={() => setOpen(false)}
        contentTransition={{
          from: { background: "lightcoral", transform: "translateY(-100%)" },
          enter: { background: "lightcyan", transform: "translateY(0)" },
          leave: { background: "lightcoral", transform: "translateY(-100%)" },
        }}
        // contentProps={{ style: staticModalStyles }}
      >
        {/* <ModalTitle>My Custom Modal</ModalTitle> */}
        <div>
          <h1
            className={`text-center mb-7 ${
              status === "Success" ? "text-green-500" : "text-red-500"
            }`}
          >
            {status === "Success"
              ? `Successful transfer of ${amount} Naira to ${recipientData}`
              : `${errorMessage}`}
          </h1>
          <div className="flex justify-center">
            <ModalCloseTarget>
              <button
                onClick={restartParams}
                className="select-none font-bold whitespace-no-wrap py-2 px-20 rounded-lg text-base leading-normal no-underline text-white bg-secondary hover:bg-green-700 sm:py-2"
              >
                Close
              </button>
            </ModalCloseTarget>
          </div>
        </div>
      </CenterModal>
    </div>
  );
}

export default Transaction;
