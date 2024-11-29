import type { Optional } from "Optional";

export type Notification = {
  id: string;
  message: string;
  severity: "success" | "info" | "warn" | "error" | "secondary" | "contrast";
  sticky: boolean;
};

export type NotificationCreate = Optional<Notification, "id">;
