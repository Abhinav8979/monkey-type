import { FaDoorOpen, FaSignInAlt } from "react-icons/fa";

const Sphere = () => {
  return (
    <section className="flex items-center justify-center flex-col md:gap-16 gap-16">
      <div className="text-bgColor flex justify-between items-center w-full gap-5 md:gap-10 font-semibold">
        <div className="bg-textSecondary rounded-xl h-40 md:h-[270px] flex-1 flex items-center justify-center text-2xl md:text-6xl font-bold hover:bg-textPrimary duration-200 ease-out cursor-pointer">
          <span>
            <FaDoorOpen />
          </span>
          <h1>Create Room</h1>
        </div>
        <div className="bg-textSecondary rounded-xl h-40 md:h-[270px] flex-1 flex items-center justify-center  text-2xl md:text-6xl font-bold hover:bg-textPrimary duration-200 ease-out cursor-pointer">
          <span>
            <FaSignInAlt />
          </span>
          <h1>Join Room</h1>
        </div>
      </div>
      <div className="pr-20 flex-1">
        <p className="md:text-3xl text-xl text-textSecondary">
          Introducing "Sphere" Models: Unleash the fun of friendly competitive
          by creating a room to test your skills with friends! Simply generate a
          unique code, share it with your pals, and let the typing challenge
          begin.
        </p>
      </div>
    </section>
  );
};

export default Sphere;
