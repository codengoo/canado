export enum ENoteState {
  ON_GOING = 'ON_GOING',
  COMPLETED = 'COMPLETED',
}

export interface INote {
  content: string;
  id: string;
  title: string;
  state: ENoteState;
  updateAt: string;
  createdAt: string;
}

export interface IResponseData<T = any> {
  message: string;
  data?: T;
  error?: string[];
}
