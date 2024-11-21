import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faShieldAlt,
  faLock,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faTwitter,
  faDiscord,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { useAppSelector } from "../redux/hooks";

const Footer = () => {
  const items = [
    { name: "Contact", icon: faPhone },
    { name: "Twitter", icon: faTwitter },
    { name: "Discord", icon: faDiscord },
    { name: "Security", icon: faShieldAlt },
    { name: "Privacy", icon: faLock },
    { name: "Support", icon: faHeadset },
  ];

  const gameStart = useAppSelector((state) => state.practice.startPracticeGame);

  return (
    <div
      style={{
        pointerEvents: gameStart ? "none" : "initial",
        filter: gameStart ? "blur(3px)" : "blur(0px)",
      }}
      className="flex gap-5 md:gap-9 items-center justify-center text-sm text-textPrimary absolute bottom-[4%] left-1/2 -translate-x-1/2"
    >
      {items.map((item, index) => (
        <div
          key={index}
          className={`flex items-center gap-1 my-2 md:text-base text-xs ${
            gameStart ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          tabIndex={gameStart ? -1 : 0} // Prevent focus when gameStart is true
          aria-disabled={gameStart} // Accessibility attribute
        >
          <FontAwesomeIcon icon={item.icon} />
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Footer;
