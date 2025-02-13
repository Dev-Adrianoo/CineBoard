import Link from "next/link"

export function Header(){
  return(
    <header className="bg-slate-800 h-20 text-white flex flex-row justify-between sm:justify-around items-center shadow-xl">
      <Link href="/">
        <h1 className="text-2xl p-2 cursor-pointer ml-4 sm:text-3xl hover:scale-110 transition-all duration-200">CineBoard</h1>
      </Link>
      <Link href='/movies' className="text-xl border p-2 pr-3 pl-3 mr-4 rounded hover:bg-slate-700 hover:scale-110 transition-all duration-200">Meus Filmes</Link>
    </header>
  )
}