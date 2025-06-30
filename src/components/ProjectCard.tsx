import { Link } from "react-router-dom";

type Props = {
  project?: any; // Define the type of project if known, or use 'any' for flexibility
};

const ProjectCard = ({ project }: Props) => {
  return (
    <Link
      to={`${project.slug}`}
      className="border p-4 rounded shadow hover:shadow-lg transition-shadow duration-200 min-w-[500px] w-full"
    >
      <p className="text-xl font-sans">{project.project_name}</p>
      <p className="text-gray-600">{project.description}</p>
    </Link>
  );
};

export default ProjectCard;
