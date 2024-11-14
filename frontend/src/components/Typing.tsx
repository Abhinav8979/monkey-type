import { useEffect, useRef, useState } from "react";

const Typing = () => {
  const [words, setWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [typedChars, setTypedChars] = useState<string[][]>([]);
  const [spaceRequired, setSpaceRequired] = useState<boolean>(false);

  const cursorRef = useRef<HTMLDivElement | null>(null);

  const generateWords = () => {
    const text =
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam similique iste sit officia magni impedit natus repellat suscipit reprehenderit ex corrupti illum sunt nemo eaque labore cumque est laboriosam architecto, odit mollitia? Libero asperiores assumenda quae magnam maiores voluptates, minima dolore, voluptatem, sit aliquid mollitia voluptate inventore ab. Sint magni enim eius laudantium ut.Magnam laudantium reprehenderit veniam itaque dolorum?";
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
    if (!words.length) return;
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
    generateWords();
  }, []);

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
    <div
      className="relative h-[220px] overflow-hidden text-4xl leading-[55px] text-left focus:outline-0"
      tabIndex={0}
    >
      <div className="text-textSecondary pl-[.5px] flex flex-wrap">
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
