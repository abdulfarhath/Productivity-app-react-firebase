import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { ref, onValue } from "firebase/database";
// import db from "../firebase/firebaseconfig.js";
// import { addTask, deleteTask, fetchTasks } from "./firebaseFunctions";
import { useNavigate } from 'react-router-dom';

export default function Input() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // setTasks(taskArr);
    // fetchTasks(setTasks);
  }, []);


  // function fetchTasks(setTasks) {
  //   const tasksRef = ref(db, "tasks/");
  //   onValue(tasksRef, (snapshot) => {
  //     const data = snapshot.val();
  //     const tasksArray = data ? Object.keys(data).map((key) => ({ id: key, ...data[key] })) : [];
  //     setTasks(tasksArray);
  //   });
  // }

  // function addTask(task, type) {
  //   const tasksRef = ref(database, "tasks/");
  //   push(tasksRef, {
  //     task,
  //     type,
  //     isDone: false,
  //   });
  // }

  function addTask(e, type) {
    e.preventDefault();
    const newTask = e.target[0].value.trim();
    if (!newTask) return;

    setTasks([
      ...tasks,
      { id: uuidv4(), type, task: newTask, isDone: false },
    ]);
    e.target[0].value = "";
  }


  // function deleteTask(taskId) {
  //   const taskRef = ref(database, `tasks/${taskId}`);
  //   remove(taskRef);
  // }
  

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Mental Wins Section */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Mental Wins
          </h2>
          <form
            className="flex gap-4 mb-4"
            onSubmit={(e) => addTask(e, "mental")}
          >
            <input
              type="text"
              placeholder="Add a mental task..."
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add
            </button>
          </form>
          <ul>
            {tasks
              .filter((tsk) => tsk.type === "mental")
              .map((tsk) => (
                <li
                  key={tsk.id}
                  className="flex justify-between items-center mb-2"
                >
                  <span className="text-gray-700">{tsk.task}</span>
                  <button
                    onClick={() => deleteTask(tsk.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </li>
              ))}
          </ul>
        </div>

        {/* Physical Wins Section */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Physical Wins
          </h2>
          <form
            className="flex gap-4 mb-4"
            onSubmit={(e) => addTask(e, "physical")}
          >
            <input
              type="text"
              placeholder="Add a physical task..."
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Add
            </button>
          </form>
          <ul>
            {tasks
              .filter((tsk) => tsk.type === "physical")
              .map((tsk) => (
                <li
                  key={tsk.id}
                  className="flex justify-between items-center mb-2"
                >
                  <span className="text-gray-700">{tsk.task}</span>
                  <button
                    onClick={() => deleteTask(tsk.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </li>
              ))}
          </ul>
        </div>

        {/* Spiritual Wins Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Spiritual Wins
          </h2>
          <form
            className="flex gap-4 mb-4"
            onSubmit={(e) => addTask(e, "spiritual")}
          >
            <input
              type="text"
              placeholder="Add a spiritual task..."
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
            >
              Add
            </button>
          </form>
          <ul>
            {tasks
              .filter((tsk) => tsk.type === "spiritual")
              .map((tsk) => (
                <li
                  key={tsk.id}
                  className="flex justify-between items-center mb-2"
                >
                  <span className="text-gray-700">{tsk.task}</span>
                  <button
                    onClick={() => deleteTask(tsk.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className="btn flex flex-row justify-center mt-12 gap-9 ">
        <button className=" bg-blue-500 rounded w-20 h-10 hover:bg-blue-700 text-white font-bold  " >SAVE</button>
        <button className=" bg-blue-500 rounded w-20 h-10 hover:bg-blue-700 text-white font-bold  "
          onClick={()=>navigate('/')}
        >GO BACK</button>
      </div>
    </div>
  );
}
