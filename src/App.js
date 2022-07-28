import React, { useState, useEffect } from "react"
import TodoList from "./components/TodoList"

export default function TodoApp(props) {
  const [id, setId] = useState(1)
  const savedTodos = JSON.parse(localStorage.getItem("todos"))
  const [todos, setTodos] = useState(savedTodos || [
    {
      id: 0,
      text: "新增一個代辦事項",
      completed: false,
      editing: false,
    },
    {
      id: 1,
      text: "按下左邊框框完成事項",
      completed: true,
      editing: false,
    }
  ])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  })

  const [value, setValue] = useState("")

  const addTodo = (e) => {
    e.preventDefault()
    setTodos(oldTodos => {
      console.log(id)
      const newTodos = [...oldTodos]
      newTodos.push(
        {
          id: id + 1,
          completed: false,
          text: value,
          editing: false,
        }
      )
      return newTodos
    })

    setId(id + 1)
    console.log(id)
    setValue("")
  }

  console.table(todos)

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center w-screen h-screen bg-gray-800 overflow-y-auto">
        <h1 className="text-4xl text-white p-2">Todo List</h1>
        <form onSubmit={addTodo}>
          <input
            className="bg-gray-500 rounded-[4px] outline-none text-sm text-white indent-2 placeholder:text-white"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="請在此輸入文字..."
            required
          />
          <button className="text-sm text-white bg-gray-500 px-2 ml-2 rounded-[4px] outline outline-gray-800 outline-1 active:bg-gray-400">新增</button>
        </form>
        <div className="flex flex-col items-center w-screen h-screen border-[1px] rounded-md my-5 text-white overflow-y-auto">
          {
            todos.map((todo, index) => {
              const setTodo = ({
                text,
                editing,
                completed,
              }) => {
                setTodos(oldTodos => {
                  const newTodos = [...oldTodos]
                  newTodos[index] = {
                    ...oldTodos[index],
                    text: typeof text !== 'undefined' ? text : oldTodos[index].text,
                    editing: typeof editing !== 'undefined' ? editing : oldTodos[index].editing,
                    completed: typeof completed !== 'undefined' ? completed : oldTodos[index].completed,
                  }
                  return newTodos
                })
              }

              const removeTodo = () => {
                console.log(index)
                setTodos(oldTodos => {
                  const newTodos = [...oldTodos]
                  newTodos.splice(index, 1)
                  return newTodos
                })
              }

              return (
                <TodoList
                  key={todo.id}
                  todo={todo}
                  setTodo={setTodo}
                  removeTodo={removeTodo}
                />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}