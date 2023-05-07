"use client";
import React from "react";
import {
  QueryClientProvider,
  QueryClient,
  QueryCache,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { toast } from "react-toastify";
import Toast from "@/utils/toast";

function Providers({ children }: React.PropsWithChildren) {
  const [client] = React.useState(
    new QueryClient({
      defaultOptions: { queries: { retry: false } },
      queryCache: new QueryCache({
        onError: (error: any, query) => {
          // 🎉 only show error toasts if we already have data in the cache
          // which indicates a failed background update
          return toast.error(`${error.message}`);
        },
      }),
    })
  );

  return (
    <>
      <Toast />
      <QueryClientProvider client={client}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default Providers;
