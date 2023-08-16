import { useEffect, useState } from "react";
import { supabase } from "./supabase/supabaseClient";

const Quiz = () => {
  const [selectedOption, setSelectedOption] = useState(0);
  const [quizData, setQuizData] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState(null);
  const [isEnd, setIsEnd] = useState(false);
  const [isBegining, setIsBeginning] = useState(true);
  useEffect(() => {
    const fetch_quiz = async () => {
      const { data, error } = await supabase.from("quizzes").select("");
      if (error) {
        console.log(error);
      }
      if (data) {
        setQuizData(data);
        console.log(data);
        setQuestions(data[0]?.questions);
      }
    };
    fetch_quiz();
  }, []);

  useEffect(()=>{
    if(questions && questions.length===1)
    {
      setIsBeginning(true)
      setIsEnd(true)
    }
  },[questions])

  const handleSelect = (i) => {
    setSelectedOption((prev) => {
      if (prev === i) {
        setSelectedOption(0);
      } else {
        setSelectedOption(i);
      }
    });
  };

  const handleNext = () => {
    setIsBeginning(false);
    if (currentQuestion != questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      if (currentQuestion + 1 === questions.length - 1) {
        setIsEnd(true);
      }
    } else {
      setIsEnd(true);
    }
  };

  const handlePrev = () => {
    setIsEnd(false);
    if (currentQuestion != 0) {
      setCurrentQuestion((prev) => prev - 1);
      if (currentQuestion - 1 === 0) {
        setIsBeginning(true);
      }
    }
  };

  useEffect(() => {
    console.log("isend", isEnd);
    console.log("isBeg", isBegining);
  }, [isEnd, isBegining]);
  if (!quizData || quizData === null) {
    return;
  }
  return (
    <>
      <div className="w-10/12 m-auto mb-16 mt-16 shadow-sm shadow-gray-500 p-2 rounded relative bg-purple-100">
        <div className="text-center text-xl p-1 font-medium lg:text-3xl mb-4 border-2 border-gray-300 rounded-md shadow-inner shadow-md shadow-purple-200">
          <p>{questions[currentQuestion]?.question}</p>
          {/* <p>sajdvabsd sdlaknsd dblaksbdlka dalksd</p> */}
        </div>
        <div className="flex gap-2 justify-around flex-col text-center lg:flex-row flex-wrap my-4 py-4 gap-4 shadow-sm shadow-purple-200 rounded text-lg lg:text-2xl">
          <div
            className={`hover:cursor-pointer focus:bg-black ${
              selectedOption === 1 && " bg-indigo-300"
            } rounded-md px-1`}
            onClick={() => handleSelect(1)}
          >
            1.print("Hello world"): Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Veniam commodi perferendis dolor nesciunt corrupti
            provident alias nemo nostrum, dolorem officiis vel? At incidunt eius
            voluptas assumenda autem quasi cum laboriosam!
          </div>
          <div
            className={`hover:cursor-pointer focus:bg-black ${
              selectedOption === 2 && "bg-indigo-300"
            } rounded-md px-1`}
            onClick={() => handleSelect(2)}
          >
            2.option Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Quos tenetur illo nulla assumenda ad, cum ullam voluptatum facilis
            amet odio officiis ratione mollitia nesciunt impedit laudantium
            dolores! Consequatur, corrupti minima.
          </div>
          {/* <div
            className={`hover:cursor-pointer focus:bg-black ${
              selectedOption === 3 && "bg-indigo-300"
            } rounded-md px-1`}
            onClick={() => handleSelect(3)}
          >
            3.option Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Quos tenetur illo nulla assumenda ad, cum ullam voluptatum facilis
            amet odio officiis ratione mollitia nesciunt impedit laudantium
            dolores! Consequatur, corrupti minima.
          </div> */}
          {/* <div
            className={`hover:cursor-pointer focus:bg-black ${
              selectedOption === 4 && "bg-indigo-300"
            } rounded-md px-1`}
            onClick={() => handleSelect(4)}
          >
            4.option Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Quos tenetur illo nulla assumenda ad, cum ullam voluptatum facilis
            amet odio officiis ratione mollitia nesciunt impedit laudantium
            dolores! Consequatur, corrupti minima.
          </div> */}
        </div>
        <div className="flex justify-around ">
          <button
            className={`p-2 text-lg bg-neutral-600 text-white rounded-md ${
              isBegining && "cursor-not-allowed text-white bg-gray-300 rounded focus:outline-none"
            }`}
            onClick={!isBegining ? handlePrev : undefined}
          >
            Previous
          </button>
          <button
            className={`p-2 text-lg bg-neutral-600 text-white rounded-md ${
              isEnd && "cursor-not-allowed text-white bg-gray-300 rounded focus:outline-none"
            }`}
            onClick={!isEnd ? handleNext : undefined}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Quiz;
