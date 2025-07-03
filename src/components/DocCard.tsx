import { Folder } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
  doc?: any;
};

const DocCard = ({ doc }: Props) => {
  return (
    <Link to={`/${doc.project_slug}/${doc.id}`}>
      <div className="border px-3 py-2 rounded-sm min-h-20">
        <p className="flex gap-2 items-center text-sm font-semibold">
          <Folder size={22} /> {doc.title}
        </p>
        <p className="text-xs">
          Category: <span className="text-gray-500">{doc.category}</span>
        </p>
      </div>
    </Link>
  );
};

export default DocCard;
