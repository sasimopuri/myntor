import { useEffect, useState } from "react";
import { supabase } from "./supabase/supabaseClient";
supabase
const Result = (props) => {
  // const totalQuestions=props.totalQuestions
  // const score=props.score
  // const questions=props.attemptedQuestions
const [questions,setQuestions]=useState()
const [score,setScore]=useState()
const [totalQuestions,setTotalQuestions]=useState()
  useEffect(() => {
    const fetch_quiz = async () => {
      const { data, error } = await supabase.from("result").select("");
      if (error) {
        console.log(error);
      }
      if (data) {
        // setQuizData(data);
        console.log(data);
        setQuestions(data[0]?.questions);
        setTotalQuestions(data[0]?.questions.length);
        setScore(data[0].score)
      }
    };
    fetch_quiz();
  });
  return (
    <div className="p-2 m-6 border border-purple-300 shadow-md rounded-md bg-purple-200 flex flex-col gap-1 justify-center items-center">
      <div className="score-card">
        <p>
          <span>Correct Questions:{score} </span>
          {}
        </p>
        <p>
          <span>Total Questions: {totalQuestions} </span>
          {}
        </p>
      </div>
      <div className="border border-purple-100 p-1">
        {questions?.map((question, i) => (
          <div className="border-b-4 border-gray-300 mt-1" key={question?.id}>
            <div className="question ">
              {i + 1} {question.question}
            </div>
            <div className="flex flex-col items-center">
              {question.options.map((option, i) => (
                <div
                  className={`${
                    question.correctOption === i &&
                    question.answer === question.correctOption &&
                    "bg-green-400 z-10"
                  } ${
                    question.answer === i &&
                    question.correctOption != i &&
                    "bg-orange-300"
                  } ${
                    question.correctOption === i && "bg-green-400"
                  } text-center p-1 rounded`}
                  style={{ minWidth: "100px" }}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Result;
