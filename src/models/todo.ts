export interface Todo {
  id: number;
  text: string;
  status: 'active' | 'completed';
  order: number;
}
