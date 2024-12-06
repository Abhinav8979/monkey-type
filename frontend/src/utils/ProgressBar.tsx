import { setPracticeGameResult } from "../redux/features/practiceSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { FaUserCircle } from "react-icons/fa";

const ProgressBar = () => {
  const noOfWordsTyped = useAppSelector(
    (state) => state.practice.noOfWordsTyped
  );

  const totalWords = useAppSelector((state) => state.practice.totalWords);
  const sphereRoomId = useAppSelector((state) => state.sphere.roomId);

  const dispatch = useAppDispatch();

  const progressWidth =
    totalWords > 0 ? (noOfWordsTyped / totalWords) * 100 : 0;

  if (progressWidth === 100) {
    dispatch(setPracticeGameResult(true));
  }

  return (
    <section className="w-full flex justify-center mb-10 overflow-hidden -mt-[100px]">
      <div className={`${sphereRoomId ? "w-[90%]" : "w-[50%]"} border-b pb-4`}>
        <div
          style={{
            transform: `translateX(${progressWidth}%)`,
          }}
          className="transition-transform duration-400 ease-out flex flex-col"
        >
          {localStorage.getItem("ProfileIcon") ? (
            <img
              src={localStorage.getItem("ProfileIcon") || "an"}
              alt="an img"
              width={24}
              height={24}
            />
          ) : (
            <FaUserCircle size={24} className="text-textPrimary" />
          )}
          <h1 className="text-sm">
            {" "}
            {sessionStorage.getItem("userName")
              ? sessionStorage.getItem("userName")
              : "unknown user"}
          </h1>
        </div>
      </div>
    </section>
  );
};

export default ProgressBar;
