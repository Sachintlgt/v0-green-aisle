import { Label } from "@/components/ui/label";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Input } from "./ui/input";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";

const DropZoneCard = ({
  setFiles,
}: {
  setFiles: Dispatch<SetStateAction<FileWithPath[]>>;
}) => {
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
  });
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <div className="my-4 space-y-2">
      <Label htmlFor="media" className="text-sm font-medium text-gray-700">
        Please add a picture or video as proof of tent
        <span className="block text-xs text-gray-500 mt-1">
          {" "}
          This is Optional, you can add it later.
        </span>
        <span className="block text-xs text-gray-500 mt-1">
          ( Note: your venue will be listed as tented once you share the
          picture.)
        </span>
      </Label>

      <section className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
         {" "}
        <div
          {...getRootProps({
            className:
              "flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6 cursor-pointer hover:border-primary transition-colors",
          })}
        >
          <Input
            id="media"
            type="file"
            accept="image/*,video/*"
            {...getInputProps()}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-primary file:text-white hover:file:bg-primary/90"
          />
              <input />
             {" "}
          <p className="text-gray-600 text-sm text-center">
                  Drag & drop some files here, or click to select files    {" "}
          </p>
           {" "}
        </div>
          {/* // Can set file view for the future refrence */}
        <aside className="mt-4">
              <h4 className="text-md font-semibold mb-2">Files</h4>
             {" "}
          <ul className="list-disc list-inside text-sm text-gray-700">
            {files}
          </ul>
           {" "}
        </aside>
      </section>
    </div>
  );
};

export default DropZoneCard;
