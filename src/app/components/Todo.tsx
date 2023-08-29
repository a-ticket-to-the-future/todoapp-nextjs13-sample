"use client"

import { deleteTodo, editTodo } from '@/api';
import { Task } from '@/types';
import React, { useEffect, useRef, useState } from 'react'
// import { Interface } from 'readline';


interface  TodoProps {
    task: Task;
}



const Todo = ({task}:TodoProps) => {
    // editボタン押したら自動でフォーカスされるようにする
    const ref = useRef<HTMLInputElement>(null);

    const [isEditing , setIsEditing] = useState(false);

    const [editedTaskTitle , setEditedTaskTitle] = useState(task.text);

    useEffect(() => {
        if(isEditing){
            ref.current?.focus(); //nullの可能性があるので?マークを忘れない 
            // ?:オプショナルチェーンと言う
            // オプショナルチェーンはそこにある時だけフォーカスにアクセスできるようになる
        }

    },[isEditing]); //編集しようとeditボタン押したときに発火



    const handleEdit = async () => {
        //editボタンを押したら編集中にしたいので
        setIsEditing(true);


    };

    const handleSave = async () => {
        //saveボタンを押したときに入力した情報を更新したいので、
        // api.tsのeditTodoを呼び出すためにここに記述する

        await editTodo(task.id,editedTaskTitle);
        // api.tsで記述したeditTodoの()内に従い、id:string,text:newtextを上記のように
        // 昨晩、なぜかうまく行かなかったやつができたぞーーー。（笑）

        //editボタンを押したら編集中にしたいので
        setIsEditing(false);


    };

    const handleDelete  = async () => {
        await deleteTodo(task.id);
    };



  return (
    <li key={task.id}
             className='flex justify-between p-4 bg-white border-l-4 border-blue-500 rounded shadow'
             >
        {isEditing ?  (<input 
                        ref={ref}
                        type="text" 
                        className='mr-2 py-1 px-2 rounded border-gray-400 border'
                        value={editedTaskTitle}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                            setEditedTaskTitle(e.target.value)
                        }
                        />) : (<span>{task.text}</span>)}
        
        <div>
            {isEditing ? (<button className='text-blue-500 mr-3'
                                  onClick={handleSave}
                          >
                            save
                          </button>) : (
                          <button className='text-green-500 mr-3'
                            onClick={handleEdit}
                          >
                            edit
                          </button>
                          )}
            
        <button className='text-red-500 ' onClick={handleDelete}>Delete</button>

        </div>
      </li>
  )
}

export default Todo;
