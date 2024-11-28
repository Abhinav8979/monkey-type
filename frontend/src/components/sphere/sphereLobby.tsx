import { FaShareAlt } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ProgressBar from "../../utils/ProgressBar";
import OneVsOneTyping from "../OneVsOneTyping";
import Options from "../Options";
import { setGameStart } from "../../redux/features/commonSlice";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import toast from "react-hot-toast";
import {
  setPlayerData,
  setPlayerMessage,
} from "../../redux/features/SphereSlice";
import { redirect } from "react-router-dom";
import { message } from "../../types";

const sphereLobby = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [word, setWord] = useState<string[]>([]);
  const [inviteRoomid, setInviteRoomid] = useState<string | null>(null);

  const roomid = useAppSelector((state) => state.sphere.roomId);
  const gameStart = useAppSelector((state) => state.common.startGame);
  const dispatch = useAppDispatch();
  const messages: message[] = useAppSelector(
    (state) => state.sphere.playerMessages
  );

  const handleSphereGameStart = () => {
    dispatch(setGameStart(true));
  };

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        socket.emit("player:joined:sphere-room", {
          roomid,
          name: localStorage.getItem("playerName") || "rohan",
          inviteRoomid: inviteRoomid,
        });
      });

      socket.on("player:joined:sphere-room", ({ data, word }) => {
        toast(localStorage.getItem("playerName") + " joined the room");
        dispatch(setPlayerData(data));
        setWord(word.split(""));
      });

      socket.on("wrong:sphere-room-id", (inviteRoomid) => {
        toast.error("Invalid room ID!");
        setInviteRoomid(null);
        redirect("/sphere");
      });

      socket.on("message:sphere-room:broadcast", (newMessage) => {
        dispatch((dispatch, getState) => {
          const currentMessages = getState().sphere.playerMessages;
          dispatch(setPlayerMessage([...currentMessages, newMessage]));
        });
      });

      return () => {
        socket.emit("player:disconnected:sphere-room", {
          roomid,
          name: localStorage.getItem("playerName") || "rohan",
        });
        socket.disconnect();
        socket.off("connect");
      };
    }
  }, [socket, inviteRoomid]);

  useEffect(() => {
    setLoading(true);
    const newSocket = io(process.env.SOCKET_API_BASE_URL);

    const searchParams = new URLSearchParams(window.location.search);

    const firstKey = Array.from(searchParams.keys())[0] as string;

    const value = searchParams.get(firstKey);

    setInviteRoomid(value || null);

    setSocket(newSocket);
  }, []);

  return (
    <section className="flex flex-col gap-10 mt-16">
      <div className="flex justify-between gap-16">
        <div className="flex-1">
          <ProgressBar />
          {word && <OneVsOneTyping words={word} />}
          {!gameStart && <Options />}
        </div>
        <div className="text-textPrimary w-[320px] border-t rounded-t-lg">
          <h1 className="font-bold text-2xl py-3 px-6 border-x roundedx-t-lg">
            Sphere chat
          </h1>
          <div className="border-t border-x flex flex-col gap-5 border-textPrimary min-h-[350px] overflow-y-auto">
            {messages &&
              messages.map((msg, index) => (
                <p
                  key={index}
                  className={
                    index % 2 === 0
                      ? "bg-black bg-opacity-60  md:p-1 p-[3px]"
                      : "bg-white p-[3px] md:p-1"
                  }
                >
                  {msg.senderName && (
                    <span className="font-medium text-black">
                      {msg.senderName} :
                    </span>
                  )}
                  <span>{msg.text}</span>
                </p>
              ))}
          </div>
          <input
            type="text"
            name="chat"
            placeholder="Type a message"
            className="w-full py-3 px-4 bg-bgColor text-textCorrectColor border rounded-b-lg focus:outline-none"
          />
          <div className="flex gap-3 font-semibold text-2xl mt-6">
            <button
              type="button"
              onClick={handleSphereGameStart}
              disabled={!gameStart}
              style={{
                cursor: gameStart ? "not-allowed" : "pointer",
              }}
              className="bg-textPrimary rounded-md text-bgColor flex-1 py-2 px-4 hover:border hover:bg-bgColor hover:text-textPrimary hover:border-textPrimary border border-transparent transition-all duration-200"
            >
              Start
            </button>
            <button
              type="button"
              className="rounded-lg flex-1 py-2 px-4 hover:border hover:border-textPrimary border border-transparent transition-all duration-200"
            >
              Leave
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center w-full">
        {!gameStart && (
          <div className="text-textSecondary text-xl flex gap-6">
            <p>
              Sphere Code: <span className="text-textPrimary">{roomid}</span>
            </p>
            <p className="flex items-center cursor-pointer hover:text-textPrimary transition-colors duration-200">
              <span className="mx-1 text-sm">
                <FaShareAlt />
              </span>{" "}
              Share
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default sphereLobby;
