import { Task } from "./types";

export const getAllTodos = async (): Promise<Task[]> => {
// : Promise<Todo[]>  型定義
    const res = await fetch(`http://localhost:3001/tasks`,{cache:"no-store"});
    // {cache:"no-store"}これを指定することによってSSRになる
    // {cache:"force-cache"}これを指定するとSSG
    // 今回扱っているTodoAppの類はタスクが頻繁に更新されるのでSSGは不向き・不適切
    // もしSSG使うなら更新頻度が少ないものが適している。
    // 今回の場合はSSRもしくはCSR（クライアントサイドレンダリング）、ISRが適している。
    // CSR使うならuseEffect(() =>{   },[]);
    // SSRは初回読み込み時が速い。CSRは２回目以降が速くなりやすいかも。。。。
    const tasks = res.json();

    return tasks;
};


export const addTodo = async (todo:Task): Promise<Task> => {
    
        const res = await fetch(`http://localhost:3001/tasks`,{
            method: "POST",
            headers:{
                "Content-type": "application/json",
            },
            body:JSON.stringify(todo),
        });
        
        const newTodo = res.json();
    
        return newTodo;
    };