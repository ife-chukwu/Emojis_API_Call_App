import { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { EmojiInfo } from "./Components/EmojiInfo";

function App() {
  const [emoji, setEmoji] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetch(
      "https://emoji-api.com/emojis?&access_key=3c6e1dac2b58631997053d4bbb040a5e3532666c"
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`This is an HTTP error: The status is ${res.status}`);
        }
        return res.json();
      })

      .then((data) => setEmoji(data))
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // useEffect(() => {
  // const getData = async()=>{
  //   const res = await fetch(
  //     "https://emoji-api.com/emojs?access_key=3c6e1dac2b58631997053d4bbb040a5e3532666c"
  //   );

  //   if(!res.ok){
  //     throw new Error(`This is an HTTP error: The status is ${res.status}`);
  //   }
  //   const actualData = await res.json()
  //   setEmoji(actualData)
  //   setError(null)
  // }

  // getData()
  // }, [])

  console.log(emoji);
  return (
    <div className="h-full w-full">
      <div className="mb-20  my-5">
        <h1 className="border-b border-white/10 flex justify-center font3 text-4xl ">
          Hot Emojis
        </h1>
      </div>
      <form className="flex justify-center mb-10">
        <input
          type="search"
          placeholder="Search Emojis"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          name="search"
          className="bg-black border border-white/20 py-3 rounded-full px-10 outline-none w-3/4"
        />
      </form>
      <div className="flex justify-center">
        <Routes>
          <Route path="/:myParam" element={<EmojiInfo emoji={emoji} />} />
        </Routes>
      </div>
      {loading && (
        <div className="flex w-full justify-center  items-center">
          <div>
            <p className="font1 text-2xl mt-40">Please wait a minute...</p>
            <p className="flex justify-center text-4xl">😕</p>
          </div>
        </div>
      )}
      {error ? <p>Fuck you bro</p> : null}

      <div className="flex justify-center">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-x-10 md:gap-x-20 gap-y-10 w-3/4 mb-40">
          {emoji
            .filter(
              (item) =>
                item.slug.toLowerCase().includes(search) &&
                item.character != "🥸"
            )
            .map((item) => (
              <div
                key={item.slug}
                className="flex justify-center gap-5 gap-y-10 w-full"
              >
                <div className="text-2xl border flex gap-5 h-20 cursor-pointer hover:shadow-black transition-all duration-500 hover:bg-white/10 rounded-xl hover:scale-150 shadow-white/20 shadow-md w-[300px]  border-white/20">
                  <div className="flex justify-center text-5xl h-full items-center w-full ">
                    <Link to={`${item.slug}`}>
                      {" "}
                      <p>{item.character}</p>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
