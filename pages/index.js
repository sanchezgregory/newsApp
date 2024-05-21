import Image from 'next/image'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import PageLayout from '../components/PageLayout'
import { useEffect, useState } from 'react'

export default function Home({topArticles}) {

  const handleImg=(src)=>{
    return src;
  }

  return (
    <PageLayout>

        <div>
          {topArticles.length === 0 && <p>no hay articulos</p>}
          {topArticles.length > 0 && topArticles.map((article,i) => (
            <article key={i}>
                <div> 
                  {article.urlToImage && 
                    <Image 
                      alt={`Image for the article ${article.title}`}
                      loader={({ src, width, quality }) => handleImg(src)}
                      src={handleImg(article.urlToImage)}
                      width={450}
                      height={300}
                      quality={50}
                      priority={i < 2}
                      layout='responsive'
                      />
                  }
                  <h2>{article.title}</h2>
                  <p>{article.description}</p>
                </div>
            </article>
          ))}
        </div>

      
    </PageLayout>
  )
}

// Cuando usar staticProps o serverSideProps
// serverSideProps se debería usar cuando: se quiera prerendizar la pag, 
// y recuperar informacion que se tenga que hacer un fetch en el tiempo de la peticion
// Tiene mucho sentido usar serverSideProps cuando la pagina cambia muchísimo.
// Por ejemplo cuando se usan filtros en una pagina, es imposible calcular todos los filtros posibles
// 
// staticProps cuando hay resultados finitos. Cuando se sabe un numero de elementos a cargar
// con el incrementalStaticGeneration se puede hacer que cada x tiempo, volvemos a generar 
// esta pagina statica


// Solo se ejecuta 1 vez en built time o al refrescar la pagina
export async function getStaticProps() {
  const response = await fetch('https://newsapi.org/v2/everything?q=tesla&from=2024-04-21&sortBy=publishedAt&apiKey=94086229d36b41028072ffc35a5c712a')
  const {articles} = await response.json()
  const topArticles = articles.slice(0,3)
  return {
    props: {
      topArticles
    }
  }
}

// Se ralizan tanto requests como invocaciones a la pag tenga!
// solo se debe usar para datos muy dinamicos.
// export async function getServerSideProps() {
//   const response = await fetch('https://newsapi.org/v2/everything?q=tesla&from=2024-04-20&sortBy=publishedAt&apiKey=94086229d36b41028072ffc35a5c712a')
//   const {articles} = await response.json()
//   return {
//     props: {
//       articles
//     }
//   }
// }