import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";

let connection: HubConnection | null = null;

export const startNotificationHub = async (
  onMessage: (message: NotificationMessage) => void
) => {
  connection = new HubConnectionBuilder()
    .withUrl(`${import.meta.env.VITE_NOTI_HUB}`, {
      withCredentials: true, 
    })
    .withAutomaticReconnect()
    .build();

  connection.on("ReceiveMessage", onMessage);

  try {
    await connection.start();
  } catch (err) {
    console.error("SignalR connection error:", err);
  }
};

export const stopNotificationHub = async () => {
  if (connection) {
    await connection.stop();
    console.log("SignalR disconnected");
    connection = null;
  }
};

export interface NotificationMessage {
  subject: string;
  content: string;
}