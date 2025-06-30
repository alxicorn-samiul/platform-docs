import React from "react";

type Props = {
  project?: any; // Define the type of project if known, or use 'any' for flexibility
};

const ProjectCard = ({ project }: Props) => {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition-shadow duration-200 min-w-[500px] w-full">
      <p>{project.project_name}</p>
      <p className="text-gray-600">{project.description}</p>
    </div>
  );
};

export default ProjectCard;
