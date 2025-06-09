import '../styles/globals.css';
import Header from '../components/Header';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import Head from "next/head";

export default function MyApp({ Component, pageProps }) {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const userPhone = localStorage.getItem('user_phone');
    if (userPhone) {
      supabase
        .from('carts')
        .select('*', { count: 'exact', head: true })
        .eq('user_phone', userPhone)
        .then(({ count }) => {
          setCartCount(count || 0);
        });
    }
  }, []);

  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/logo.png" />
      </Head>
      <Header cartCount={cartCount} />
      <Component {...pageProps} />
    </>
  );
}
