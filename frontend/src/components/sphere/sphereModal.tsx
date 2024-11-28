import { useEffect, useState } from "react";
import { generateRoomID } from "../../utils/helperFunction";
import { Props } from "../../types";
import { useDispatch } from "react-redux";
import { setGameStart } from "../../redux/features/commonSlice";
import {
  setSphereGameStart,
  setSphereRoomId,
} from "../../redux/features/SphereSlice";
import { redirect } from "react-router-dom";

const SphereModal = (props: Props) => {
  const [roomid, setRoomId] = useState<string | null>(null);
  const dispatch = useDispatch();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      redirect(`/sphere/?${roomid}`);
      dispatch(setSphereGameStart(true));
      props.setModal(false);
    }
  };

  const copyToClipboard = () => {
    if (roomid) {
      navigator.clipboard
        .writeText(roomid)
        .then(() => {
          dispatch(setSphereGameStart(true));
          props.setModal(false);
        })
        .catch((err) => {
          console.error("Failed to copy:", err);
          alert("Failed to copy Room ID.");
        });
    } else {
      alert("No Room ID to copy.");
    }
  };

  useEffect(() => {
    if (props.heading === "create room") {
      const roomid = generateRoomID();
      dispatch(setSphereRoomId(roomid));
      setRoomId(roomid);
    }
  }, []);

  return (
    <div
      onClick={() => props.setModal(false)}
      className="fixed inset-0 flex items-center h-full justify-center backdrop-blur-md z-50"
    >
      <div
        className="text-center text-textPrimary  border p-5 rounded-lg capitalize"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl md:text-4xl font-bold">{props.heading}</h2>
        {props.heading === "join room" ? (
          <>
            <h1 className="text-xl md:text-5xl text-textPrimary font-extrabold my-3">
              Enter Room Id
            </h1>
            <input
              type="text"
              name="roomid"
              id="roomid"
              className="mt-4 p-2 rounded border text-textPrimary bg-bgColor w-full"
              onChange={(e) => setRoomId(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </>
        ) : (
          <>
            <h1 className="text-4xl md:text-7xl text-textPrimary font-extrabold my-5">
              {roomid}
            </h1>
            <button
              className="py-2 px-4 bg-bgButton mt-4 rounded text-bgColor w-full text-3xl font-semibold hover:bg-transparent hover:text-textPrimary"
              onClick={copyToClipboard}
            >
              Start
            </button>{" "}
          </>
        )}
      </div>
    </div>
  );
};

export default SphereModal;
