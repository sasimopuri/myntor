import { useEffect, useState } from "react";
import { supabase } from "./supabase/supabaseClient";
import Result from "./Result";
import useSendResultData from "./Hooks/useSendResult";

const Quiz = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState(null);
  const [isEnd, setIsEnd] = useState(false);
  const [isBegining, setIsBeginning] = useState(true);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(null);
  const [topic, setTopic] = useState(null);
  const [attemptedQuestions, setAttemptedQuestions] = useState([]);
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
        setTotalQuestions(data[0]?.questions.length);
        setTopic(data[0]?.topic);
      }
    };
    fetch_quiz();
  }, []);

  useEffect(() => {
    // console.log(questions);
    console.log(score);
  }, [score]);

  useEffect(() => {
    if (questions && questions.length === 1) {
      setIsBeginning(true);
      setIsEnd(true);
    }
  }, [questions]);

  const handleSelect = (i) => {
    setSelectedOption((prev) => {
      if (prev === i) {
        setSelectedOption(null);
      } else {
        setSelectedOption(i);
      }
    });
  };

  const handleNext = () => {
    setIsBeginning(false);
    if (selectedOption === questions[currentQuestion]?.correctOption) {
      setScore((prevScore) => prevScore + 1);
    }
    updateAttemptedQuestions(currentQuestion);
    setSelectedOption(null);
    if (currentQuestion != questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      if (currentQuestion + 1 === questions.length - 1) {
        setIsEnd(true);
      }
    } else {
      setIsEnd(true);
    }
  };

  const updateAttemptedQuestions = (i) => {
    const newQuestionObject = questions[i];
    newQuestionObject.answer = selectedOption;
    setAttemptedQuestions((prevData) => [...prevData, newQuestionObject]);
  };

  const handlePrev = () => {
    setIsEnd(false);
    setSelectedOption(null);
    if (currentQuestion != 0) {
      setCurrentQuestion((prev) => prev - 1);
      if (currentQuestion - 1 === 0) {
        setIsBeginning(true);
      }
    }
  };

  const submitQuiz = async () => {
    if (selectedOption === questions[currentQuestion]?.correctOption) {
      setScore((prevScore) => prevScore + 1);
    }
    updateAttemptedQuestions(currentQuestion);
    setShowResult(true);
  };

  useEffect(() => {
    if (showResult) {
      const obj = { score: score, topic: topic, questions: attemptedQuestions };
      useSendResultData(obj);
    }
  },[showResult]);

  if (!quizData || quizData === null) {
    return;
  }
  return (
    <>
      <div className="w-10/12 m-auto mb-16 mt-16 shadow-sm shadow-gray-500 p-2 rounded relative bg-purple-100">
        {showResult ? (
          <Result score={score} totalQuestions={totalQuestions} />
        ) : (
          <div className="Quiz">
            <div className="text-center text-xl p-1 font-medium lg:text-3xl mb-4 border-2 border-gray-300 rounded-md shadow-inner shadow-md shadow-purple-200">
              <p>{questions[currentQuestion]?.question}</p>
              {/* <p>sajdvabsd sdlaknsd dblaksbdlka dalksd</p> */}
            </div>
            <div
              className="flex gap-2 justify-around flex-col text-center lg:flex-row flex-wrap my-4 py-4 gap-4 shadow-sm shadow-purple-200 rounded text-lg lg:text-2xl"
              key={currentQuestion}
            >
              {questions[currentQuestion]?.options?.map((option, i) => (
                <>
                  <div
                    className={`hover:cursor-pointer focus:bg-black ${
                      selectedOption === i && " bg-indigo-300"
                    } rounded-md px-1`}
                    key={option}
                    onClick={() => handleSelect(i)}
                  >
                    {option}
                  </div>
                </>
              ))}
            </div>
            <div className="flex justify-around ">
              {/* <button
            className={`p-2 text-lg bg-neutral-600 text-white rounded-md ${
              isBegining &&
              "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={!isBegining ? handlePrev : undefined}
          >
            Previous
          </button> */}
              <button
                className={`p-2 text-lg bg-neutral-600 text-white rounded-md `}
                onClick={!isEnd ? handleNext : submitQuiz}
              >
                {isEnd ? "Submit" : "Next"}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Quiz;
