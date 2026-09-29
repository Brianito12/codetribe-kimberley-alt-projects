export interface LinkItem {
  id: string;
  title: string;
  url: string;
  description: string;
  tags: string[];
  createdAt: number;
  updatedAt: number;
}

export type ToastType = 'success' | 'error' | 'info';
export interface ToastMsg {
  id: string;
  type: ToastType;
  message: string;
}