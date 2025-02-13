"use client"

import Link from "next/link"


export default function NotFound(){
  return(
    <div className="flex flex-col h-screen w-full" style={{height: "calc(100vh - 9rem)"}}>

    <div className="flex flex-col h-full justify-center items-center">
    <h1 className="text-5xl">404</h1>
    <h1 className="text-2xl">Página não Encontrada!</h1>
    <hr className="border-black w-40" />
    <Link href="/"
    className="bg-slate-900 text-xl text-white font-bold pr-6 pl-6 p-4 rounded mt-3">Menu
    </Link>

    </div>
    </div>
  )
}