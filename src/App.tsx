import { Navigate, Route, Routes } from "react-router-dom";
import Projects from "./pages/Projects";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Projects />} />
    </Routes>
  );
}

export default App;
