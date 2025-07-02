import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import DocumentCard from "../components/DocumentCard";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

type categories = {
  [key: string]: docs[];
};

type docs = {
  id: number;
  project_slug: string;
  file_path: string;
  category: string;
  created_at: string;
  updated_at: string;
};

type Props = {};

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const ProjectDocs = ({}: Props) => {
  const [docs, setDocs] = useState<docs[]>([]);
  const { project_name } = useParams<{ project_name: string }>();
  const [currentDoc, setCurrentDoc] = useState<string | null>(null);
  const [categories, setCategories] = useState<categories | null>(null);

  useEffect(() => {
    const fetchDocs = async () => {
      const { data, error } = await supabase
        .from("docs")
        .select("*")
        .eq("project_slug", project_name);

      if (error) {
        console.error("Error fetching docs:", error);
      } else {
        setDocs(data || []);
        // Set the first document as the current document if available
        if (data && data.length > 0) {
          setCurrentDoc(data[0].file_path);
        }
        // Categorize documents
        const categorizedDocs: categories = {};
        data?.forEach((doc) => {
          if (!categorizedDocs[doc.category]) {
            categorizedDocs[doc.category] = [];
          }
          categorizedDocs[doc.category].push(doc);
        });
        setCategories(categorizedDocs);
      }
    };

    fetchDocs();
  }, [project_name]);

  const handleDocClick = (filePath: string) => () => {
    setCurrentDoc(filePath);
  };

  console.log(Object.keys(categories || {}));

  return (
    <div className="flex flex-row w-full h-screen">
      {/* Available Documents Column */}
      <div className="flex flex-col w-[16vw] h-screen bg-gray-100 fixed left-0 top-0 z-10 pt-14">
        <p className="p-4 pb-2">{`${docs.length} document files found!`}</p>
        <div className="overflow-y-auto flex-1">
          {categories &&
            Object.keys(categories).map((categoryName) => (
              <div key={categoryName} className="p-4">
                <h2 className="text-lg font-semibold mb-2 text-gray-800 border-b border-gray-300 pb-1">
                  {categoryName}
                </h2>
                <div className="space-y-2">
                  {categories[categoryName].map((doc: docs) => (
                    <DocumentCard
                      key={doc.id}
                      doc={doc}
                      onClick={handleDocClick(doc.file_path)}
                    />
                  ))}
                </div>
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
