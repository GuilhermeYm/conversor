"use client";

import { useRef, useState } from "react";
import { MdFileUpload } from "react-icons/md";

export default function InputFiles({
  onFileSelect,
  onConvert,
  isConverting = false,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("");
  const inputRef = useRef(null);

  // Setar o nome da pessoa
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      // Colocaremos o nome do arquivo
      setFileName(e.target.files[0].name);
      // Notificar o elemento pai que um arquivo foi selecionado
      if (onFileSelect) onFileSelect(e.target.files[0]);
    }
  };

  // Mudar o estado do isDragging para true
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // Mudar o estado do isDragging para false
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  // Controlar o evento de drop
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    // Verificar se existe algum arquivo
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      // Se existir, devemos atribuir manualmente os arquivos ao input, e colocaremos novamente o nome do arquivo no estado
      inputRef.current.files = e.dataTransfer.files;
      setFileName(e.dataTransfer.files[0].name);

      // Dispare um evento de mudança para que handlers associados ao input sejam acionados
      const event = new Event("change", { bubbles: true });
      inputRef.current.dispatchEvent(event);

      // Notificar o elemento pai que um arquivo foi selecionado
      if (onFileSelect) onFileSelect(e.dataTransfer.files[0]);
    }
  };
  return (
    <>
      <div
        className="mt-6"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <label
          htmlFor="file-upload"
          className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300 ease-in-out ${
            isDragging
              ? " border-blue-500 bg-blue-500/10"
              : fileName
              ? "border-green-500 bg-zinc-700/30"
              : "border-zinc-600 bg-zinc-700/30 hover:bg-zinc-700/50"
          }`}
        >
          {/*Aqui ficará o espaço para o usário inserir o arquivo */}
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <MdFileUpload
              className={`w-8 h-8 mb-3 ${
                fileName ? "text-green-400" : "text-zinc-400"
              }`}
            />

            <div className="text-center">
              {fileName ? (
                <p className="mb-2 text-sm text-green-400">{fileName}</p>
              ) : (
                <p className="mb-2 text-sm text-zinc-400">
                  {isDragging
                    ? "Solte o arquivo aqui"
                    : "Clique aqui para selecionar ou arraste um arquivo"}
                </p>
              )}
            </div>

            <input
              ref={inputRef}
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />

            <p className="text-xs text-zinc-500">Formatos suportados: PNG, WEBP e JPEG</p>
          </div>
        </label>
      </div>
      <button
        className={`w-full mt-4 py-2 text-white font-medium rounded-md transition-colors duration-300 ease-in-out ${
          fileName && !isConverting
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-600 cursor-not-allowed"
        }`}
        disabled={!fileName || isConverting}
        onClick={onConvert}
      >
        {fileName ? "Converter arquivo" : "Aguardando arquivo"}
      </button>
    </>
  );
}
