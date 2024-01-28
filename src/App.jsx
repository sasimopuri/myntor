import { Outlet } from "react-router-dom";
import Quiz from "./Quiz";

const App = () => {
  return (
    // <div className="p-2 m-6 border border-purple-300 shadow-md rounded-md bg-purple-200 flex flex-col gap-1 justify-center items-center">
      <Outlet />
    // </div>
  );
};

export default App;
