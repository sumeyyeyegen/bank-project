/* eslint-disable @next/next/no-css-tags */
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { AppProps } from 'next/app'
import '../styles/globals.css'
import { Audio } from 'react-loader-spinner';
import Head from 'next/head';
import Login from './account/login';
import Layout from '../components/Layout';
import RouteGuard from '../components/RouteGuard';
import Nav from '../components/Nav';


export default function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter()

  // useEffect(() => {

  //   const handleRouteChange = (url: string, shallow: Boolean) => {

  //     return <Audio
  //       height="1000"
  //       width="1000"
  //       color="green"
  //       ariaLabel="loading"
  //       wrapperStyle={{}}
  //       wrapperClass="blocks-wrapper"
  //       visible={true}
  //     />
  //   }


  //   const handleRouteComplete = (url: string, shallow: Boolean) => {
  //     return <Audio
  //       height="1000"
  //       width="1000"
  //       color="green"
  //       ariaLabel="loading"
  //       wrapperStyle={{}}
  //       wrapperClass="blocks-wrapper"
  //       visible={true}
  //     />
  //   }


  //   router.events.on('routeChangeStart', handleRouteChange)
  //   router.events.on('routeChangeComplete', handleRouteComplete)

  //   // from the event with the `off` method:
  //   return () => {
  //     router.events.on('routeChangeStart', handleRouteChange)
  //   }
  // }, [])

  return (
    <div className='main'>
      <Head>
        <title>Bank App</title>
        <link href="//netdna.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet" />
      </Head>

      <div className="app-container bg-light">
        <Nav />
        <div className="container pt-4 pb-4">
          <RouteGuard>
            <Component {...pageProps} />
          </RouteGuard>
        </div>
      </div>
    </div>
  )
}