import React, { useEffect, useState } from "react";
import { useUser } from "../context/userContext";

const UserProfilePicture = () => {
  const user = useUser();
  const [color, setColor] = useState<string>("");
  const getRandomColor = () => {
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#F333FF", "#33FFF5"];
    setColor(colors[Math.floor(Math.random() * colors.length)]);
    return;
  };
  console.log(user.user?.username.slice(0, 1).toUpperCase());

  useEffect(() => {
    getRandomColor();
  }, []);

  return (
    <>
      <div
        className={`w-[40px] h-[40px] rounded-full flex items-center justify-center text-white `}
        style={{ backgroundColor: color }}
      >
        {user.user?.username.slice(0, 1).toUpperCase()}
      </div>
    </>
  );
};

export default UserProfilePicture;
