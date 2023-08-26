import { useEffect, useState } from "react";
import bgimg from "./assets/Humaaans.svg";
import { Link } from "react-router-dom";
const Home = () => {
  const [topic, setTopic] = useState("");
  const handleTopicChange=(e)=>{
    setTopic(e.target.value)
  }
  return (
    <>
      <div className="home bg-purple-50 h-full">
        <div className="container absolute flex flex-col items-center">
          <Link to={`/addquiz`}><div className="text-3xl font-semibold animation1">WELCOME</div></Link>
          <div className="text-6xl fonr-bold animation2">2</div>
          <div className="text-5xl font-bold text-purple-500 animation3">
            Myntor
          </div>
        </div>
        <img className="bgimg w-52 absolute" src={bgimg} alt="" />
        <div className="dropdown">
         <input type="text" name="" id="" onChange={handleTopicChange}/>
        </div>
        <Link to={`/quiz/${topic}`}>
          <button className="btn-begin absolute mt-10 p-2 m-4 border-2 border-red-100 bg-cyan-500 rounded-md">
            Let's Begin the Show
          </button>
        </Link>
      </div>
    </>
  );
};

export default Home;
