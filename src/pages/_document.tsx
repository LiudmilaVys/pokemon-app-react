import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <link
          rel="icon"
          type="image/svg+xml"
          href="/assets/pokemonBall.png"
          sizes="32x32"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Pokemon App</title>
      </Head>
      <body>
        <Main /> {/* Next.js injects page content here */}
        <NextScript /> {/* Next.js scripts */}
      </body>
    </Html>
  );
}
