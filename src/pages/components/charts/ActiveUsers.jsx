import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Tooltip, Legend, Filler } from 'chart.js';
import { CiExport } from "react-icons/ci";

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
        backgroundColor: 'rgba(54, 105, 191, 0.2)', // Semi-transparent fill color
        pointBackgroundColor: '#1F2E4C',
        tension: 0.4, // Smooth the line curve
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false, // Hide x-axis grid lines
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#f0f0f0', // Light grid lines
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        backgroundColor: '#1F2E4C', // Tooltip background color
        titleColor: '#fff',
        bodyColor: '#fff',
      },
    },
  };

  return (
    <div className="rounded-lg shadow-md bg-white w-full p-2"> {/* Container with padding and shadow */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg  font-semibold mb-4">Active Users</h2>
        <button className="text-sm flex gap-2 align-Item ">
          <CiExport className="bg-gray-200  w-6 h-6 rounded-md unded-lg text-black " />
          <span className='text-xs'>export</span>
        </button>
      </div>
      <div className="w-full h-[160px]"> {/* Flexibly adjusting the chart's height */}
        <Line data={data} options={options} />
      </div>
      <div className="flex justify-between  text-gray-600 text-sm">
        <span>Current Month: <strong>23,214</strong></span> {/* Current active user count */}
        <span className="text-green-500">+8.06% vs. Previous Month</span> {/* Percentage change */}
      </div>
    </div>
  );
};

export default ActiveUsers;
