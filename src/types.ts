export interface TodoItemType  {
    id: string;
    title: string;
    completed: boolean;
    onClick?:(id:number)=>void

  };
  