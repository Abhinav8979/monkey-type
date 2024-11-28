import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../redux/hooks";

const OneVsOneTyping = ({ words }: { words: string[] }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [typedChars, setTypedChars] = useState<string[][]>([]);
  const [spaceRequired, setSpaceRequired] = useState<boolean>(false);
  const [gameStart, setGameStart] = useState(false);
  const sphereRoomReady = useAppSelector((state) => state.common.startGame);
  const [countdown, setCountdown] = useState(5);

  const cursorRef = useRef<HTMLDivElement | null>(null);
  const gameDivRef = useRef<HTMLDivElement>(null);

  function generateWords() {
    setTypedChars(words.map(() => []));
  }

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
    if (!gameStart || !sphereRoomReady) {
      // alert("returning");
      return;
    }
    const key = event.key;
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
          updateCursorPosition(true, true); // Update cursor position after removing a character
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
          updateCursorPosition(true);
        }
        return;
      }
    }
  };

  useEffect(() => {
    if (sphereRoomReady) {
      if (countdown > 0) {
        setTimeout(() => {
          setCountdown((prev) => prev - 1);
        }, 1000);
      } else {
        setGameStart(true);
        gameDivRef.current?.focus();
      }
    }
  }, [countdown, sphereRoomReady]);

  useEffect(() => {
    generateWords();
  }, []);

  useEffect(() => {
    if (words.length > 0) {
      window.addEventListener("keydown", handleKeyupEvent);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyupEvent);
    };
  }, [currentLetterIndex, currentWordIndex, spaceRequired, gameStart]);

  useEffect(() => {
    updateCursorPosition();
  }, [currentLetterIndex, currentWordIndex]);

  return (
    <div
      className="relative h-[220px] overflow-hidden text-4xl leading-[55px] text-left focus:outline-0"
      tabIndex={0}
      ref={gameDivRef}
    >
      <div
        style={{
          filter: gameStart ? "blur(0px)" : "blur(4px)",
        }}
        className="text-textSecondary pl-[.5px] flex flex-wrap"
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
        style={{
          display: gameStart ? "initial" : "none",
        }}
        ref={cursorRef}
        className="w-[1.5px] h-[2rem] bg-bgCursorColor absolute top-[12px] animate-blink"
      ></div>
      {!gameStart && sphereRoomReady && (
        <div className="text-center md:text-6xl text-4xl font-bold text-textPrimary z-10">
          Game starts in: {countdown}
        </div>
      )}
    </div>
  );
};

export default OneVsOneTyping;
