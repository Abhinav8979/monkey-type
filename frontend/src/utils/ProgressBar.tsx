import { useAppSelector } from "../redux/hooks";

const ProgressBar = () => {
  const noOfWordsTyped = useAppSelector(
    (state) => state.practice.noOfWordsTyped
  );
  const totalWords = useAppSelector((state) => state.practice.totalWords);

  const progressWidth =
    totalWords > 0 ? (noOfWordsTyped / totalWords) * 100 : 0;

  return (
    <section className="w-full flex justify-center mb-10">
      <div className="w-[60%] h-30 border-b">
        <div
          style={{
            width: progressWidth + "%",
          }}
          className="h-full mb-1 border-b border-red-400 transition-all duration-400 ease-out"
        ></div>
      </div>
    </section>
  );
};

export default ProgressBar;
