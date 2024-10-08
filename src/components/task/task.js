import { useState } from "react";
//main task component
export const Task = ({ task, deleteEvent, updatedEvent, shape }) => {
  const [isDisplayingDetails, SetIsDisplayingDetails] = useState(false);
  const toogleIsDisplayingDetails = () => {
    SetIsDisplayingDetails(!isDisplayingDetails);
  };
  const deleteButtonClik = () => {
    deleteEvent(task.id);
  };
  const [isUpdating, setIsUpdating] = useState(false);
  const hideUpdating = () => {
    setIsUpdating(false);
  };
  const getDate = () => {
    const datetime = new Date(task.date);
    return (
      datetime.getFullYear() +
      "/" +
      datetime.getMonth() +
      "/" +
      datetime.getDate()
    );
  };
  const getHour = () => {
    const datetime = new Date(task.date);
    return datetime.getHours() + ":" + datetime.getMinutes();
  };
  const updatedSuccess = (task) => {
    updatedEvent(task);
    hideUpdating();
  };
  const displayUpdate = () => {
    setIsUpdating(true);
  };

  return (
    <div>
      <div
        className={`w-32 h-36 rounded p-2 m-2 ${task.color} ${task.opacity}`}
      >
        <div
          className="min-h-24 cursor-pointer"
          onClick={toogleIsDisplayingDetails}
        >
          <div className="text-center underline mb-4 font-bold truncate">
            {task.title}
          </div>
          {task.date && (
            <div className="text-sm flex justify-between">
              <p>{getDate()}</p>
              <p>{getHour()}</p>
            </div>
          )}
        </div>
        <div className="flex justify-between">
          <button
            onClick={displayUpdate}
            className="text-sm text-center bg-green-700 hover:opacity-80 p-1 text-white rounded"
          >
            Update
          </button>
          <button
            onClick={deleteButtonClik}
            className="text-sm text-center bg-red-700 hover:opacity-80 p-1 text-white rounded"
          >
            delete
          </button>
        </div>
      </div>

      {isUpdating && (
        <UpdateForm
          tasktoUpdate={task}
          cancelEvent={hideUpdating}
          updatedSuccess={updatedSuccess}
        ></UpdateForm>
      )}
      {isDisplayingDetails && (
        <Details
          finishEvent={toogleIsDisplayingDetails}
          task={task}
          date={getDate()}
          hour={getHour()}
        ></Details>
      )}
    </div>
  );
};
//update form component
const UpdateForm = ({ updatedSuccess, cancelEvent, tasktoUpdate }) => {
  const [task, setTask] = useState(tasktoUpdate);
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
      updatedSuccess(task);
    } else {
      setIsAlert(true);
    }
  };
  const cancel = () => {
    cancelEvent();
  };
  return (
    <div className="bg-white opacity-90 fixed top-0 left-0 w-screen h-screen z-20 flex items-center justify-center">
      <form className=" bg-blue-300 p-5 shadow-lg ">
        <h1 className="text-xl font-bold text-center m-2 mb-4 bg-gray-300 p-2 rounded shadow-lg ">
          Modify your task details !
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
//details component
const Details = ({ task, date, hour, finishEvent }) => {
  const finish = () => {
    finishEvent();
  };
  return (
    <div className="fixed left-0 top-0 w-screen h-screen opacity-90 bg-white flex justify-center items-center">
      <div className="bg-blue-700 p-4 rounded-md text-white">
        <h1 className="text-center font-bold shadow-lg p-3 m-3 bg-pink-700">
          {task.title}
        </h1>
        <p className="m-4">
          <b className="mx-2 text-black bg-yellow-50 p-1 rounded">
            Description :
          </b>
          {task.description !== ""
            ? task.description
            : " No defined description"}
        </p>
        <p className="m-4">
          {" "}
          <b className="mx-2 text-black bg-yellow-50 p-1 rounded">
            Date and time :
          </b>
          {date + " " + hour}
        </p>
        <div className="flex justify-center">
          <button
            onClick={finish}
            className="p-1 rounded bg-black text-white hover:opacity-80"
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
};
