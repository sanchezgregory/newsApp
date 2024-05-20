import Image from 'next/image'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import PageLayout from '../components/PageLayout'

export default function Home() {

  const router = useRouter()

  return (
    <PageLayout>
      
        <h1>My news app</h1>
        <Link href='/about'> About </Link>
        <div> router.push no se debe usar para linkear paginas, usar solo Link</div>
        <button onClick={()=>router.push('article/2')}>
          Navegar de forma programatica
        </button>
      
    </PageLayout>
  )
}
