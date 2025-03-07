import { MdFileUpload } from "react-icons/md";

export default function InputFiles() {
  return (
    <article className="min-w-1/5 bg-zinc-800 rounded-lg shadow-lg px-8 py-6 shadow-zinc-700/50 mx-auto">
      <div className="space-y-4">
        <h2 className="text-center text-2xl text-white border-b border-zinc-700 pb-2">
          Insira o arquivo
        </h2>
        <p className="text-zinc-300 text-sm">
          Para começar, preciso que você insira o arquivo, no qual, irá
          converter, e assim poderá baixar o arquivo convertido.
        </p>
      </div>
      <div className="mt-6">
        <label
          htmlFor="file-uploud"
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-zinc-600 rounded-lg cursor-pointer bg-zinc-700/30 hover:bg-zinc-700/50 transition-colors duration-300 ease-in-out"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <MdFileUpload
            className="w-8 h-8 mb-3 text-zinc-400"
           
          />
          <p className="mb-2 text-sm text-zinc-400
          ">Clique aqui para selecionar ou arraste um arquivo</p>
          <p className="text-xs text-zinc-500">Formatos suportados:...</p>
          </div>
        </label>
      </div>
      <button type="button" className="w-full mt-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-300 ease-in-out">Converter arquivo</button>
    </article>
  );
}
