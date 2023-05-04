export type Coin = {
  id: string;
  symbol: string;
  name: string;
};

export type TickerDetailType = {
  data: {
    base_coin: {
      id: string;
      name: string;
      market_cap_rank: number;
      image: {
        [key: string]: string;
      };
      market_data: {
        current_price: {
          [key: string]: number;
        };
        price_change_percentage_1h_in_currency: {
          [key: string]: number;
        };
        price_change_percentage_24h_in_currency: {
          [key: string]: number;
        };
        price_change_percentage_7d_in_currency: {
          [key: string]: number;
        };
      };
      description: string;
    };
    ratios: number[];
    times: number[];
    from: string;
    to: string;
  };
};

type WatchListCoinType = {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  image: string;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  sparkline_in_7d: {
    price: number[];
  };
};

export type WatchListType = {
  data: {
    data: WatchListCoinType[];
  };
};
