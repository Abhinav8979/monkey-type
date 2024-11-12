import {
  faAt,
  faHashtag,
  faClock,
  faQuoteRight,
  faFont,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Options = () => {
  return (
    <section className="w-full flex gap-32 items-center justify-center font-medium text-textPrimary text-sm ">
      <div className="bg-black border-2 border-neutral-700 py-3 px-4 rounded-full flex gap-6">
        <span>
          <FontAwesomeIcon icon={faAt} />
        </span>
        <span>
          <FontAwesomeIcon icon={faHashtag} />
        </span>
      </div>
      <div className="bg-black border-2 border-neutral-700 py-3 px-4 rounded-full flex gap-16">
        <span>
          <FontAwesomeIcon icon={faClock} />{" "}
        </span>
        <span>
          <FontAwesomeIcon icon={faQuoteRight} />
        </span>
        <span>
          <FontAwesomeIcon icon={faFont} />
        </span>
      </div>
      <div className="bg-black border-2 border-neutral-700 py-3 px-4 rounded-full flex gap-7">
        {[15, 30, 60, 120].map((timer: number) => {
          return (
            <h1 className="text-textPrimary" key={timer}>
              {timer}
            </h1>
          );
        })}
      </div>
    </section>
  );
};

export default Options;
