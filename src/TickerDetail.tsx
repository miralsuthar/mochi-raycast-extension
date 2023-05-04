import { Detail } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import { useEffect, useState } from "react";
import { getChartColorConfig, imageUrlToBase64 } from "./util";
import { TickerDetailType } from "./types";

export const TickerDetail = ({ id, interval }: { id: string; interval: number }) => {
  const [chartBase64, setChartBase64] = useState<string>("");

  const { data, isLoading, error } = useFetch<TickerDetailType>(
    `https://api.mochi.pod.town/api/v1/defi/coins/compare?base=${id}&target=tether&interval=${interval}`
  );

  const { borderColor, gradientFrom } = getChartColorConfig(id);

  console.log("data: ", data);
  const chartConfig = {
    type: "line",
    data: {
      labels: data?.data?.times,
      datasets: [
        {
          pointRadius: 0,
          backgroundColor: gradientFrom,
          borderColor: borderColor,
          data: data?.data?.ratios as number[],
          label: `Price (USD) | ${data?.data.from} - ${data?.data.to}`,
          fill: "origin",
          tension: 0.4,
        },
      ],
    },
    options: {
      scales: {
        yAxes: {
          // not 'yAxes: [{' anymore (not an array anymore)
          ticks: {
            color: "rgba(0,0,0,1)", // not 'fontColor:' anymore
            // fontSize: 18,
            font: {
              size: 18, // 'size' now within object 'font {}'
            },
            stepSize: 1,
          },
        },
        xAxes: {
          // not 'xAxes: [{' anymore (not an array anymore)
          ticks: {
            color: "rgba(0,0,0,1)", // not 'fontColor:' anymore
            //fontSize: 14,
            font: {
              size: 14, // 'size' now within object 'font {}'
            },
            stepSize: 1,
          },
        },
      },
    },
  };

  const url = `https://image-charts.com/chart.js/2.8.0?bkg=rgba(13, 16, 24, 0.5)&c=${JSON.stringify(
    JSON.parse(JSON.stringify(chartConfig))
  )}`;

  useEffect(() => {
    imageUrlToBase64(url).then((res) => res !== null && setChartBase64(res));
  }, [url]);

  const markdown = `
![Hello World](data:image/png;base64,${chartBase64})
`;

  return (
    <Detail
      isLoading={isLoading}
      markdown={markdown}
      metadata={
        <Detail.Metadata>
          {!isLoading && (
            <>
              <Detail.Metadata.Label title="Name" text={data?.data.base_coin.name} />
              <Detail.Metadata.Label title="Market cap rank" text={`${data?.data.base_coin.market_cap_rank}`} />
              <Detail.Metadata.Label
                title="Current price"
                text={`$${data?.data.base_coin.market_data.current_price.usd}`}
              />
              <Detail.Metadata.Label
                title="Change(1h)"
                text={`${data?.data.base_coin.market_data.price_change_percentage_1h_in_currency.usd}`}
              />
              <Detail.Metadata.Label
                title="Change(24h)"
                text={`${data?.data.base_coin.market_data.price_change_percentage_24h_in_currency.usd}`}
              />
              <Detail.Metadata.Label
                title="Change(7d)"
                text={`${data?.data.base_coin.market_data.price_change_percentage_7d_in_currency.usd}`}
              />
            </>
          )}
        </Detail.Metadata>
      }
    />
  );
};
