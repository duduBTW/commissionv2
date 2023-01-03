import "../styles/globals.css";
import "sanitize.css";
import globalStyles from "styles/globalStyles";
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/navigation";
import { useRouter } from "next/router";

import type { AppType } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Global } from "@emotion/react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import Nav from "components/Nav";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";
import { Toaster } from "react-hot-toast";

const MyApp: AppType<{ session: Session | null; dehydratedState: unknown }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();
  const progressRef = useRef<LoadingBarRef>(null);
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && progressRef.current?.continuousStart();
    const handleComplete = (url: string) =>
      url === router.asPath && progressRef.current?.complete();

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("hashChangeStart", handleStart);
      router.events.off("hashChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Global styles={globalStyles} />
          <LoadingBar color="var(--color-primary-d)" ref={progressRef} />
          {(Component as any).layout === false ? <></> : <Nav />}
          <Component {...pageProps} />
          <Toaster />
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default MyApp;
