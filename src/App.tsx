import { Route, Routes } from "react-router-dom";
import Projects from "./pages/Projects";
import ProjectDocs from "./pages/ProjectDocs";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Projects />} />
      <Route path=":project_name" element={<ProjectDocs />}></Route>
    </Routes>
  );
}

export default App;
