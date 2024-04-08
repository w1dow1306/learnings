import React, { useEffect, useState } from 'react'
import '../css/todos.css'
import Todo from './todo'
export const Todos = () => {
    const [todos, settodos] = useState([]);

    async function gettodos() {
        console.log("this ran")
        const res = await fetch("http://localhost:2020/todos/all")
        const val = await res.json()
        settodos(todos => [...todos, ...val]);
        console.log(val)
    }

    useEffect(() => gettodos, []);

    return (
        <>
            <div className="todo-container" onLoad={gettodos}>
                {todos.map((todo, index) => {
                    let p = {
                        x: (Math.floor(Math.random() * 1000)),
                        y: (Math.floor(Math.random() * 500))
                    }
                    return <Todo params={todo} p={p} key={index} />
                })}
            </div>
        </>
    )
}
