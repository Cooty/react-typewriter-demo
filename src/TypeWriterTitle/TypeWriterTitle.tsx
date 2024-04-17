import { useMemo, useEffect, useRef } from "react";
import { useTypeWriter } from "./use-typewriter";
import getRandomIndex from "../utils/get-random-index";

function TypeWriterTitle() {
  const textsToTypeOut = useMemo(
    () => [
      "someone to fix the sink in the bathroom",
      "a dentist",
      "where I can get my nails done",
    ],
    []
  );
  const textsIndex = useRef(getRandomIndex(textsToTypeOut));
  const { typedCharacters, doTyping, deleteText } = useTypeWriter(100);

  useEffect(() => {
    // Start the 1st iteration with a randomly selected string
    doTyping(textsToTypeOut[textsIndex.current]);
  }, []);

  useEffect(() => {
    if (typedCharacters.length === textsToTypeOut[textsIndex.current].length) {
      textsIndex.current =
        textsIndex.current + 1 <= textsToTypeOut.length - 1
          ? textsIndex.current + 1
          : 0;
      // TODO: It should "type backwards" when one sentence is done (preferably with waiting a bit)
      // then it should type the net one
      // and so on and so on...
      doTyping(textsToTypeOut[textsIndex.current]);
    }
  }, [typedCharacters, textsToTypeOut, doTyping]);

  // That's the version with the deletion but it doesn't work :(
  // useEffect(() => {
  //   if (typedCharacters.length === textsToTypeOut[textsIndex.current].length) {
  //     deleteText(textsToTypeOut[textsIndex.current]);
  //     textsIndex.current =
  //       textsIndex.current + 1 <= textsToTypeOut.length - 1
  //         ? textsIndex.current + 1
  //         : 0;
  //     if (typedCharacters.length === 0) {
  //       doTyping(textsToTypeOut[textsIndex.current]);
  //     }
  //   }
  // }, [typedCharacters, textsToTypeOut, doTyping, deleteText]);

  return (
    <>
      <h1>
        <span style={{ color: "#666" }}>Find me</span> {typedCharacters}
      </h1>
      <button onClick={() => doTyping(textsToTypeOut[1])}>Type!</button>
    </>
  );
}

export default TypeWriterTitle;
