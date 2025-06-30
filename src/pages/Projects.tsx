import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import ProjectCard from "../components/ProjectCard";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

type Props = {};

const Projects = ({}: Props) => {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching projects:", error);
      } else {
        setProjects(data || []);
      }
    };

    fetchProjects();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="border rounded-lg shadow-lg bg-white w-full max-w-4xl flex flex-col gap-2 justify-center px-5 py-3">
        <p className="text-2xl font-bold">Projects</p>
        <p className="text-gray-600 mb-6">
          Select a project to view its details and API documentation.
        </p>

        {Projects.length > 0 ? (
          <>
            {projects.map((project) => (
              <ProjectCard project={project} key={project.id} />
            ))}
          </>
        ) : (
          <div className="text-center text-gray-500">
            <p>No projects found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
