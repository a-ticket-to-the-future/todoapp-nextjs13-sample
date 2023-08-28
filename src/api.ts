import { Todo } from "./types";

export const getAllTodos = async (): Promise<Todo[]> => {
// : Promise<Todo[]>  型定義
    const res = await fetch(`http://localhost:3001/tasks`,{cache:"no-store"});
    // {cache:"no-store"}これを指定することによってSSRになる
    // {cache:"force-cache"}これを指定するとSSG
    // 今回扱っているTodoAppの類はタスクが頻繁に更新されるのでSSGは不向き・不適切
    // もしSSG使うなら更新頻度が少ないものが適している。
    // 今回の場合はSSRもしくはCSR（クライアントサイドレンダリング）、ISRが適している。
    // CSR使うならuseEffect(() =>{   },[]);
    // SSRは初回読み込み時が速い。CSRは２回目以降が速くなりやすいかも。。。。
    const todos = res.json();

    return todos;
};