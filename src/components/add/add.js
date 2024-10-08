import { useState } from "react";

export const Add = ({ taskAddedEvent }) => {
  const [isAdding, setIsAdding] = useState(false);
  const toogle = () => {
    setIsAdding(!isAdding);
  };
  const finishAdding = (task) => {
    taskAddedEvent(task);
    setIsAdding(false);
  };
  return (
    <div>
      <button
        onClick={toogle}
        className="font-bold bg-blue-800 hover:bg-blue-700 p-2 px-4 rounded text-white text-xl m-2"
      >
        +
      </button>
      {isAdding && (
        <AddForm cancelEvent={toogle} added={finishAdding}></AddForm>
      )}
    </div>
  );
};
const AddForm = ({ added, cancelEvent }) => {
  const colors = [
    "bg-blue-500",
    "bg-red-500",
    "bg-green-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-gray-500",
    "bg-red-800",
    "bg-green-800",
    "bg-orange-800",
    "bg-yellow-800",
    "bg-gray-800",
  ];
  const opacities = [
    "opacity-100",
    "opacity-95",
    "opacity-90",
    "opacity-85",
    "opacity-80",
  ];
  const [task, setTask] = useState({
    id: Math.floor(Math.random() * 1000),
    title: "",
    description: "",
    date: "",
    color: colors[Math.floor(Math.random() * colors.length)],
    opacity: opacities[Math.floor(Math.random() * opacities.length)],
  });
  const [isAlert, setIsAlert] = useState(false);
  const changeTitle = (event) => {
    setTask({ ...task, title: event.target.value });
    setIsAlert(false);
  };
  const changeDescription = (event) => {
    setTask({ ...task, description: event.target.value });
    setIsAlert(false);
  };
  const changeDate = (event) => {
    setTask({ ...task, date: event.target.value });
    setIsAlert(false);
  };
  const done = () => {
    if (task.title) {
      added(task);
    } else {
      setIsAlert(true);
    }
  };
  const cancel = () => {
    cancelEvent();
  };
  return (
    <div className="bg-gray-400 fixed top-0 left-0 w-screen h-screen z-20 flex items-center justify-center">
      <form className=" bg-blue-300 p-5 shadow-lg ">
        <h1 className="text-xl font-bold text-center m-2 mb-4 bg-gray-300 p-2 rounded shadow-lg ">
          Specify your task details !
        </h1>
        {isAlert && (
          <p className="text-center text-white bg-red-500 p-1 m-2">
            Please fill all required fields !
          </p>
        )}
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-2">
            <label className="pt-1 min-w-24 font-bold">Title* : </label>
            <input
              value={task.title}
              onChange={changeTitle}
              type="text"
              placeholder="Medical visit"
              className="border-2 border-gray-300 p-1 rounded "
            ></input>
          </div>
          <div className="flex space-x-2">
            <label className="pt-1 min-w-24 font-bold">Description : </label>
            <textarea
              value={task.description}
              onChange={changeDescription}
              type="text"
              placeholder="I have to bring my health care card ..."
              className="border-2 border-gray-300 p-1 rounded w-full"
            ></textarea>
          </div>
          <div className="flex space-x-2">
            <label className="pt-1 min-w-24 font-bold">Date : </label>
            <input
              value={task.date}
              onChange={changeDate}
              type="datetime-local"
              className="border-2 border-gray-300 p-1 rounded "
            ></input>
          </div>
          <div className="flex justify-center space-x-3">
            <button
              type="button"
              onClick={done}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded p-1 px-4 "
            >
              Done
            </button>
            <button
              type="button"
              onClick={cancel}
              className="bg-red-500 hover:bg-red-600 text-white rounded p-1 px-4 "
            >
              Cancel
            </button>
          </div>
          <div>
            <small>Fields marked with * are required.</small>
          </div>
        </div>
      </form>
    </div>
  );
};
