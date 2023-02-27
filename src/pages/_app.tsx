import { useState, useEffect } from 'react';
import '@/styles/globals.css';
import '@/styles/Home.module.css';

import { supabase } from "../lib/helper/supabaseClient";

import type { AppProps } from 'next/app';

import Layout from '@/components/Layout/Layout';

export default function App({
  Component,
  pageProps,
}: AppProps) {

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
