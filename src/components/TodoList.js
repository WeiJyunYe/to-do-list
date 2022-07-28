import React, { useState } from "react"

export default function TodoList({ todo, setTodo, removeTodo }) {
  const handleDelete = (e) => {
    e.preventDefault()
    removeTodo()
  }

  const [editingValue, setEditingValue] = useState('')

  const handleEdit = (e) => {
    if (todo.editing) {
      setTodo({
        text: editingValue,
        editing: false,
      })
      setEditingValue('')
    } else {
      setTodo({
        editing: true,
      })
      setEditingValue(todo.text)
    }
  }

  const handleCheckBox = (e) => {
    setTodo({
      completed: !todo.completed
    })
  }

  return (
    <div className="flex w-full text-base justify-between px-2">
      <div className="flex items-center space-x-2 my-[2px]">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleCheckBox}
        />
        {
          todo.editing ? (
            <form onSubmit={handleEdit}>
              <input
                type="text"
                value={editingValue}
                onChange={(e) => {
                  setEditingValue(e.target.value)
                }}
                className="bg-gray-500 rounded-[4px] outline-none text-sm text-white indent-2 w-[160px]"
              />
            </form>
          ) : (
            todo.completed ? (
              <div className="text-sm py-1 line-through text-gray-500">{todo.text}</div>
            ) : (
              <div className="text-sm py-1">{todo.text}</div>
            )
          )
        }
      </div>
      <div className="flex space-x-3">
        <button
          type="button"
          className="text-sm text-white "
          onClick={handleEdit}
        >{todo.editing ? "確定" : "修改"}</button>
        <button
          type="button"
          className="text-sm text-white "
          onClick={handleDelete}>刪除</button>
      </div>
    </div>
  )
}