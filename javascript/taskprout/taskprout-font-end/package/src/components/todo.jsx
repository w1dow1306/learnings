import React, { useState, useEffect } from 'react';
import '../css/todo.css';

const Todo = ({ params, p }) => {
    const [pos, setPos] = useState({ x: p.x, y: p.y });
    const [isDragged, setIsDragged] = useState(false);

    const handleMouseDown = () => {
        setIsDragged(true);
    };

    const handleMouseUp = () => {
        setIsDragged(false);
    };

    useEffect(() => {
        const handleMouseMove = (event) => {

            if (isDragged) {
                const container = document.querySelector(".todo-container").getBoundingClientRect();
                const x = event.clientX - container.left;
                const y = event.clientY - container.top;
                setPos({ x, y });
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragged]);

    function bg() {
        if (params.status === 0) {
            return "#8ea5f1";
        } else if (params.status === 2) {
            return "#ff942b";
        } if (params.status === 1) {
            return "#61BC59"
        }
    }
    function reveal(e) {
        e.preventDefault();
        let z = e.target.parentNode.parentNode;
        let a = z.children[2];
        a.classList.toggle("show");
    }

    return (
        <div className='todo' id={params.t_id} style={{ left: pos.x + 'px', top: pos.y + 'px' }} onMouseDown={handleMouseDown}>
            <div className="title" style={{ backgroundColor: bg() }}>{params.title}<div className="reveal" onClick={reveal}></div></div>
            <div className="desc">{params.desc}</div>
            <p className='body'>{params.body}
            <button type='submit' className='rvl'>Edit</button>
            </p>
        </div>
    );
};

export default Todo;
