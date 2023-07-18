import {useState} from "react";
import {IoMdAddCircleOutline} from "react-icons/io";
import {FiDelete} from "react-icons/fi";

function App() {
    const [todos, setTodos] = useState(() => []);

    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleAddTodo = () => {
        if (inputValue.trim() === "") {
            return;
        }
        setTodos((currentTodos) => {
            return [...currentTodos, {id: Math.random() * 1234, text: inputValue, completed: false},];
        });
        setInputValue("");
    };

    const handleDeleteTodo = (id) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    };

    const toggleTodo = (id, completed) => {
        setTodos((currentTodos) => {
            return currentTodos.map((todo) => {
                if (todo.id === id) {
                    return {...todo, completed};
                }
                return todo;
            });
        });
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleAddTodo();
        }
    };

    const filteredTodos = todos ? todos.filter((todo) => todo.completed !== false) : [];

    return (<section id="todoList">
        <header>
            <h1>Todo App</h1>
            <div className="todo-content">
                <p>Completed: {filteredTodos.length}/{todos.length}</p>
            </div>
        </header>

        <div className="input">
            <button onClick={handleAddTodo}><IoMdAddCircleOutline/></button>
            <input
                placeholder="Enter your todo here..."
                type="text"
                value={inputValue}
                onKeyDown={handleKeyDown}
                onChange={handleInputChange}
            />
        </div>

        <ul>
            {0 === todos.length &&
                <p style={{textAlign: "center", padding: "10px", borderBottom: "1px solid gainsboro"}}>
                    Your don't have any to do items
                </p>}

            {todos.map((todo, index) => (<li key={index}>
            <span className={todo.completed ? "completed" : ""}>

              <input id="checkbox" type="checkbox" checked={todo.completed}
                     onChange={(e) => toggleTodo(todo.id, e.target.checked)}/>
                {todo.text}

            </span>
                <button className="danger" onClick={() => handleDeleteTodo(todo.id)}><FiDelete/></button>
            </li>))}
        </ul>
    </section>);
}

export default App;