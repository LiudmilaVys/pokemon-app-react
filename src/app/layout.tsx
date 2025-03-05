import './layout.css';

import { ReactNode } from 'react';

export default function IndexLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link
          rel="icon"
          type="image/svg+xml"
          href="/assets/pokemonBall.png"
          sizes="32x32"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Pokemon App</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
