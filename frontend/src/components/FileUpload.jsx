import React, { useState } from "react";

const FileUpload = ({ onFileSelect }) => {
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      onFileSelect(file);

      // Preview for images
      if (file.type.startsWith("image/")) {
        setPreview(URL.createObjectURL(file));
      } else {
        setPreview("pdf");
      }
    }
  };

  return (
    <div className="space-y-2">
      <label className="block font-medium">Upload Receipt</label>

      <input
        type="file"
        accept="image/*,application/pdf"
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      {/* Preview */}
      {preview && (
        <div className="mt-2">
          {preview === "pdf" ? (
            <p className="text-sm text-gray-500">PDF Uploaded</p>
          ) : (
            <img
              src={preview}
              alt="preview"
              className="w-32 h-32 object-cover rounded"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;