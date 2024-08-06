import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useUser } from "../context/userContext";
import ProfileModal from "../components/profile";
import UserProfilePicture from "./userProfilePicture";
const Layout = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const user = useUser();
  console.log({ user });

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <header className="h-20 w-full bg-gray-950 flex items-center gap-3 fixed">
        <ul className="w-full flex  justify-end gap-x-4 px-4 ">
          <li className="p-2 w-[60px] min-w-[60px] bg-coloumnBackgroundColor rounded-lg text-center">
            Join
          </li>
          <li className="p-2 bg-coloumnBackgroundColor w-[100px] min-w-[100px] rounded-lg text-center">
            Broadcast
          </li>
          <li
            onClick={toggleModal}
            className="p-2 bg-coloumnBackgroundColor rounded-lg w-[60px] min-w-[60px] text-center cursor-pointer"
          >
            Profile
          </li>
          <li>
            <UserProfilePicture />
          </li>
          {showModal && (
            <ProfileModal onClose={toggleModal} isOpen={showModal} />
          )}
        </ul>
      </header>
      <main className="">
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
};

export default Layout;
