// middleware.ts
import { NextResponse } from "next/server";

export function middleware(req: Request) {
  const nonce = crypto.randomUUID();
  const res = NextResponse.next({
    request: { headers: new Headers(req.headers) },
  });
  res.headers.set("x-nonce", nonce);
  res.headers.set(
    "Content-Security-Policy",
    [
      `default-src 'self'`,
      `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
      `style-src-elem 'self' 'nonce-${nonce}'`,
      `style-src-attr 'unsafe-inline'`, // required by MUI
      `connect-src 'self'`,
      `img-src 'self' blob: data:`,
      `font-src 'self'`,
      `object-src 'none'`,
      `base-uri 'self'`,
      `form-action 'self'`,
      `frame-ancestors 'none'`,
      `upgrade-insecure-requests`,
    ].join("; "),
  );
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
