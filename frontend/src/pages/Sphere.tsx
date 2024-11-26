import { FaDoorOpen, FaSignInAlt } from "react-icons/fa";
import { useAppSelector } from "../redux/hooks";
import { useState } from "react";
import SphereModal from "../components/sphere/sphereModal";
import SphereLobby from "../components/sphere/sphereLobby";

const Sphere = () => {
  const sphereGameStart = useAppSelector(
    (state) => state.sphere.sphereGameStart
  );
  const [modal, setModal] = useState(false);
  const [heading, setHeading] = useState("");

  const ModalOpen = (heading: string) => {
    setModal(true);
    setHeading(heading);
  };

  return (
    <main>
      {modal && <SphereModal heading={heading} setModal={setModal} />}
      {!sphereGameStart ? (
        <section className="flex items-center justify-center flex-col md:gap-16 gap-16">
          <div className="text-textPrimary flex justify-between items-center w-full gap-5 md:gap-10 text-2xl md:text-4xl font-bold ">
            <div
              onClick={() => ModalOpen("create room")}
              className="bg-textSecondary rounded-xl h-40 md:h-[270px] flex-1 flex items-center justify-center  hover:bg-textPrimary hover:text-textSecondary duration-200 ease-out cursor-pointer"
            >
              <span className="mx-2">
                <FaDoorOpen className="w-[30px]" />
              </span>
              <h1>Create Room</h1>
            </div>
            <div
              onClick={() => ModalOpen("join room")}
              className="bg-textSecondary rounded-xl h-40 md:h-[270px] flex-1 flex items-center justify-center hover:bg-textPrimary hover:text-textSecondary duration-200 ease-out cursor-pointer "
            >
              <span className="mx-2">
                <FaSignInAlt className="w-[30px]" />
              </span>
              <h1>Join Room</h1>
            </div>
          </div>
          <div className="pr-20 flex-1">
            <p className="md:text-3xl text-xl text-textSecondary">
              Introducing "Sphere" Models: Unleash the fun of friendly
              competitive by creating a room to test your skills with friends!
              Simply generate a unique code, share it with your pals, and let
              the typing challenge begin.
            </p>
          </div>
        </section>
      ) : (
        <SphereLobby />
      )}
    </main>
  );
};

export default Sphere;
