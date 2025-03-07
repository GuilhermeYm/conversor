import InputFiles from "./ConversorComponents/InputFiles";

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
        <InputFiles />
    </main>
  );
}
