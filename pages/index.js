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
      
        <h1>My last news app</h1>
        <Link href='/about'> About </Link>
        <hr></hr>

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


export async function getServerSideProps() {

  const response = await fetch('https://newsapi.org/v2/everything?q=tesla&from=2024-04-20&sortBy=publishedAt&apiKey=94086229d36b41028072ffc35a5c712a')
  const {articles} = await response.json()
  
  return {
    props: {
      articles
    }
  }
  
}