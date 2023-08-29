import Image from 'next/image'
import AddTask from './components/AddTask'
import TodoList from './components/TodoList'
import { getAllTodos, } from '@/api'

export default async function Home() {

  const tasks = await getAllTodos();
// console.log(todos); "use client"を最上部につけるとブラウザのconsoleでも取得したデータが
// 見られるが、今回の"use client"なしの場合はターミナルにのみ出力される
// 取得できているのが確認できたので、<TodoList />に渡してあげる
  return (
    <main className='flex flex-col items-center justify-center min-h-screen py-2 bg-gray-200'>
      <h1 className='text-4lx font-bold text-gray-700'>Nextjs 13 Todo App</h1>
      <div className='w-full max-w-xl mt-5'>
        <div className='w-fll px-8 py-6 bg-white shadow-md rounded-lg'>
          <AddTask />
          <TodoList tasks={tasks} />  
          {/* 左辺のtodosにエラーが出る　typeerrorである */}
        </div>
      </div>
    </main>
  )
}
