import { useParams } from "react-router-dom";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import DocumentCard from "../components/DocumentCard";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

type Props = {};

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const ProjectDocs = ({}: Props) => {
  const [docs, setDocs] = useState<any[]>([]);
  const { project_name } = useParams<{ project_name: string }>();
  const [currentDoc, setCurrentDoc] = useState<string | null>(null);

  useState(() => {
    const fetchDocs = async () => {
      const { data, error } = await supabase
        .from("docs")
        .select("*")
        .eq("project_slug", project_name);

      if (error) {
        console.error("Error fetching docs:", error);
      } else {
        setDocs(data || []);
      }
    };

    fetchDocs();
    // @ts-ignore
  }, []);

  const handleDocClick = (filePath: string) => () => {
    setCurrentDoc(filePath);
  };

  return (
    <div className="flex flex-row w-full h-screen">
      {/* Available Documents Column */}
      <div className="flex flex-col w-[16vw] h-screen bg-gray-100 fixed left-0 top-0 z-10 pt-14">
        <p className="p-4 pb-2">{`${docs.length} document files found!`}</p>
        <div className="flex flex-col gap-2 p-4 pt-2 overflow-y-auto flex-1">
          {docs.map((doc) => (
            <div
              onClick={handleDocClick(doc.file_path)}
              className="cursor-pointer"
            >
              <DocumentCard doc={doc} key={doc.id} />
            </div>
          ))}
        </div>
      </div>

      {/* Main Document Viewing Area */}
      <div className="w-[84vw] min-h-screen p-4 bg-white ml-[16vw]">
        {currentDoc ? (
          <SwaggerUI url={currentDoc} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-xl">Select a Document from the menu to view.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDocs;
