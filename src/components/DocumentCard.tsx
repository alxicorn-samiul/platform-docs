import { Folder } from "lucide-react";

type Props = {
  doc?: any; // Define the type of doc if known, or use 'any' for flexibility
  onClick?: () => void;
};

const DocumentCard = ({ doc, onClick }: Props) => {
  return (
    <div
      className="w-full px-3 py-2 border rounded shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
      onClick={onClick}
    >
      <p className="text-base font-semibold flex items-center gap-2">
        <Folder size={18} />
        {doc.title || doc.file_path?.split("/").pop() || "Untitled Document"}
      </p>
      <p className="text-xs text-gray-400 truncate">{doc.file_path}</p>
    </div>
  );
};

export default DocumentCard;
