"use client";
import { useState } from "react";
import InputFiles from "./InputFiles";

export default function ImageConverter() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [convertedImage, setConvertedImage] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [format, setFormat] = useState("png");
  const [quality, setQuality] = useState(0.8);
  const [error, setError] = useState(null);

  const handleFileSelect = (file) => {
    // Verificar se é uma imagem
    if (!file.type.startsWith("image/")) {
      setError("O arquivo selecionado não é uma imagem.");
      return;
    }
    setSelectedFile(file);
    setConvertedImage(null);
    setError(null);
  };

  // Função para converter a imagem
  const convertToFormat = async (file, format, quality) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const img = new Image();

        img.onload = () => {
          //Cria canvas com as dimensões da imagem
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;

          // Desenhar a imagem no canvas
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);

          // Converter a imagem para o formato desejado
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error("Falha ao converter a imagem."));
                return;
              }
              // Cria um objeto URL para a imagem convertida
              const url = URL.createObjectURL(blob);

              resolve({
                url,
                blob,
                width: img.width,
                height: img.height,
                size: blob.size,
              });
            },
            `image/${format}`,
            quality
          );
        };

        img.onerror = () => reject(new Error("Falha ao carregar a imagem."));
        img.src = event.target.result;
      };
      reader.onerror = () => reject(new Error("Falha ao ler o arquivo"));
      reader.readAsDataURL(file);
    });
  };

  const convertImage = async () => {
    // Se o usuário não selecionou um arquivo, exibir um erro.
    if (!selectedFile) {
      setError("Nenhum arquivo selecionado.");
      return;
    }
    setIsConverting(true);
    setError(null);

    try {
      // Converter imagem
      const result = await convertToFormat(selectedFile, format, quality);
      setConvertedImage(result);

      // Iniciar download automático
      const downloadLink = document.createElement("a");
      downloadLink.href = result.url;

      // Nome do arquivo final: nome_original.formato_convertido
      const originalName = selectedFile.name.split(".")[0];
      downloadLink.download = `${originalName}.${format}`;

      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (err) {
      return setError("Erro na conversão do arquivo", err);
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <>
      <InputFiles
        onFileSelect={handleFileSelect}
        onConvert={convertImage}
        isConverting={isConverting}
      />
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-100 border-b border-zinc-300 pb-2">
          Configurações da conversão
        </h2>
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-md mb-4">
            {error}
          </div>
        )}
        <div className="my-2">
          <label className="block text-sm text-zinc-400 mb-1">
            Formatos de saída
          </label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="w-full p-2 bg-zinc-700 text-white rounded borderb border-zinc-600"
          >
            <option value="webp">WEBP</option>
            <option value="png">PNG</option>
            <option value="jpeg">JPEG</option>
          </select>
        </div>
        <div className="my-2">
          <label className="block text-sm text-zinc-400 mb-1">Qualidade</label>
          <input
            type="range"
            min={"0.1"}
            max={1}
            step={"0.1"}
            value={quality}
            onChange={(e) => setQuality(parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="text-right text-xs text-zinc-400">
            {Math.round(quality * 100)}%
          </div>
        </div>
        {convertedImage && (
          <div className="mt-6 bg-zinc-800 p-4 rounded-md">
            <h2 className="text-lg font-medium text-white mb-2">
              Imagem Convertida
            </h2>

            <div className="aspect-auto mb-3 border border-zinc-600 rounded overflow-hidden">
              <img
                src={convertedImage.url}
                alt="Preview da imagem convertida"
                className="w-full h-auto"
              />
            </div>

            <div className="text-sm text-zinc-400">
              <p>
                Dimensões: {convertedImage.width} x {convertedImage.height}px
              </p>
              <p>Tamanho: {(convertedImage.size / 1024).toFixed(2)} KB</p>
              <p>Formato: {format.toUpperCase()}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
