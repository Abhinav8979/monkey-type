import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  setPracticeGameStart,
  setWordsSummary,
} from "../redux/features/practiceSlice";

const Typing = () => {
  const [words, setWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [typedChars, setTypedChars] = useState<string[][]>([]);
  const [spaceRequired, setSpaceRequired] = useState<boolean>(false);
  const [noOfWordsTyped, setNoOfWordsTyped] = useState<number>(0);

  const selectedOption = useAppSelector(
    (state) => state.practice.selectedOptions
  );
  const showResult = useAppSelector(
    (state) => state.practice.showPracticeGameResult
  );
  const gameStart = useAppSelector((state) => state.practice.startPracticeGame);

  const dispatch = useAppDispatch();

  const cursorRef = useRef<HTMLDivElement | null>(null);

  const generateWords = (group1: string, group2: string) => {
    const text =
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis optio ipsa sit cum sint!";
    dispatch(setWordsSummary({ totalWords: text.replace(/\s/g, "").length }));
    const wordArray = text.split(" ");
    setWords(wordArray);
    setTypedChars(wordArray.map(() => []));
  };

  const updateCursorPosition = (space = false, created = false) => {
    const currentCharElement = document.querySelector(
      `#word-${currentWordIndex}-char-${currentLetterIndex}`
    ) as HTMLElement;
    const cursorElement = cursorRef.current;

    if (currentCharElement && cursorElement) {
      let charRect = currentCharElement.getBoundingClientRect();
      let parentRect = currentCharElement.offsetParent?.getBoundingClientRect();

      if (created) {
        const element = document.querySelector(`#word-${currentWordIndex}`);
        charRect = element?.getBoundingClientRect() || charRect;
        parentRect =
          element?.offsetParent?.getBoundingClientRect() || parentRect;
      }

      cursorElement.style.left = `${
        charRect[space ? "right" : "left"] - (parentRect?.left || 0)
      }px`;

      cursorElement.style.top = `${
        charRect.top - (parentRect?.top || 0) + 12
      }px`;
    }
  };

  const handleKeyupEvent = (event: KeyboardEvent) => {
    if (!words.length && showResult) return;
    const key = event.key;

    if (!gameStart) {
      dispatch(setPracticeGameStart(true));
    }

    // Check if the user typed a space
    if (key === " ") {
      if (spaceRequired) {
        setCurrentLetterIndex(0);
        setCurrentWordIndex((prev) => prev + 1);
        setSpaceRequired(false);
        return;
      }
      setTypedChars((prevTypedChars) => {
        const newTypedChars = [...prevTypedChars];
        const currentWordChars = newTypedChars[currentWordIndex] || [];

        for (
          let i = currentLetterIndex;
          i < words[currentWordIndex].length;
          i++
        ) {
          setNoOfWordsTyped((prev) => {
            const updatedValue = prev + 1;
            dispatch(setWordsSummary({ noOfWordsTyped: updatedValue }));
            return updatedValue;
          });
          currentWordChars[i] = "";
        }

        newTypedChars[currentWordIndex] = currentWordChars;
        return newTypedChars;
      });

      setCurrentLetterIndex(0);
      setCurrentWordIndex((prevWordIndex) => prevWordIndex + 1);
      return;
    }

    // Continue processing if the key is a single character
    if (key.length === 1) {
      if (spaceRequired) {
        const element = document.querySelector(`#word-${currentWordIndex}`);
        const length = element?.querySelectorAll(".created").length || 0;
        if (length > 10) {
          return;
        }
        const span = document.createElement("span");
        span.textContent = key;
        span.classList.add("incorrect");
        span.classList.add("created");
        element?.appendChild(span);
        updateCursorPosition(true, true);
        return;
      }

      setNoOfWordsTyped((prev) => {
        const updatedValue = prev + 1;
        dispatch(setWordsSummary({ noOfWordsTyped: updatedValue }));
        return updatedValue;
      });

      const expectedChar = words[currentWordIndex][currentLetterIndex];
      const isCorrect = key === expectedChar;

      setTypedChars((prevTypedChars) => {
        const newTypedChars = [...prevTypedChars];
        const currentWordChars = newTypedChars[currentWordIndex] || [];

        currentWordChars[currentLetterIndex] = isCorrect
          ? "correct"
          : "incorrect";
        newTypedChars[currentWordIndex] = currentWordChars;

        return newTypedChars;
      });

      if (currentLetterIndex >= words[currentWordIndex].length - 1) {
        updateCursorPosition(true);
        setSpaceRequired(true);
        return;
      }
      setCurrentLetterIndex((prevLetterIndex) => prevLetterIndex + 1);
      updateCursorPosition();
    }

    if (key === "Backspace" && currentLetterIndex >= 0) {
      if (spaceRequired) {
        const element = document.querySelector(`#word-${currentWordIndex}`);
        const length = element?.querySelectorAll(".created").length || 0;

        if (length > 0 && element?.lastChild) {
          element?.removeChild(element.lastChild);
          updateCursorPosition(true, true);
          return;
        }

        setTypedChars((prevTypedChars) => {
          const newTypedChars = [...prevTypedChars];
          const currentWordChars = newTypedChars[currentWordIndex] || [];
          currentWordChars[currentLetterIndex] = "";
          newTypedChars[currentWordIndex] = currentWordChars;
          return newTypedChars;
        });
        setSpaceRequired(false);
        updateCursorPosition(true);
      } else {
        setTypedChars((prevTypedChars) => {
          const newTypedChars = [...prevTypedChars];
          const currentWordChars = newTypedChars[currentWordIndex] || [];
          currentWordChars[
            currentLetterIndex - 1 >= 0 ? currentLetterIndex - 1 : 0
          ] = "";
          newTypedChars[currentWordIndex] = currentWordChars;
          return newTypedChars;
        });
        setCurrentLetterIndex((prev) => Math.max(prev - 1, 0));
        if (currentLetterIndex) {
          setNoOfWordsTyped((prev) => {
            const updatedValue = prev - 1;
            dispatch(setWordsSummary({ noOfWordsTyped: updatedValue }));
            return updatedValue;
          });

          updateCursorPosition(true);
        }
        return;
      }
    }
  };

  useEffect(() => {
    const group1 = selectedOption.group1;
    if (group1) {
      generateWords(group1, selectedOption.group2);
    } else {
      generateWords("", selectedOption.group2);
    }
  }, [selectedOption.group1, selectedOption.group2]);

  useEffect(() => {
    if (words.length > 0) {
      window.addEventListener("keydown", handleKeyupEvent);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyupEvent);
    };
  }, [words, currentLetterIndex, currentWordIndex, spaceRequired]);

  useEffect(() => {
    updateCursorPosition(); // Update cursor whenever letter or word index changes
  }, [currentLetterIndex, currentWordIndex]);

  return (
    <div className="relative h-[220px] overflow-hidden text-4xl leading-[55px] text-left ">
      <div
        className="text-textSecondary pl-[.5px] flex flex-wrap focus:outline-0"
        tabIndex={0}
      >
        {words.map((word, wordIndex) => (
          <div key={wordIndex} className="mr-3" id={`word-${wordIndex}`}>
            {word.split("").map((char, charIndex) => (
              <span
                key={charIndex}
                id={`word-${wordIndex}-char-${charIndex}`}
                className={
                  typedChars[wordIndex]?.[charIndex] === "correct"
                    ? "correct"
                    : typedChars[wordIndex]?.[charIndex] === "incorrect"
                    ? "incorrect"
                    : ""
                }
              >
                {char}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div
        ref={cursorRef}
        className="w-[1.5px] h-[2rem] bg-bgCursorColor absolute top-[12px] animate-blink"
      ></div>
    </div>
  );
};

export default Typing;
