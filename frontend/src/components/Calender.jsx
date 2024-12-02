import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import './calender.css';

export default function Calender({ heatmapValues }) {
  const today = new Date();

  // Fill in missing dates with zero values
  const filledHeatmapValues = [];
  for (let i = 0; i < 365; i++) {
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
    const dateString = date.toISOString().split('T')[0];

    const existingValue = heatmapValues.find((value) => value.date === dateString);
    filledHeatmapValues.push({
      date: dateString,
      count: existingValue ? existingValue.count : 0, // Assign count or 0 for missing dates
    });
  }

  return (
    <div className="heatmap-container">
      <CalendarHeatmap
        startDate={new Date(today.getFullYear(), today.getMonth(), today.getDate() - 364)}
        endDate={today}
        values={filledHeatmapValues}
        classForValue={(value) => {
          if (!value || value.count === 0) {
            return 'color-empty'; // Empty or incomplete tasks
          }
          return 'color-completed'; // Color when count is greater than 0
        }}
      />
    </div>
  );
}
