import React from "react";

function Profile() {
  return (
    <div className="h-screen">
      <div class="flex justify-center">
        <form action="" class="text-white">
          <div class="flex flex-col mb-3">
            {" "}
            <label class="text-white  text-sm mb-1" for="">
              Name
            </label>
            <input
              type="text"
              class="px-1.5 rounded-md border  py-3 border-fourth"
              readOnly
            />
          </div>
          <div class="flex flex-col mb-3">
            {" "}
            <label class="text-white  text-sm mb-1" for="">
              Phone number
            </label>
            <input
              type="text"
              class="px-1.5 rounded-md border  py-3 border-fourth"
              readOnly
            />
          </div>
          <div class="flex flex-col mb-3">
            {" "}
            <label class="text-white  text-sm mb-1" for="">
              Email Address
            </label>
            <input
              type="email"
              class="px-1.5 rounded-md border  py-3 border-fourth"
              readOnly
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
