import Image from 'next/image'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import PageLayout from '../components/PageLayout'
import { useEffect, useState } from 'react'

export default function Home({articles}) {

  return (
    <PageLayout>

        <div>
          {articles.length === 0 && <p>no hay articulos</p>}
          {articles.length > 0 && articles.map((article,i) => (
            <article key={i}>
                <div> 
                  <img alt={`Image for the article ${article.title}`} src={article.urlToImage} />
                  <h2>{article.title}</h2>
                  <p>{article.description}</p>
                </div>
            </article>
          ))}
        </div>

      
    </PageLayout>
  )
}

// Solo se ejecuta 1 vez en built time o al refrescar la pagina
export async function getStaticProps() {
  const response = await fetch('https://newsapi.org/v2/everything?q=tesla&from=2024-04-20&sortBy=publishedAt&apiKey=94086229d36b41028072ffc35a5c712a')
  const {articles} = await response.json()
  return {
    props: {
      articles
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