export function generateRoomID(length = 8): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let roomID = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    roomID += characters[randomIndex];
  }
  return roomID;
}

export function calculateRawWPM(
  typedText: number,
  timeElapsed: number,
  totalCharacters: number
) {
  const timeInMinutes = timeElapsed / 60;

  const rawWPM = totalCharacters / totalCharacters / timeInMinutes;

  return Math.round(rawWPM * 100) / 100;
}

export function calculateAccuray(
  typedTextCorrect: number,
  totalCharactersTyped: number
) {
  const accuracy = (typedTextCorrect / totalCharactersTyped) * 100;
  return Math.round(accuracy * 100) / 100;
}

export const calculateWPM = (
  timeElapsed: number,
  correctCharacters: number,
  totalCharacters: number
) => {
  const timeInMinutes = timeElapsed / 60;

  const rawWPM = correctCharacters / totalCharacters / timeInMinutes;

  return Math.round(rawWPM * 100) / 100;
};
