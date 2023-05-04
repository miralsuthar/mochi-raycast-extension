import { Detail, getPreferenceValues, PreferenceValues, List } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import { WatchListType } from "./types";
import Sparkline from "sparkline-svg";

export default function WatchList() {
  const preferences = getPreferenceValues<PreferenceValues>();
  const { data, isLoading, error } = useFetch<WatchListType>(
    `https://api.mochi.pod.town/api/v1/defi/watchlist?user_id=${preferences?.DiscordId}`
  );
  return (
    <List isShowingDetail isLoading={isLoading}>
      {data &&
        data?.data?.data?.map((coin) => {
          const url = `https://image-charts.com/chart?chco=000000&chd=t:${JSON.stringify(coin.sparkline_in_7d.price)
            .replace("[", "")
            .replace("]", "")}&chs=700x300&cht=ls&chls=10`;
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
                      <List.Item.Detail.Metadata.TagList title="Price change(24h)">
                        <List.Item.Detail.Metadata.TagList.Item
                          text={
                            coin.price_change_percentage_24h > 0
                              ? `+${coin.price_change_percentage_24h}`
                              : `${coin.price_change_percentage_24h}`
                          }
                          color={coin.price_change_percentage_24h > 0 ? "green" : "red"}
                        />
                      </List.Item.Detail.Metadata.TagList>
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
