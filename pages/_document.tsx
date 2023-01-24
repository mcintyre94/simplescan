import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <script src="https://beamanalytics.io/beam.min.js" data-token="fb33585e-24a2-4769-ade4-f81b34abab12" async></script>
      </Head>
      <body className='bg-slate-900'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}