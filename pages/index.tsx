import React from 'react';
import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>ALX Listing App</title>
        <meta name="description" content="ALX Listing Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to ALX Listing App</h1>
      </main>
    </div>
  );
}
