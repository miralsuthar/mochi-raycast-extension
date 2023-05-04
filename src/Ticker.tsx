import { List, ActionPanel, Action, useNavigation, Toast } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import { useState } from "react";
import { TickerDetail } from "./TickerDetail";
import { Coin } from "./types";
import { Dropdown } from "./components/Dropdown";

type TickerDataType = {
  data: Coin[];
};

export default function Command() {
  const [query, setQuery] = useState<string>("");
  const [interval, setInterval] = useState<number | null>(null);
  const { isLoading, data, error } = useFetch<TickerDataType>(
    `https://api.mochi.pod.town/api/v1/defi/coins?query=${query}`,
    {
      execute: query.length > 0,
    }
  );

  const dropdown = [
    { title: "30 Days", value: 30 },
    { title: " 7 Days", value: 7 },
    { title: " 90 Days", value: 90 },
    { title: " 1 year", value: 365 },
    { title: " 1 Day", value: 1 },
  ];

  return (
    <List
      searchBarAccessory={<Dropdown setState={(value) => setInterval(parseInt(value))} dropDownValues={dropdown} />}
      onSearchTextChange={setQuery}
      isLoading={isLoading}
    >
      {data &&
        data?.data?.map((coin: Coin) => {
          return (
            <List.Item
              actions={<Actions interval={interval!} id={coin.id} />}
              key={coin.id}
              icon="list-icon.png"
              title={coin.name}
            />
          );
        })}
    </List>
  );
}

function Actions({ id, interval }: { id: string; interval: number }) {
  const { push } = useNavigation();
  return (
    <ActionPanel title="More Info">
      <Action title="More Info" onAction={() => push(<TickerDetail interval={interval} id={id} />)} />
    </ActionPanel>
  );
}
