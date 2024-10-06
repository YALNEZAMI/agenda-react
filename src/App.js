import { useState } from "react";
import "./App.css";
import { Add } from "./components/add/add";
import { Header } from "./components/header/header";
import { Task } from "./components/task/task";
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
  const allTasks = tasks.map((t) => (
    <Task
      updatedEvent={updatingTask}
      deleteEvent={deleteTask}
      key={t.id}
      task={t}
    ></Task>
  ));
  const taskAdded = (task) => {
    const newTasks = tasks.map((t) => t);
    newTasks.push(task);
    setTasks(newTasks);

    setInStorage(newTasks);
  };

  return (
    <div>
      <Header></Header>
      <Add taskAddedEvent={taskAdded}></Add>
      <hr></hr>
      {allTasks.length === 0 && (
        <p className="text-center text-xl mt-16 underline">
          You have no tasks yet, add some !
        </p>
      )}
      <div className="flex flex-wrap mt-4">{allTasks}</div>
    </div>
  );
}

export default App;
