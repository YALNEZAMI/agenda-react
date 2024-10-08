import { useState } from "react";
import "./App.css";
import { Add } from "./components/add/add";
import { Header } from "./components/header/header";
import { Task } from "./components/task/task";
import { TaskList } from "./components/task/taskList";
function App() {
  const storage = JSON.parse(localStorage.getItem("tasks"));
  const [tasks, setTasks] = useState([]);
  const setInStorage = (ts) => {
    localStorage.setItem("tasks", JSON.stringify(ts));
  };
  if (storage != null) {
    setTimeout(() => {
      setTasks(storage);
    }, 10);
  } else {
    setInStorage([]);
  }

  const deleteTask = (id) => {
    const filteredTasks = tasks.filter((t) => t.id !== id);
    setTasks(filteredTasks);
    setInStorage(filteredTasks);
  };
  const updatingTask = (newTask) => {
    const newTasks = tasks.map((t) => {
      if (t.id === newTask.id) {
        return newTask;
      } else {
        return t;
      }
    });
    setTasks(newTasks);
    setInStorage(newTasks);
  };
  const [taskShape, setTaskShape] = useState("card");

  const allTasks = tasks.map((t) =>
    taskShape === "card" ? (
      <Task
        updatedEvent={updatingTask}
        deleteEvent={deleteTask}
        key={t.id}
        task={t}
      ></Task>
    ) : (
      <TaskList
        updatedEvent={updatingTask}
        deleteEvent={deleteTask}
        key={t.id}
        task={t}
      ></TaskList>
    )
  );
  const taskAdded = (task) => {
    const newTasks = tasks.map((t) => t);
    newTasks.push(task);
    setTasks(newTasks);
    setInStorage(newTasks);
  };
  const taskShapeSelectionChange = (e) => {
    const newVal = e.target.value;

    setTaskShape(newVal);
  };
  return (
    <div>
      <Header></Header>
      <div className="flex justify-between px-2">
        {" "}
        <Add taskAddedEvent={taskAdded}></Add>
        <select
          onChange={taskShapeSelectionChange}
          className="cursor-pointer border-x-2 h-10 mt-2"
        >
          <option value="card">Cards</option>
          <option value="list">List</option>
        </select>
      </div>
      <hr></hr>
      {allTasks.length === 0 && (
        <p className="text-center text-xl mt-16 underline">
          You have no tasks yet, add some !
        </p>
      )}
      <div className="flex flex-wrap mt-4 justify-center">{allTasks}</div>
    </div>
  );
}

export default App;
