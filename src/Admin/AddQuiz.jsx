import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";
const AddQuiz = () => {
  const [options, setOptions] = useState([]);
  const [option, setOption] = useState();
  const [topic, setTopic] = useState();
  const [totalquestions, setTotalQuestions] = useState();
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState();
  const [quiz, setQuiz] = useState({});
  const [correctOption, setCorrectOption] = useState(null);
  const [isSendAddQuizDataToBE,setIsSendAddQuizDataToBE]=useState(false)
  const handleAddOption = () => {
    setOptions((prevData) => [...prevData, option]);
  };

  const handleOptionChange = (e) => {
    setOption(e.target.value);
  };

  const handleTopic = (e) => {
    setTopic(e.target.value);
  };

  const handleQuestion = (e) => {
    setQuestion(e.target.value);
  };

  const handleTotalQuestions = (e) => {
    setTotalQuestions(e.target.value);
  };

  const handleAddQuestion = () => {
    const questionObj = {
      options: options,
      question: question,
      id: questions.length,
      correctOption:parseInt(correctOption)
    };
    setQuestions((prevData) => [...prevData, questionObj]);
    setOptions([])
    setCorrectOption("")
    setOption("")
    setQuestion("")
  };

  const handleCorrectOption = (e) => {
    setCorrectOption(e.target.value);
  };

  const sendaddQuizDataToBE=()=>{
    setQuiz(()=>({
        topic:topic,
        totalquestions:totalquestions,
        questions:questions
    }))
    setIsSendAddQuizDataToBE(true)
  }

  useEffect(()=>{
    if(isSendAddQuizDataToBE){
        const sendData = async () => {
            const { data, error } = await supabase.from("quizzes").insert(quiz);
            if(error){
              window.alert("Error send SS to Sasi")
            }
          };
          sendData()
          setIsSendAddQuizDataToBE(false)
    }
  },[isSendAddQuizDataToBE])

  return (
    <>
      <div className="">
        <div className="">
          <label htmlFor="topic">
          Topic:
          <input
            type="text"
            name="topic"
            id="topic"
            value={topic}
            onChange={handleTopic}
          />
        </label>
        <label htmlFor="totalquestions">
          Total Questions :
          <input
            inputmode="numeric"
            patterns="[0-9]*"
            name="totalquestions"
            id="totalquestions"
            onChange={handleTotalQuestions}
          />
        </label>
        <label htmlFor="question">
          Question:
          <textarea
            className="mt-2"
            rows="4"
            cols="180"
            name="question"
            id="question"
            value={question}
            onChange={handleQuestion}
          />
        </label>
        <label htmlFor="option" className="flex">
          Option :
          <input
            type="text"
            name="topic"
            id="topic"
            className="ml-1"
            value={option}
            onChange={handleOptionChange}
          />
          <div onClick={handleAddOption} className="ml-1">Add</div>
        </label>
          <div className="mt-2">{options && options.map((option) => <div className="p-2 bg-purple-100 m-1 text-center w-2/3">{option}</div>)}</div>
        <label htmlFor="">
          Correct Answer :
          <input
            type="number"
            name="correctOption"
            className="ml-1 mt-2"
            id=""
            value={correctOption}
            onChange={handleCorrectOption}
          />
        </label>
        </div>
        <button onClick={handleAddQuestion} className="relative left-1/3 ml-20 bg-purple-300 p-2 rounded-md">Add question</button>
        <hr />
        {questions.map((question)=>(
            <>
                <div className="">{question.question}</div>
                <div className="">
                    {question.options.map((option)=>(
                        <div className="">{option}</div>
                    ))}
                </div>
            </>
        ))}
        {questions.length>0 && <button onClick={sendaddQuizDataToBE}>Submit</button>}
      </div>
    </>
  );
};

export default AddQuiz;
