import "../styles/globals.css";
import "sanitize.css";
import globalStyles from "styles/globalStyles";

import type { AppType } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Global } from "@emotion/react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";

const MyApp: AppType<{ session: Session | null; dehydratedState: unknown }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Global styles={globalStyles} />
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default MyApp;
