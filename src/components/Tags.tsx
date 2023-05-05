import { List } from "@raycast/api";

export const TagList = ({ value, title }: { value: number; title: string }) => {
  return (
    <List.Item.Detail.Metadata.TagList title={title}>
      <List.Item.Detail.Metadata.TagList.Item
        text={value > 0 ? `+${value}` : `${value}`}
        color={value > 0 ? "green" : "red"}
      />
    </List.Item.Detail.Metadata.TagList>
  );
};
