import { List } from "@raycast/api";

type DropdownValueType = {
  title: string;
  value: number;
};

type DropDownProps = {
  dropDownValues: DropdownValueType[];
  setState: (value: string) => void;
};

export const Dropdown = ({ dropDownValues, setState }: DropDownProps) => {
  return (
    <List.Dropdown tooltip="Select Interval" onChange={setState}>
      <List.Dropdown.Section>
        {dropDownValues.map((value, index) => {
          return <List.Dropdown.Item key={index} value={`${value.value}`} title={value.title} />;
        })}
      </List.Dropdown.Section>
    </List.Dropdown>
  );
};
