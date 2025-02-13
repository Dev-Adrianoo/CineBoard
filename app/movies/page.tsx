"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify"

interface appProps {
  id: number;
  title: string;
}

export default function Movie() {
  const [filmes, setFilmes] = useState<appProps[]>([]);

  useEffect(() => {
    const mylist = localStorage.getItem("@movies");
    setFilmes(mylist ? JSON.parse(mylist) : []);
  }, []);

  const removeButton = (id: number) => {
    const updateList = filmes.filter((filme) => filme.id !== id);
    setFilmes(updateList);
    localStorage.setItem("@movies", JSON.stringify(updateList));
    toast.success("Filme Removido!")
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center min-h-screen flex-grow w-full items-center">
        <h1 className="text-3xl my-4 font-semibold">Meus filmes</h1>
        <hr className="border-black w-80 mb-4" />

        {filmes.length === 0 && <span>Você não tem nenhum filme salvo</span>}

        <table className="w-full max-w-4xl border-collapse border border-gray-300 text-center">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="border border-gray-300 p-3">Título</th>
              <th className="border border-gray-300 p-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filmes.map((filme) => (
              <tr key={filme.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-3 font-semibold text-lg">{filme.title}</td>
                <td className="border border-gray-300 p-3 flex justify-center gap-4">
                  <Link
                    href={`/movies/${filme.id}`}
                    className="bg-slate-700 text-white py-3 px-4 rounded"
                  >
                    Veja Mais
                  </Link>
                  <button
                    onClick={() => removeButton(filme.id)}
                    className="bg-slate-700 text-white py-3 px-4 rounded hover:bg-slate-500 transition-all duration-200"
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
