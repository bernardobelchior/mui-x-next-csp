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
      `script-src 'self' 'nonce-${nonce}'`,
      `style-src-elem 'self' 'nonce-${nonce}'`,
      `img-src 'self' data: blob:`,
    ].join("; "),
  );
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
