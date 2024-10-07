import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Tooltip, Legend, Filler } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, Tooltip, Legend, Filler);

const ActiveUsers = () => {
  // Data for the line chart
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Active Users',
        data: [23000, 21000, 25000, 24000, 22000, 23214],
        fill: true, // Fill the area under the line
        borderColor: '#1F2E4C',
        backgroundColor: '#3669BF', // Add a gradient fill color
        tension: 0.4, // Smooth the line
      },
    ],
  };

  return (
    <div className="rounded-lg shadow-md bg-white w-full h-full p-6"> {/* Container with padding and shadow */}
      <h2 className="text-lg font-semibold mb-4">Active Users</h2>
      <div className="w-full h-[60%]"> {/* Flexibly adjusting the chart's height */}
        <Line data={data} options={{ responsive: true, maintainAspectRatio: false }} /> {/* Responsive chart */}
      </div>
      <div className="flex justify-between mt-4 text-gray-600">
        <span>Current Month: 23,214</span> {/* Additional info can be placed here */}
        <span className="text-green-500">+8.06% vs. Previous Month</span> {/* Percentage change */}
      </div>
    </div>
  );
};

export default ActiveUsers; // Ensure default export is correct
