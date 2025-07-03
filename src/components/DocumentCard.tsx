import { Folder } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
  doc?: any; // Define the type of doc if known, or use 'any' for flexibility
};

const DocumentCard = ({ doc }: Props) => {
  return (
    <Link to={`/${doc.project_slug}/${doc.id}`} className="block">
      <div className="w-full px-3 py-2 border rounded shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer">
        <p className="text-base font-semibold flex items-center gap-2">
          <Folder size={18} />
          {doc.title || doc.file_path?.split("/").pop() || "Untitled Document"}
        </p>
        <p className="text-xs text-gray-400 truncate">{doc.file_path}</p>
      </div>
    </Link>
  );
};

export default DocumentCard;
