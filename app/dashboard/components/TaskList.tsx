'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface Task {
  id: string
  title: string
  status: 'todo' | 'doing' | 'done'
  created_at: string
}

export function TaskList({ initialTasks }: { initialTasks: Task[] }) {
  const [tasks, setTasks] = useState(initialTasks)
  const [newTask, setNewTask] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleError = (error: any) => {
    setError(error?.message || 'An error occurred')
    setTimeout(() => setError(null), 5000) // Clear error after 5 seconds
  }

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTask.trim()) return

    setLoading(true)
    setError(null)
    try {
      const { data, error: supabaseError } = await supabase
        .from('tasks')
        .insert([{ title: newTask.trim(), status: 'todo' }])
        .select()
        .single()

      if (supabaseError) throw supabaseError
      
      if (data) {
        setTasks([data, ...tasks])
        setNewTask('')
        router.refresh() // Refresh the server component to sync data
      }
    } catch (err: any) {
      handleError(err)
    } finally {
      setLoading(false)
    }
  }

  const updateTaskStatus = async (taskId: string, newStatus: Task['status']) => {
    setError(null)
    try {
      const { error: supabaseError } = await supabase
        .from('tasks')
        .update({ status: newStatus })
        .eq('id', taskId)

      if (supabaseError) throw supabaseError

      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      ))
      router.refresh() // Refresh the server component to sync data
    } catch (err: any) {
      handleError(err)
    }
  }

  const deleteTask = async (taskId: string) => {
    setError(null)
    try {
      const { error: supabaseError } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId)

      if (supabaseError) throw supabaseError

      setTasks(tasks.filter(task => task.id !== taskId))
      router.refresh() // Refresh the server component to sync data
    } catch (err: any) {
      handleError(err)
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg">
          {error}
        </div>
      )}
      <form onSubmit={addTask} className="flex gap-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Adding...' : 'Add Task'}
        </button>
      </form>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {['todo', 'doing', 'done'].map((status) => (
          <div
            key={status}
            className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50"
          >
            <h2 className="text-lg font-semibold capitalize mb-4">{status}</h2>
            <div className="space-y-2">
              {tasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <div
                    key={task.id}
                    className="p-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <p className="flex-1">{task.title}</p>
                      <div className="flex items-center gap-2">
                        <select
                          value={task.status}
                          onChange={(e) =>
                            updateTaskStatus(
                              task.id,
                              e.target.value as Task['status']
                            )
                          }
                          className="text-sm border border-gray-300 dark:border-gray-700 rounded px-2 py-1"
                        >
                          <option value="todo">Todo</option>
                          <option value="doing">Doing</option>
                          <option value="done">Done</option>
                        </select>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="text-red-500 hover:text-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
