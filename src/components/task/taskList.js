import { useState } from "react";
//main task component
export const TaskList = ({ task, deleteEvent, updatedEvent, shape }) => {
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
    <div
      className={`w-full md:w-1/3 rounded p-2 m-2 ${task.color} ${task.opacity}`}
    >
      <div>
        <div className=" flex justify-between pr-5">
          <div
            onClick={toogleIsDisplayingDetails}
            className="flex flex-col cursor-pointer w-3/4 pl-2"
          >
            <div className="mb-2 underline font-bold truncate">
              {task.title}
            </div>
            <div className="text-sm">
              {getDate()} at
              {" " + getHour()}
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <div
              onClick={displayUpdate}
              className="flex space-x-2 cursor-pointer text-sm text-center bg-green-700 hover:opacity-80 p-1 text-white rounded"
            >
              <span>Update</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </div>
            <div
              onClick={deleteButtonClik}
              className="flex space-x-2 cursor-pointer text-sm text-center bg-red-700 hover:opacity-80 p-1 text-white rounded"
            >
              <span>delete</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                />
              </svg>
            </div>
          </div>
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
    <div className="fixed left-0 top-0 w-screen h-screen opacity-90 bg-gray-400 flex justify-center items-center">
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
