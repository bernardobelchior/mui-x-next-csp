"use client";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { LineChartPro } from "@mui/x-charts-pro/LineChartPro";
import * as React from "react";
import { inflationData } from "@/app/dataset/inflationRates";

const yAxisFormatter = new Intl.NumberFormat("en-US", {
  style: "percent",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
  maximumSignificantDigits: 1,
});
const percentageFormatter = new Intl.NumberFormat("en-US", {
  style: "percent",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const seriesValueFormatter = (value: number | null) =>
  percentageFormatter.format(value! / 100);

const xAxis = [
  {
    data: inflationData.map((p) => p.year),
    valueFormatter: (value: number) => `${value}`,
    zoom: true,
  },
];

const yAxis = [
  { valueFormatter: (value: number) => yAxisFormatter.format(value / 100) },
];

const series = [
  {
    label: "Germany",
    data: inflationData.map((p) => p.rateDE),
    valueFormatter: seriesValueFormatter,
    showMark: false,
  },
  {
    label: "United Kingdom",
    data: inflationData.map((p) => p.rateUK),
    valueFormatter: seriesValueFormatter,
    showMark: false,
  },
  {
    label: "France",
    data: inflationData.map((p) => p.rateFR),
    valueFormatter: seriesValueFormatter,
    showMark: false,
  },
];

const settings = {
  height: 300,
  xAxis,
  yAxis,
  series,
  grid: { horizontal: true },
};

export function Content({ nonce }: { nonce: string | undefined }) {
  return (
    <Stack width="100%">
      <Typography sx={{ alignSelf: "center", my: 1 }}>
        Inflation rate in France, Germany and the UK, 1960-2024
      </Typography>
      <LineChartPro
        {...settings}
        showToolbar
        slotProps={{
          toolbar: {
            printOptions: { nonce },
            imageExportOptions: [
              { type: "image/png", nonce },
              { type: "image/jpg", nonce },
              { type: "image/webp", nonce },
            ],
          },
        }}
      />
      <Typography variant="caption">Source: World Bank</Typography>
    </Stack>
  );
}
