import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
  symbol: string | undefined;
}

function Chart({ coinId, symbol }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: symbol,
              data: data?.map((price) => {
                return {
                  x: price.time_close,
                  y: [price.open, price.high, price.low, price.close],
                };
              }),
            },
          ]}
          options={{
            theme: { mode: "dark" },
            chart: {
              height: 300,
              width: 500,
              toolbar: { show: true },
              background: "transparent",
            },
            grid: { show: true },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            xaxis: {
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              categories: data?.map((price) => price.time_close),
              type: "datetime",
              labels: {
                show: true,
              },
            },
            yaxis: {
              show: false,
              tooltip: {
                enabled: true,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
