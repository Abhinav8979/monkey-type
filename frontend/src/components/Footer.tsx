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

const Footer = () => {
  const items = [
    { name: "Contact", icon: faPhone },
    { name: "Instagram", icon: faInstagram },
    { name: "Twitter", icon: faTwitter },
    { name: "Discord", icon: faDiscord },
    { name: "GitHub", icon: faGithub },
    { name: "Security", icon: faShieldAlt },
    { name: "Privacy", icon: faLock },
    { name: "Support", icon: faHeadset },
  ];
  return (
    <div className="flex gap-5 md:gap-10 items-center justify-center text-sm text-textPrimary absolute bottom-[4%] left-1/2 -translate-x-1/2">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-1 my-2 md:text-base text-xs"
        >
          <FontAwesomeIcon icon={item.icon} />
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Footer;
