import { useState, useEffect } from "react";

export function useTypeWriter(typingSpeed = 50) {
  let typingTimeout: NodeJS.Timeout;
  const [typedCharacters, setTypedCharacters] = useState("");

  function typeText(text: string, i = 0) {
    if (i === 0) {
      setTypedCharacters("");
    }

    setTypedCharacters((typedCharacters) => typedCharacters + text[i]);

    if (i === text.length - 1) {
      return;
    }

    typingTimeout = setTimeout(() => typeText(text, i + 1), typingSpeed);
  }

  function deleteText(text: string) {
    if (text.length === 0) {
      return;
    }

    setTypedCharacters(text.substring(0, text.length - 1));

    typingTimeout = setTimeout(() => deleteText(text), typingSpeed);
  }

  useEffect(() => {
    return () => clearTimeout(typingTimeout);
  }, []);

  function doTyping(text: string) {
    typeText(text, 0);
  }

  return { typedCharacters, doTyping, deleteText };
}
