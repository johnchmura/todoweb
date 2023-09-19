import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import CanvasApp from '@/components/TodoList'
export default function Home() {
  return (
    <main>
      <Navbar />
      <CanvasApp/>
    </main>
  )
}
