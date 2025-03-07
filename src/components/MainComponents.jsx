import ImageConverter from "./ConversorComponents/ImageConverter";

export default function MainComponents() {
  return (
    <main className="min-h-[calc(100vh-80px)] py-8 flex gap-5 flex-col min-w-screen ">
      <div className="mx-auto">
        <h1 className="font-bold text-4xl text-center ">Bem-vindo. 👋</h1>
        <p className="text-xl text-center mt-3">
          Este é um conversor de fotos, sendo assim, poderá converter qualquer
          tipo de imagem em outro.
        </p>
      </div>
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
        <ImageConverter />
      </article>
    </main>
  );
}
