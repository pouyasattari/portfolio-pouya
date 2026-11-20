import { Html, Head, Main, NextScript } from "next/document";

import { scrollResetScript } from "@/lib/scroll-reset-script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script dangerouslySetInnerHTML={{ __html: scrollResetScript }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
