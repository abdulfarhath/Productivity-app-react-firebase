import { format } from 'date-fns';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";

// import './home.css'; // Import the specific CSS for the homepage
import Calender from '../components/Calender';
import Quote from '../components/Qoute';

export default function Homepage() {
  const [tasks, setTasks] = useState([]);
  const [isAllDone, setAllDone] = useState(false);
  const [heatmapValues, setHeatmapValues] = useState([]);
 
  const navigate = useNavigate();

  const today = new Date();

  const taskArr = [
    {
      id: uuidv4(),
      type: "mental",
      task: "read a book",
      isDone: false,
    },
    {
      id: uuidv4(),
      type: "physical",
      task: "go for a run",
      isDone: false,
    },
    {
      id: uuidv4(),
      type: "spiritual",
      task: "pray",
      isDone: false,
    },
  ];

  useEffect(() => {
    setTasks(taskArr);
    setHeatmapValues(generateInitialHeatmapValues());
  }, []);

  useEffect(() => {
    const allDone = tasks.every((tsk) => tsk.isDone);
    setAllDone(allDone);
  }, [tasks]);

  useEffect(() => {
    if (isAllDone) {
      setHeatmapValues((prevValues) => {
        return prevValues.map((value) => {
          // Update only today's date when all tasks are done
          if (value.date === format(today, 'yyyy-MM-dd')) {
            return { ...value, count: 1 };  // Set today's date count to 1
          }
          return value;
        });
      });
    } else {
      setHeatmapValues((prevValues) => {
      return prevValues.map((value) => {
        // Reset today's date count to 0 when not all tasks are done
        if (value.date === format(today, 'yyyy-MM-dd')) {
        return { ...value, count: 0 };
        }
        return value;
      });
      });
    }
  }, [isAllDone]);
 
  function generateInitialHeatmapValues() {
    const values = [];
    for (let i = 0; i < 365; i++) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      values.push({
        date: format(date, 'yyyy-MM-dd'),
        count: 0, // Initialize all dates with 0
      });
    }
    return values;
  }

  function handleCheckbox(id) {
    setTasks((tasks) => {
      return tasks.map((tsk) => (
        tsk.id === id ? { ...tsk, isDone: !tsk.isDone } : tsk
      ));
    });
  }


  return (
    <div className="homepage flex flex-col justify-center items-center w-full min-h-screen bg-gray-800 text-gray-100 p-4">
      <div className="quote mb-8">
        <Quote />
      </div>

      <div className="greenery bg-blue-gray-700 w-full max-w-4xl h-40 mb-8 rounded-lg shadow-lg">
        <Calender heatmapValues={heatmapValues} />
      </div>

      <div className="container flex flex-col gap-4 w-full max-w-4xl">
        <div className="tasks bg-gray-700 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Mental win</h2>
          <div className="mental mb-6">
            {tasks.map((tsk) => {
              if (tsk.type === "mental") {
                return (
                  <div key={tsk.id} className="task flex items-center gap-2 mb-2">
                    <input
                      onChange={() => handleCheckbox(tsk.id)}
                      checked={tsk.isDone}
                      type="checkbox"
                      className="accent-green-500"
                    />
                    <h2 className="text-lg">{tsk.task}</h2>
                  </div>
                );
              }
            })}
          </div>

          <h2 className="text-2xl font-semibold mb-4">Physical win</h2>
          <div className="physical mb-6">
            {tasks.map((tsk) => {
              if (tsk.type === "physical") {
                return (
                  <div key={tsk.id} className="task flex items-center gap-2 mb-2">
                    <input
                      onChange={() => handleCheckbox(tsk.id)}
                      checked={tsk.isDone}
                      type="checkbox"
                      className="accent-green-500"
                    />
                    <h2 className="text-lg">{tsk.task}</h2>
                  </div>
                );
              }
            })}
          </div>

          <h2 className="text-2xl font-semibold mb-4">Spiritual win</h2>
          <div className="spiritual">
            {tasks.map((tsk) => {
              if (tsk.type === "spiritual") {
                return (
                  <div key={tsk.id} className="task flex items-center gap-2 mb-2">
                    <input
                      onChange={() => handleCheckbox(tsk.id)}
                      checked={tsk.isDone}
                      type="checkbox"
                      className="accent-green-500"
                    />
                    <h2 className="text-lg">{tsk.task}</h2>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>

      <div className="btn mt-8">
        <button onClick={() => navigate("/input")} className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-green-600 transition duration-300">
          Add / Edit Tasks
        </button>
      </div>
      
    </div>
  );
}