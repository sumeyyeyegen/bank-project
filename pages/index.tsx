import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'

export default function Home() {

  const router = useRouter();

  return (
    <div className={styles.container}>
    </div>
  )
}
