import React from "react";
import { useState, useEffect, useForm } from "react";
import Axios from "axios";
import { data } from "autoprefixer";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const generatePaymentId = (userId) => {
    Axios.put(
      `http://127.0.0.1:3002/users/${userId}/generate`
      // {
      //   headers: {
      //     Authorization: "Bearer" + " " + localStorage.getItem("token"),
      //   },
      // }
    )
      .then((response) => {
        console.log(response);
        navigate("/dashboard");
        setUserData(response.data);
        console.log(userData);
        setErrorMessage("");
      })
      .catch(function (error) {
        // handle error
        console.log("hello");
        console.log(error.response.data.message);
        setErrorMessage(error.response.data.message);
      });
  };
  const deletePaymentId = (paymentId, userId) => {
    Axios.put(
      `http://127.0.0.1:3002/users/${userId}/${paymentId}/delete`
      // {
      //   headers: {
      //     Authorization: "Bearer" + " " + localStorage.getItem("token"),
      //   },
      // }
    )
      .then((response) => {
        console.log(response);
        navigate("/dashboard");
        setUserData(response.data);
        console.log(userData);
        setErrorMessage("");
      })
      .catch(function (error) {
        // handle error
        console.log("hello");
        console.log(error.response.data.message);
        setErrorMessage(error.response.data.message);
      });
  };
  useEffect(() => {
    Axios.get("http://127.0.0.1:3002/profile", {
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
    <div className="h-screen">
      {userData && (
        <div className="flex flex-col text-white items-center justify-center ">
          <h1 className="text-center text-white mb-20">Dashboard</h1>
          <div className="grid grid-cols-2">
            <div className="grid grid-cols-1 gap-3">
              <h1>Name</h1>
              <h1>Email</h1>
              <h1>Phone</h1>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <h1>{userData.name}</h1>
              <h1>{userData.email}</h1>
              <h1>{userData.phone}</h1>
            </div>
          </div>
          <div>
            <h1>Payment Ids:</h1>
            <button
              onClick={() => generatePaymentId(userData._id)}
              className="bg-green-700 rounded-md p-1.5 mb-4"
            >
              Generate Payment Id
            </button>
            <div className="flex flex-col items-center justify-center">
              {userData.paymentId.map((paymentId, index) => {
                return (
                  <div
                    className="flex justify-between items-center"
                    key={index}
                  >
                    <h1 className="mr-3">{paymentId}</h1>
                    <button
                      onClick={() => deletePaymentId(paymentId, userData._id)}
                      className="bg-red-700 rounded-sm p-1"
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
            </div>
            {errorMessage && <h1 className=" text-red-500">{errorMessage}</h1>}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
