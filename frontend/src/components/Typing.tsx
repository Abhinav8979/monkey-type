import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  setPracticeGameStart,
  setWordsSummary,
} from "../redux/features/practiceSlice";
import { generatePara } from "../utils/helperFunction";

const Typing = () => {
  const [words, setWords] = useState<string[]>([]);
  // const words = useAppSelector((state) => state.common.words);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [typedChars, setTypedChars] = useState<string[][]>([]);
  const [spaceRequired, setSpaceRequired] = useState<boolean>(false);
  const [noOfWordsTyped, setNoOfWordsTyped] = useState<number>(0);
  const value = useAppSelector((state) => state.common.value);

  //0-> correct , 1-> incorrect 2-> extra
  const [typeSummary, setTypeSummary] = useState<number[]>([0, 0, 0]);

  const selectedOption = useAppSelector(
    (state) => state.practice.selectedOptions
  );
  const showResult = useAppSelector(
    (state) => state.practice.showPracticeGameResult
  );
  const gameStart = useAppSelector((state) => state.practice.startPracticeGame);

  const dispatch = useAppDispatch();

  const cursorRef = useRef<HTMLDivElement | null>(null);

  const generateWords = () => {
    const text: string = generatePara(value);
    dispatch(setWordsSummary({ totalWords: text.replace(/\s/g, "").length }));
    const wordArray = text.split(" ");
    setWords(wordArray);
    // dispatch(setGameWords(wordArray));
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

    const currentWord = document.querySelector(`#word-${currentWordIndex}`);
    if (
      currentWord?.getBoundingClientRect() &&
      currentWord?.getBoundingClientRect().top > 500
    ) {
      const wordsElement = document.getElementById("words");
      if (wordsElement) {
        const margin = parseInt(wordsElement.style.marginTop || "0px");
        wordsElement.style.marginTop = `${margin - 60}px`;
      }
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

        setTypeSummary((prev) => {
          const updatedSummary = [...prev];
          updatedSummary[2] = updatedSummary[2] + 1;
          return updatedSummary;
        });

        return;
      }

      setNoOfWordsTyped((prev) => {
        const updatedValue = prev + 1;
        dispatch(setWordsSummary({ noOfWordsTyped: updatedValue }));
        return updatedValue;
      });

      const expectedChar = words[currentWordIndex][currentLetterIndex];
      const isCorrect = key === expectedChar;

      setTypeSummary((prev) => {
        const updatedSummary = [...prev];
        updatedSummary[isCorrect ? 0 : 1] =
          updatedSummary[isCorrect ? 0 : 1] + 1;
        return updatedSummary;
      });

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

        setTypeSummary((prev) => {
          const updatedSummary = [...prev];
          let letter = typedChars[currentWordIndex][currentLetterIndex];
          updatedSummary[letter === "correct" ? 0 : 1] =
            updatedSummary[letter === "correct" ? 0 : 1] - 1;
          return updatedSummary;
        });

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
          setTypeSummary((prev) => {
            const updatedSummary = [...prev];
            let letter = typedChars[currentWordIndex][currentLetterIndex];
            updatedSummary[letter === "correct" ? 0 : 1] =
              updatedSummary[letter === "correct" ? 0 : 1] - 1;
            return updatedSummary;
          });

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
    generateWords();
  }, [value]);

  useEffect(() => {
    if (words.length > 0) {
      window.addEventListener("keydown", handleKeyupEvent);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyupEvent);
    };
  }, [words, currentLetterIndex, currentWordIndex, spaceRequired]);

  useEffect(() => {
    updateCursorPosition();
  }, [currentLetterIndex, currentWordIndex]);

  useEffect(() => {
    dispatch(
      setWordsSummary({
        correct: typeSummary[0],
        incorrect: typeSummary[1],
        extra: typeSummary[2],
      })
    );
  }, [typeSummary]);

  return (
    <div className="relative h-[220px] overflow-hidden text-4xl leading-[55px] text-left ">
      <div
        className="text-textSecondary pl-[.5px] flex flex-wrap focus:outline-0"
        tabIndex={0}
        id="words"
      >
        {words.length > 2 &&
          words.map((word, wordIndex) => (
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
