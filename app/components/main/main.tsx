"use client"

import { useEffect, useState } from "react"
import api  from "@/app/services/api"
import Link from "next/link"
import Image from "next/image"

interface appMovies {
  id: number
  page: number
  title: string
  poster_path: string
  popularity: number
}

export function HomePage(){
  
  const [filmes, setFilmes] = useState<appMovies[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  
  useEffect(()=>{
    async function loadMovies(){
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "db2b85382ac2e50df373d2719d989b47", 
          language: "pt-BR",
          page: 1,
        }
      })
      
      setFilmes(response.data.results.slice(0,16))
      console.log(response.data)
    }

    loadMovies()
    setLoading(false)
  }, [])
  
  if(loading){
    return(
      <div className="text-2xl h-screen flex flex-col justify-center items-center" style={{height: "calc(100vh - 9rem)"}}>
        <h1 className="text-4xl">Carregando...</h1>
      </div>
    )
  }
    return(
      <main className="w-full flex flex-col items-center justify-center">
        <div className="flex flex-col justify-center items-center  h-full lg:grid lg:grid-cols-2 lg:gap-6 lg:items-stretch lg-justify-items-center xl:grid-cols-4 xl:gap-6 xl:items-stretch">
          {filmes.map((filme) => {
            return(
              <article key={filme.id} 
              className="w-full flex flex-col justify-center items-center">
                <h1 className="text-2xl font-bold p-4 sm:text-4xl lg:text-2xl"> 
                  {filme.title}
                  </h1>
                <Image src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                alt="Logo Filme"
                width={500}
                height={500}
                className="w-80 justify-center block items-center rounded-t-md sm:w-[500px] md:w-[600px] lg:w-[270px] lg:p-0">
                </Image>
                <Link href={`/movies/${filme.id}`}>
                <button className="bg-slate-700 font-bold  text-2xl text-white p-4 pr-6 pl-6 w-80 mb-6 rounded-b-md sm:w-[500px] md:w-[600px] lg:w-[270px]">Acessar</button>
                </Link>
                <hr className="border-slate-900 h-1 w-80 sm:w-[500px] md:w-[700px] lg:hidden mb-3" />
              </article>
            )
          })}
        </div>
      </main>
    )
  }