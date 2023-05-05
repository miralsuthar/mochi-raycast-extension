import { Detail, getPreferenceValues, PreferenceValues, List } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import { WatchListType } from "./types";
import { getChartColorConfig } from "./util";
import { ChartConfiguration } from "chart.js";
import { TagList } from "./components/Tags";

export default function WatchList() {
  const preferences = getPreferenceValues<PreferenceValues>();

  const { data, isLoading, error } = useFetch<WatchListType>(
    `https://api.mochi.pod.town/api/v1/defi/watchlist?user_id=${preferences?.DiscordId}`
  );
  return (
    <List isShowingDetail isLoading={isLoading}>
      {data &&
        data?.data?.data?.map((coin) => {
          const { borderColor } = getChartColorConfig(coin.id);

          const chartConfig: ChartConfiguration = {
            type: "sparkline",
            data: {
              datasets: [
                {
                  fill: false,
                  borderColor: `${borderColor}`,
                  data: coin.sparkline_in_7d.price as number[],
                  lineTension: 0.4,
                },
              ],
            },
          };

          const url = `https://quickchart.io/chart?bkg=rgba(13,16,24,0.5)&w=200&h=75&c=${JSON.stringify(chartConfig)}`;

          return (
            <List.Item
              detail={
                <List.Item.Detail
                  markdown={`![Hello World](${url})`}
                  metadata={
                    <List.Item.Detail.Metadata>
                      <List.Item.Detail.Metadata.Label title="Symbol" text={coin.symbol.toUpperCase()} />
                      <List.Item.Detail.Metadata.Label
                        title="Current price"
                        text={`$${coin.current_price.toString()}`}
                      />
                      <List.Item.Detail.Metadata.Label title="Market cap rank" text={coin.market_cap_rank.toString()} />
                      <List.Item.Detail.Metadata.Label
                        title="Market cap(USD)"
                        text={`$${coin.market_cap.toString()}`}
                      />
                      <TagList value={coin.price_change_percentage_24h} title="Price change(24h)" />
                    </List.Item.Detail.Metadata>
                  }
                />
              }
              key={coin.id}
              icon="list-icon.png"
              title={coin.name}
            />
          );
        })}
    </List>
  );
}
