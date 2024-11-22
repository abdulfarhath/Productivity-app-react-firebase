import { db } from "./firebaseconfig.js"; // your firebase config
import { collection, doc, setDoc } from "firebase/firestore";

// Function to generate a random integer between min and max
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Function to generate a random boolean value (for task completion)
const getRandomBoolean = () => Math.random() < 0.5;

// Function to populate the Firestore database with random data
const fillRandomData = async (userId) => {
    // Random heatmap data for the last 30 days
    const today = new Date();
    const heatmapRef = collection(db, "users", userId, "heatmap");
    for (let i = 0; i < 30; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dateString = format(date, 'yyyy-MM-dd'); // Format the date as "yyyy-MM-dd"
        const count = getRandomInt(0, 1); // Random count for each date (0 to 5)

        // Set the random count for the date
        try {
            await setDoc(doc(heatmapRef, dateString), { count });
            console.log(`Added heatmap data for ${dateString}: ${count}`);
        } catch (err) {
            console.error("Error adding heatmap data:", err);
        }
    }

    // Random tasks data for "spiritual", "mental", "physical"
    const tasksData = {
        spiritual: [
            { id: "task1", name: "Meditate", completed: getRandomBoolean() },
            { id: "task2", name: "Pray", completed: getRandomBoolean() },
            { id: "task3", name: "Fast", completed: getRandomBoolean() },
        ],
        mental: [
            { id: "task1", name: "Read a book", completed: getRandomBoolean() },
            { id: "task2", name: "Learn a new skill", completed: getRandomBoolean() },
            { id: "task3", name: "Solve a puzzle", completed: getRandomBoolean() },
        ],
        physical: [
            { id: "task1", name: "Exercise", completed: getRandomBoolean() },
            { id: "task2", name: "Run 5km", completed: getRandomBoolean() },
            { id: "task3", name: "Swim", completed: getRandomBoolean() },
        ],
    };

    // Add random tasks data for each category
    for (const category in tasksData) {
        const tasksRef = doc(collection(db, "users", userId, "tasks"), category);
        try {
            await setDoc(tasksRef, { tasks: tasksData[category] });
            console.log(`Added tasks data for ${category}`);
        } catch (err) {
            console.error(`Error adding tasks data for ${category}:`, err);
        }
    }
};

// Helper function to format the date in 'yyyy-MM-dd' format
const format = (date, formatStr) => {
    const yyyy = date.getFullYear();
    const mm = (date.getMonth() + 1).toString().padStart(2, "0"); // Month starts from 0
    const dd = date.getDate().toString().padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
};

// Example usage (replace 'userId' with an actual userId from your Firestore)
const userId = "user1"; // Replace with the actual user ID
fillRandomData(userId);
