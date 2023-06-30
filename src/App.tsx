import './global.css'
import styles from './App.module.css'
import logo from './assets/rocket.svg'
import plus from './assets/plus.svg'
import clipboard from './assets/clipboard.svg'
import { ChangeEvent, useState } from 'react'
import { Task } from './Components/Task'

interface Task {
  id: number,
  title: string,
  isComplete: boolean
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState('')

  function handleCreateTask() {
    const newTask = {
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false
    }
    setTasks([...tasks, newTask])
    setNewTaskTitle('')
  }

  function handleChangeTaskTitle(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskTitle(event.target.value)
  }

  function handleRemoveTask(id: number) {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const countCompletedTasks = tasks.reduce((total, task) => {
    if (task.isComplete) {
      total++
    }
    return total
  }, 0)

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      handleCreateTask()
    }
  }

  function handleCompleteTask(id: number) {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        task.isComplete = !task.isComplete
      }
      return task
    }))
  }

  return (
    <>
      <header className={styles.header}>
        <img src={logo} alt="logo" />
        <h1 className={styles.title}>to<span>do</span></h1>
      </header>
      <main className={styles.main}>
        <section className={styles.action}>
          <input type="text"
            value={newTaskTitle}
            placeholder="Criar uma nova tarefa"
            title="Criar uma nova tarefa"
            onChange={handleChangeTaskTitle}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleCreateTask} type='submit'>
            Criar
            <img src={plus} alt="Criar nova tarefa" />
          </button>
        </section>
        <section className={styles.list}>
          <div className={styles.summary}>
            <div>Tarefas criadas: <span>{tasks.length}</span></div>
            <div>Tarefas concluidas: <span>{countCompletedTasks}</span></div>
          </div>
          {
            tasks.length > 0 ?
              tasks.map(task => Task({
                ...task,
                onCompleteTask: handleCompleteTask,
                onRemoveTask: handleRemoveTask
              }))
              :
              <div className={styles.emptyTasks} >
                <img src={clipboard} />
                <p>Você ainda não tem tarefas cadastradas</p>
                <p>Crie tarefas e organize seus itens a fazer</p>
              </div>
          }
        </section>
      </main>
    </>
  )
}

export default App
