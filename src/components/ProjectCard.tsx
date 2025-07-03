import { useState } from "react";
import DocCard from "./DocCard";

type Props = {
  project?: any; // Define the type of project if known, or use 'any' for flexibility
};

const ProjectCard = ({ project }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="border rounded-sm px-5 py-2">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <p className="text-xl font-sans">{project.project_name}</p>
        <p className="text-gray-600">{project.description}</p>
      </div>

      {open && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {project.docs?.map((doc: any, i: any) => {
            return <DocCard key={i} doc={doc} />;
          })}
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
