import React from "react";
import { useParams } from "react-router-dom";

export const EmojiInfo = ({ emoji }) => {
  const { myParam } = useParams();

  return (
    <div className="">
      {emoji
        .filter((item) => item.slug === myParam)
        .map((item) => (
          <div key={item.slug}>
            <p className="text-[6rem] md:text-[10rem] flex justify-center">
              {" "}
              {item.character}
            </p>
            <p className="mb-10 flex justify-center md:text-2xl font3 tracking-wide">
              {item.unicodeName}
            </p>
          </div>
        ))}
    </div>
  );
};
