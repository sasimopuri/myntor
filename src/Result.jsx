import { useEffect, useState } from "react";
import { supabase } from "./supabase/supabaseClient";
const Result = (props) => {
  const [questions, setQuestions] = useState(props.questions);
  const [score, setScore] = useState(props.score);
  const [totalQuestions, setTotalQuestions] = useState(props.totalQuestions);
  const [topic,setTopic]=useState(props.topic)
  useEffect(()=>{
    console.log("res",props);
  })

  return (
    <div className="p-2 m-6 border border-purple-300 shadow-md rounded-md bg-purple-200 flex flex-col gap-1 justify-center items-center">
      <div className="score-card">
        <p>Topic:{topic}</p>
        <p>
          <span>Correct Questions:{score} </span>
        </p>
        <p>
          <span>Total Questions: {totalQuestions} </span>
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
