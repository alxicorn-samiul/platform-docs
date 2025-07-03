import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

type Props = {};

const SUPABASE = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const DocViewer = ({}: Props) => {
  const { doc_id } = useParams<{ doc_id: string }>();
  const [doc, setDoc] = React.useState<any>(null);

  useEffect(() => {
    const fetchDoc = async () => {
      if (!doc_id) return;

      const { data, error } = await SUPABASE.from("docs")
        .select("*")
        .eq("id", doc_id)
        .single();

      if (error) {
        console.error("Error fetching document:", error);
      } else {
        setDoc(data);
      }
    };

    fetchDoc();
  }, [doc_id]);
  return (
    <div>
      {doc ? (
        <SwaggerUI url={doc.file_path} />
      ) : (
        <p className="text-center text-gray-500">Loading document...</p>
      )}
    </div>
  );
};

export default DocViewer;
