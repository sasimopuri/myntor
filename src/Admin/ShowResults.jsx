import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import { useNavigate } from "react-router-dom";
import Result from "../Result";
const ShowResults = () => {
  const [results, setResults] = useState();
  const [singleResult,setSingleResult]=useState();
  const [resultQuestions,setResultQuestions]=useState();
  const [score,setScore]=useState();
  const [totalQuestions,setTotalQuestions]=useState();
  const [showResult,setShowResult]=useState(false)
  const [topic,setTopic]=useState()
  useEffect(() => {
    const fetch_quiz = async () => {
      const { data, error } = await supabase.from("result").select();
      if (error) {
        console.log(error);
      }
      if (data) {
        console.log(data);
        setResults(data);
      }
    };
    fetch_quiz();
  }, []);
  
  const handleClick=(created_at)=>{
    console.log(created_at);
    const fetch_quiz = async () => {
        const { data, error } = await supabase.from("result").select().eq("created_at",created_at);
        if (error) {
          console.log(error);
        }
        if(data){
            console.log("setSingleResult",data);
            setSingleResult(data)
            setResultQuestions(data[0].questions)
            setScore(data[0].score)
            setTotalQuestions(data[0].questions.length)
            setShowResult(true)
            setTopic(data[0].topic)
        }
    };
    fetch_quiz()
  }

  return (
    <>
      {showResult ? (
        <Result score={score} totalQuestions={totalQuestions} topic={topic} questions={resultQuestions} />
      ) : (
        results?.map((result) => (
          <div className="time-container" key={result.created_at} onClick={() => handleClick(result.created_at)}>
            <p>Topic: {result.topic}, Time: {result.created_at}</p>
          </div>
        ))
      )}
    </>
  );
  
};

export default ShowResults;
