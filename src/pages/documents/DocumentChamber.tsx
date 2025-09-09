// src/pages/documents/DocumentChamber.tsx
import React, { useState } from "react";
import { Button } from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { ArrowBigLeft } from "lucide-react";

interface DocFile {
  id: number;
  name: string;
  type: string;
  size: string;
  url: string;
}

export const DocumentChamber: React.FC = () => {

  const [documents, setDocuments] = useState<DocFile[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<DocFile | null>(null);

  const navigate = useNavigate()

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newDocs = Array.from(files).map((file, idx) => ({
      id: documents.length + idx + 1,
      name: file.name,
      type: file.type || "Unknown",
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      url: URL.createObjectURL(file), // preview ke liye
    }));

    setDocuments([...documents, ...newDocs]);
  };

  const handleDelete = (id: number) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    if (selectedDoc?.id === id) {
      setSelectedDoc(null);
    }
  };
  const backHandle  = ( )=>{
    navigate('/documents')
  }

  return (
    <>
    <button 
    onClick={backHandle}>
        <ArrowBigLeft/>
    </button>
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

      
      {/* Left Side */}
      <div className="space-y-4">
        {/* Upload Box */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 cursor-pointer">
          <input
            type="file"
            multiple
            className="hidden"
            id="file-upload"
            onChange={handleFileUpload}
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex flex-col items-center"
          >
            <svg
              className="w-10 h-10 text-gray-400 mb-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12"
              />
            </svg>
            <p className="text-gray-600">
              Drag & drop files here, or{" "}
              <span className="text-blue-600">click to select files</span>
            </p>
            <p className="text-xs text-gray-500">
              Supported: pdf, doc, docx, txt, jpg, png (Max 5 files)
            </p>
          </label>
        </div>

        {/* Your Documents */}
        <div className="border rounded-lg p-4 bg-white">
          <h3 className="font-semibold mb-2">Your Documents</h3>
          {documents.length === 0 ? (
            <p className="text-sm text-gray-500">No documents uploaded yet</p>
          ) : (
            <ul className="space-y-2">
              {documents.map((doc) => (
                <li
                  key={doc.id}
                  onClick={() => setSelectedDoc(doc)}
                  className={`p-2 rounded cursor-pointer text-sm flex justify-between items-center ${
                    selectedDoc?.id === doc.id
                      ? "bg-blue-100 text-blue-700"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <span>{doc.name}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(doc.id);
                    }}
                    className="text-red-500 hover:text-red-700 text-xs"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Right Side */}
      <div className="md:col-span-2 border rounded-lg bg-white p-6 flex items-center justify-center text-center">
        {selectedDoc ? (
          <div>
            <h2 className="text-xl font-semibold mb-2">{selectedDoc.name}</h2>
            <p className="text-gray-600">Type: {selectedDoc.type || "Unknown"}</p>
            <p className="text-gray-600 mb-4">Size: {selectedDoc.size}</p>

            {/* Image preview if image */}
            {selectedDoc.type.startsWith("image/") ? (
              <img
                src={selectedDoc.url}
                alt={selectedDoc.name}
                className="max-h-64 mx-auto rounded shadow"
              />
            ) : (
              <p className="text-gray-500">Preview not available</p>
            )}
          </div>
        ) : (
          <div>
            <svg
              className="w-12 h-12 mx-auto text-gray-400 mb-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 20h9M12 4v16m0-16L3 12h9"
              />
            </svg>
            <p className="text-gray-600 font-medium">No Document Selected</p>
            <p className="text-sm text-gray-500">
              Upload a document or select one from the list to view and manage it
              here.
            </p>
          </div>
        )}
      </div>
    </div>
    </>
  );
};
