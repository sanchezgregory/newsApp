import Image from 'next/image'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import PageLayout from '../components/PageLayout'
import { useEffect, useState } from 'react'

export default function Home() {

  const [articles, setArticles] = useState([]);
  const router = useRouter()

  console.log(process.env.NEXT_PUBLIC_ENV_LOCAL_VARIABLE)

  useEffect(()=> {
    fetch('https://newsapi.org/v2/everything?q=tesla&from=2024-04-20&sortBy=publishedAt&apiKey=94086229d36b41028072ffc35a5c712a')
    //fetch(process.env.NEXT_PUBLIC_API_URL+process.env.NEXT_PUBLIC_API_KEY)
    .then(res => res.json())
    .then(data => {
      const {articles} = data
      setArticles(articles)
    })

  }, [])

console.log(articles)

  return (
    <PageLayout>
      
        <h1>My last news app</h1>
        <Link href='/about'> About </Link>
        <hr></hr>

        <div>
          {articles.length === 0 && <p>Loading</p>}
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
