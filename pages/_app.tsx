/* eslint-disable @next/next/no-css-tags */
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { authService } from '../services';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import RouteGuard from '../components/RouteGuard';
import { Nav } from '../components';
import Head from 'next/head';
import { Provider } from 'react-redux';
import store from '../redux/store'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const [authorized, setAuthorized] = useState(false);


  useEffect(() => {
    if (!authService.userValue) {
      router.push('/account/login');
    }
  }, [])

  function authCheck(url: string) {
    // redirect to login page if accessing a private page and not logged in 
    const publicPaths = ['/account/login'];
    const path = url.split('?')[0];
    if (!authService.userValue && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: '/account/login',
        query: { returnUrl: router.asPath }
      });
    } else {
      setAuthorized(true);
    }
  }


  return <div className='main'>
    <Head>
      <title>Bank App</title>
      <link href="//netdna.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet" />
    </Head>
    <div className="app-container bg-light">
      <Nav />
      <div className="container pt-4 pb-4">
        <RouteGuard>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </RouteGuard>
      </div>
    </div>
  </div>
}
