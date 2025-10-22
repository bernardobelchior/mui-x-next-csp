import * as React from "react";
import { headers } from "next/headers";
import { Content } from "@/app/components/Content";

export default async function ExportChartToolbar() {
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return <Content nonce={nonce} />;
}
