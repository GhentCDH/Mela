export type TableAction = {
  label: string;
  action: <T>(data: T) => void;
};
