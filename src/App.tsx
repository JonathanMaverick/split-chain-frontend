import { Route, Routes } from "react-router-dom";
import RouteComponent from "./components/route/RouteComponent";

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<RouteComponent />} />
      </Routes>
    </>
  );
}

export default App;
