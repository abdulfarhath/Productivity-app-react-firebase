import { format } from 'date-fns';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";
import { auth, db } from "../firebase/firebaseconfig";
import { getDoc, collection, doc, getDocs, setDoc } from 'firebase/firestore';

// import './home.css'; // Import the specific CSS for the homepage
import Calender from '../components/Calender';
import Quote from '../components/Qoute';
import { signOut } from 'firebase/auth';

export default function Homepage() {
  const [tasks, setTasks] = useState([]);
  const [isAllDone, setAllDone] = useState(false);
  const [heatmapValues, setHeatmapValues] = useState([]);

  const navigate = useNavigate();

  const today = new Date();
  const user = auth.currentUser;
  // const userId = user.uid;
  const userId = "user2";
  const tasksRef = collection(db, "users", userId, "tasks");

  useEffect(() => {
    // setTasks(taskArr);
    fetchTasks();
    // setHeatmapValues(generateInitialHeatmapValues());
    // setHeatmapValues(fetchHeatmapValues());
    fetchHeatmapValues();
  }, []);

  const fetchTasks = async () => {
    if (user) {
      const querySnapshot = await getDocs(tasksRef);

      const taskArr = [];
      querySnapshot.forEach((doc) => {
        taskArr.push({ id: doc.id, ...doc.data() });
      });

      console.log(taskArr);
      setTasks(taskArr);
    } else {
      console.log("user not logged in");
    }
  }

  useEffect(() => {
    const allDone = tasks.every((tsk) => tsk.isDone);
    setAllDone((tasks.length != 0) ? allDone : false);
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

  // function generateInitialHeatmapValues() {
  //   const values = [];
  //   for (let i = 0; i < 365; i++) {
  //     const date = new Date();
  //     date.setDate(today.getDate() - i);
  //     values.push({
  //       date: format(date, 'yyyy-MM-dd'),
  //       count: 0, // Initialize all dates with 0
  //     });
  //   }
  //   return values;
  // }

  const fetchHeatmapValues = async () => {
    if (user) {
      const heatmapRef = collection(db, "users", userId, "heatmap");
      const querySnapshot = await getDocs(heatmapRef);

      const heatmapArr = [];
      querySnapshot.forEach((doc) => {
        heatmapArr.push({ id: doc.id, ...doc.data() });
      });
      // console.log(heatmapArr);
      setHeatmapValues(heatmapArr);
    } else {
      console.log("user not logged in");
    }
  };

  // useEffect(() => {
  //   fetchHeatmapValues();
  // }, []);

  async function handleCheckbox(taskId, parentId) {
    setTasks((tasks) => {
      return tasks.map(async (tsk) => {
        if (tsk.id === parentId) {
          return {
            ...tsk,
            tasks: tsk.tasks.map((innerTask) =>
              innerTask.id === taskId ? { ...innerTask, completed: !innerTask.completed } : innerTask
            ),
          };
        }
        return tsk;
      });
    });

    if (user) {
      const taskDocRef = doc(tasksRef, parentId);
      const taskDoc = await getDoc(taskDocRef);
      if (taskDoc.exists()) {
      const taskData = taskDoc.data();
      const updatedTasks = taskData.tasks.map((innerTask) =>
        innerTask.id === taskId ? { ...innerTask, completed: !innerTask.completed } : innerTask
      );
      await setDoc(taskDocRef, { ...taskData, tasks: updatedTasks });
      fetchTasks(); // Re-fetch tasks to trigger re-render
      }
    }
  }

  async function handleLogout() {
    await signOut(auth);
  }


  return (
    <div className="homepage flex flex-col justify-center items-center w-full min-h-screen bg-gray-800 text-gray-100 p-4">
      <div className="quote mb-8">
        <Quote />
        <button onClick={handleLogout} >logout btn</button>
      </div>

      <div className="greenery bg-blue-gray-700 w-full max-w-4xl h-40 mb-8 rounded-lg shadow-lg">
        <Calender heatmapValues={heatmapValues} />
      </div>

      <div className="container flex flex-col gap-4 w-full max-w-4xl">
        <div className="tasks bg-gray-700 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Mental win</h2>
          <div className="mental mb-6">
            {tasks.map((tsk) => {
              if (tsk.id === "mental") {
                return tsk.tasks.map((innerTask) => (
                  <div key={innerTask.id} className="task flex items-center gap-2 mb-2">
                    <input
                      onChange={() => handleCheckbox(innerTask.id, "mental")}
                      checked={innerTask.completed}
                      type="checkbox"
                      className="accent-green-500"
                    />
                    <h2 className="text-lg">{innerTask.name}</h2>
                  </div>
                ));
              }
            })}

          </div>

          <h2 className="text-2xl font-semibold mb-4">Physical win</h2>
          <div className="physical mb-6">
            {tasks.map((tsk) => {
              if (tsk.id === "physical") {
                return tsk.tasks.map((innerTask) => (
                  <div key={innerTask.id} className="task flex items-center gap-2 mb-2">
                    <input
                      onChange={() => handleCheckbox(innerTask.id,"physical")}
                      checked={innerTask.completed}
                      type="checkbox"
                      className="accent-green-500"
                    />
                    <h2 className="text-lg">{innerTask.name}</h2>
                  </div>
                ));
              }
            })}
          </div>

          <h2 className="text-2xl font-semibold mb-4">Spiritual win</h2>
          <div className="spiritual">
          {tasks.map((tsk) => {
              if (tsk.id === "spiritual") {
                return tsk.tasks.map((innerTask) => (
                  <div key={innerTask.id} className="task flex items-center gap-2 mb-2">
                    <input
                      onChange={() => handleCheckbox(innerTask.id, "spiritual")}
                      checked={innerTask.completed}
                      type="checkbox"
                      className="accent-green-500"
                    />
                    <h2 className="text-lg">{innerTask.name}</h2>
                  </div>
                ));
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