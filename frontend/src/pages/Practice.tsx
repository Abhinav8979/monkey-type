import Typing from "../components/Typing";
import Options from "../components/Options";
import PracticeProvider from "../redux/practiceProvider";

const Practice = () => {
  return (
    <PracticeProvider>
      <section>
        <Typing />
        <Options />
      </section>
    </PracticeProvider>
  );
};

export default Practice;
