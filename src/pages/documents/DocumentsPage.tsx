// src/pages/documents/DocumentsPage.tsx
import React, { useState, useEffect } from "react";
import { Upload, Folder, Download, Trash2, Share2 } from "lucide-react";
import { NavLink } from "react-router-dom";

type DocumentType = {
  id: number;
  name: string;
  type: string;
  size: string;
  modified: string;
};

export const DocumentsPage: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentType[]>([]);
  const [newDoc, setNewDoc] = useState({
    name: "",
    type: "",
    size: "",
  });

  // Load documents from localStorage on mount
  useEffect(() => {
    const savedDocs = localStorage.getItem("documents");
    if (savedDocs) {
      setDocuments(JSON.parse(savedDocs));
    }
  }, []);

  // Save documents to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("documents", JSON.stringify(documents));
  }, [documents]);

  // Handle form submit
  const handleAddDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDoc.name || !newDoc.type) return;

    const doc: DocumentType = {
      id: Date.now(),
      name: newDoc.name,
      type: newDoc.type,
      size: newDoc.size || "Unknown",
      modified: new Date().toLocaleDateString(),
    };

    setDocuments([...documents, doc]);
    setNewDoc({ name: "", type: "", size: "" });
  };

  // Delete document
  const handleDelete = (id: number) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
  };

  // Fake download
  const handleDownload = (doc: DocumentType) => {
    alert(`Downloading ${doc.name}...`);
  };

  // Fake share
  const handleShare = (doc: DocumentType) => {
    alert(`Sharing ${doc.name}...`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
        <h1 className="text-2xl font-bold">Documents</h1>
        <p className="text-gray-600">Manage your startup's important files.</p>
      </div>

<NavLink to="/documents/upload"> <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"> <Folder size={18} /> Document Chamber </button> </NavLink>
      </div>
      {/* Add Document Form */}
      <form
        onSubmit={handleAddDocument}
        className="bg-gray-100 p-4 rounded-lg space-y-3"
      >
        <h2 className="text-lg font-semibold">Add New Document</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="Document Name"
            className="p-2 border rounded-lg"
            value={newDoc.name}
            onChange={(e) => setNewDoc({ ...newDoc, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Type (PDF, Word, Excel)"
            className="p-2 border rounded-lg"
            value={newDoc.type}
            onChange={(e) => setNewDoc({ ...newDoc, type: e.target.value })}
          />
          <input
            type="text"
            placeholder="Size (e.g., 2.5 MB)"
            className="p-2 border rounded-lg"
            value={newDoc.size}
            onChange={(e) => setNewDoc({ ...newDoc, size: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Upload size={18} className="inline-block mr-2" />
          Add Document
        </button>
      </form>

      {/* Quick Access */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Quick Access</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Recent Files", "Shared with Me", "Starred", "Trash"].map((item) => (
            <div
              key={item}
              className="p-4 border rounded-lg text-center hover:bg-gray-50 cursor-pointer"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Documents Table */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">All Documents</h2>
          <button className="px-3 py-1 border rounded-lg text-sm">
            Sort / Filter
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-sm">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Size</th>
                <th className="p-2 border">Modified</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-gray-500">
                    No documents available
                  </td>
                </tr>
              ) : (
                documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50 text-sm">
                    <td className="p-2 border">{doc.name}</td>
                    <td className="p-2 border">{doc.type}</td>
                    <td className="p-2 border">{doc.size}</td>
                    <td className="p-2 border">{doc.modified}</td>
                    <td className="p-2 border flex gap-2">
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => handleShare(doc)}
                      >
                        <Share2 size={16} />
                      </button>
                      <button
                        className="text-green-600 hover:text-green-800"
                        onClick={() => handleDownload(doc)}
                      >
                        <Download size={16} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(doc.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
