export interface LogModel {
  id: number;
  createdDate: Date;
  category: string;
  eventType: string;
  logLevel: string;
  username: string;
  message: string;
}

export default LogModel;
