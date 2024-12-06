import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import "./vsMode.css";
import { generateRoomID } from "../utils/helperFunction";
import { OneVsOne } from "../utils/socketFunctions";
import OneVsOneTyping from "../components/OneVsOneTyping";

const VsMode = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [playerFound, setPlayerFound] = useState<boolean>(false);
  const [play, setPlay] = useState<boolean>(false);
  const [roomid, setRoomid] = useState<string>("");
  const [opponentName, setOpponentName] = useState<string>("?");
  const [words, setWords] = useState<string[]>([]);

  const handleConnect = () => {
    if (loading) {
      if (socket) {
        socket.emit("player:disconnected", roomid);
        socket.disconnect();
        setSocket(null);
      }
      setLoading(false);
      setPlayerFound(false);
      setOpponentName("?");
    } else {
      setLoading(true);
      const newSocket = io(import.meta.env.VITE_SOCKET_API_BASE_URL);
      setSocket(newSocket);
    }
  };

  useEffect(() => {
    const oneVsOneHandler = new OneVsOne(
      setPlayerFound,
      setLoading,
      setOpponentName
    );

    if (socket) {
      socket.on("connect", () => {
        const roomid = generateRoomID();
        setRoomid(roomid);
        socket.emit("player:finding:one-vs-one-room", {
          roomid,
          name: sessionStorage.getItem("userName") || "user1",
        });
      });
      socket.on(
        "player:joined:one-vs-one-room",
        oneVsOneHandler.playerJoinedOneVsOneRoom
      );
      socket.on("game:start:one-vs-one-room", (words: string[]) => {
        setWords(words);
      });
      return () => {
        socket.emit("player:disconnected", roomid);
        socket.disconnect();
        socket.off("connect");
        socket.off("player:joined:one-vs-one-room");
        socket.off("game:start:one-vs-one-room");
      };
    }
  }, [socket]);

  useEffect(() => {
    if (playerFound) {
      socket?.emit("game:start:one-vs-one-room", roomid);
      setTimeout(() => {
        setPlay(true);
        setLoading(false);
      }, 5000);
    }
  }, [playerFound]);

  return (
    <>
      {!play ? (
        <section className="flex items-center justify-center flex-col md:gap-16 gap-16">
          <div className="text-bgColor flex justify-between items-center w-full gap-5 md:gap-16 font-semibold">
            <div className="bg-textSecondary rounded-xl h-40 md:h-52 flex-1 flex items-center justify-center text-2xl md:text-5xl">
              <h1>{sessionStorage.getItem("userName")} (You)</h1>
            </div>

            <div className="flex justify-center items-center">
              <h1 className="text-textPrimary text-6xl md:text-9xl font-extrabold">
                VS
              </h1>
            </div>

            {
              <div
                id={loading ? `player2` : ""}
                className="bg-textSecondary rounded-xl h-40 md:h-52 flex-1 flex items-center justify-center  text-2xl md:text-5xl"
              >
                <h1>{opponentName}</h1>
              </div>
            }
          </div>
          {!playerFound && (
            <div>
              <button
                onClick={handleConnect}
                className={`bg-bgButton w-[220px] rounded-xl p-4 text-bgColor font-bold cursor-pointer ${
                  loading ? "opacity-75" : "opacity-100"
                }`}
              >
                {loading ? <>Cancel Search</> : <>Find Player</>}
              </button>
            </div>
          )}
          <div className="pr-20 flex-1">
            <p className="md:text-3xl text-xl text-textSecondary">
              Drive into the thrill of instant competition with out '1v1' mode!
              Challenge a random opponent to a head-to-head typing battle and
              put your skills to the test.
            </p>
          </div>
        </section>
      ) : (
        words && <OneVsOneTyping words={words} />
      )}
    </>
  );
};

export default VsMode;
