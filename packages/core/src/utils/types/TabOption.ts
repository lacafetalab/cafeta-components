export type TabOption = {
  active?: boolean;
  disabled?: boolean;
  text: string;
  value: any;
};

export type TabOptionWithTag = TabOption & {
  tag?: {
    color?: string;
    text: string;
  };
};
