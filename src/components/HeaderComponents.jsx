import Link from "next/link";

export default function HeaderComponents() {
  return (
    <header className="bg-zinc-800 py-4 px-6 flex justify-between items-center">
      <h1>
        <Link className="text-2xl font-bold" href={"/"}>
          Conversor
        </Link>
      </h1>
      <nav className="flex items-center space-x-4">
        <ul>
          <li>Home</li>
          <li>
            <Link href="github.com/GuilhermeYm">Contato</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
