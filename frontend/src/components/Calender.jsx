// import '../routes/home.css'; // Import the specific CSS for the homepage
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import './Calender'
import './calender.css'

export default function Calender({heatmapValues}){
    
    const today = new Date();

    return(
        <div className="heatmap-container">
          <CalendarHeatmap
            startDate={new Date(today.getFullYear(), today.getMonth(), today.getDate() - 364)}
            endDate={today}
            values={heatmapValues}
            classForValue={(value) => {
              if (!value || value.count === 0) {
                return 'color-empty'; // Empty or incomplete tasks
              }
                return 'color-completed'; // Deep green color when all tasks are done
            }}
          />
        </div>
    )
}