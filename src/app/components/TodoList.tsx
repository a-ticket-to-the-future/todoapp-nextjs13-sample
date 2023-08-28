import { Task } from '@/types'
import React from 'react'
import Todo from './Todo';

// type　でも　interface　でもどちらでも良い
interface TodoListProps {
    tasks: Task[];
}


const TodoList = ({tasks} : TodoListProps) => {
  return (
    <ul className='space-y-3 '>

        {tasks.map((task) => (
            <Todo key={task.id} todo = {task}/>
))}

      
      
    </ul>
  )
}

export default TodoList
