import { Link, Route, Routes } from "react-router-dom";
import Projects from "./pages/Projects";
import ProjectDocs from "./pages/ProjectDocs";
import DocViewer from "./components/DocViewer";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar - Fixed at top */}
      <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 fixed top-0 left-0 right-0 z-50">
        <Link to={"/"} className="text-xl font-semibold text-gray-800">
          Project Docs
        </Link>
      </nav>

      {/* Main Content Area - Below navbar */}
      <main className="flex-1 pt-16">
        <Routes>
          <Route path="/" element={<Projects />} />
          <Route path=":project_name" element={<ProjectDocs />}>
            <Route path=":doc_id" element={<DocViewer />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
