"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import api from "@/app/services/api"
import Image from "next/image"
import { toast } from "react-toastify"

interface appMovies {
  id: number
  page: number
  title: string
  poster_path: string
  overview?: string 
  popularity: number
  backdrop_path: string
  vote_average: number
}

interface moviesProps {
  id: number
  page: number
  title: string
  poster_path: string
  overview?: string
  popularity: number
  backdrop_path: string
  vote_average: number
}

export default function MyFilms(){
  const router = useRouter();
  const { id } = useParams();
  const [filme, setFilme] = useState<appMovies | null>(null)
  const [loading, setLoading] = useState(true)


  useEffect(()=> {
    async function loadDetailsFilm(){
      await api.get(`/movie/${id}`, {
        params: {
          api_key: "db2b85382ac2e50df373d2719d989b47",
          language: "pt-BR",
        }
      })
      .then((response) => {
        setFilme(response.data)
        console.log(response.data)
        setLoading(false)
      })
      .catch(()=> {
        router.push("/")
      })
    }

    loadDetailsFilm()

    return () => {
      console.log("Componente desmontado")
    }
  }, [id,router])
  

  const savefilm = () => {

    if(!filme) {
     toast.warn("Esse filme não existe!")
      return;
    }

   const mylist =  localStorage.getItem("@movies");

    const savedFilms: moviesProps[] = mylist ? JSON.parse(mylist): [];

    const hasfilmes: boolean = savedFilms.some( (savedFilms) => savedFilms.id == filme?.id)

    if(hasfilmes){
      toast.warning("Filme já está salvo!")
      return;
    }

    savedFilms.push(filme);
    localStorage.setItem("@movies", JSON.stringify(savedFilms));
    toast.success("Filme salvo com sucesso")
  }


  if(loading){
    return(
      <div className="text-2xl h-screen flex flex-col justify-center items-center" style={{height: "calc(100vh - 9rem)"}}>
        <h1 className="text-4xl">Carregando...</h1>
      </div>
    )
  }

  return(
    <div className="flex flex-col justify-center items-center text-2xl min-h-full flex-grow">
      <div className="w-full flex h-full flex-col justify-center items-center min-h-full flex-grow">
      <div className="flex flex-col justify-center items-center w-full h-full min-h-screen relative flex-grow">
        <article className="flex flex-col justify-center items-center text-justify px-5 w-full" 
        key={filme?.id} style={{height: "calc (100vh - 9rem}"}}>
          <h1 className="text-3xl font-bold pt-4 sm:text-3xl md:text-3xl">{filme?.title}</h1>
          <Image
          src={`https://image.tmdb.org/t/p/original/${filme?.backdrop_path}`}
          height={100}
          width={200}
          alt={`Imagem do filme ${filme?.title}`}
          className="w-full object-cover rounded m-auto py-1 sm:w-[600px] md:w-[700px] lg:w-[700px]">
          </Image>
          <h3 className="font-bold text-3xl">Avaliação: {filme?.vote_average}/10</h3>
          <hr className="border-black w-96" />
          <h3 className="font-bold text-3xl">Sinopse</h3>
          <span className="sm:text-2xl sm:w-[600px] md:text-2xl md:w-[700px] lg:w-[900px] lg:text-2xl pb-6">{filme?.overview}</span>
          <div className="flex flex-row justify-between items-center w-[250px] pb-6">
            <button onClick={savefilm} 
            className="bg-slate-700 text-white py-2 px-4 mb-3 rounded hover:bg-slate-500 hover:scale-110 transition-all duration-200">Salvar</button>
            <a href={`https://youtube.com/results?search_query=${filme?.title}`}
             target="blank" 
             rel="external" 
             className="bg-slate-700 text-white py-2 px-4 mb-3 rounded hover:bg-slate-500 hover:scale-110 transition-all duration-200">Trailer
             </a>
          </div>
        </article>
      </div>
      </div>
    </div>
  )
}
  