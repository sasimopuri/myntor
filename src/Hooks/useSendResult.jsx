import { supabase } from "../supabase/supabaseClient";
const useSendResultData = async (resultData) => {
  const { data, error } = await supabase.from("result").insert(resultData);
  if(error){
    window.alert("Error send SS to Sasi")
  }
};
export default useSendResultData;
