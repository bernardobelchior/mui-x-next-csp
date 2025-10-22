import * as React from "react";
import { headers } from "next/headers";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ key: "mui", prepend: true, nonce }}>
          {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
