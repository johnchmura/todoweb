import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import CanvasApp from '@/components/TodoList'
import UserCalendar from '@/components/UserCalendar'
export default function Home() {
  return (
    <main>
      <CanvasApp/>
    </main>
  )
}
