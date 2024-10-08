import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { CiExport } from 'react-icons/ci';

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const StackedBarChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: '#007bff',
        borderColor: '#007bff',
        borderWidth: 1,
        borderRadius: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#8a909d',
        },
        grid: {
          color: '#e7eaf3',
        },
      },
      x: {
        ticks: {
          color: '#8a909d',
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="p-2 bg-white rounded-lg shadow-md h-[240px]"> {/* Adjusted height of the container */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg  font-semibold mb-4">Active Users</h2>
        <button className="text-sm flex gap-2 align-Item ">
          <CiExport className="bg-gray-200  w-6 h-6 rounded-md unded-lg text-black " />
          <span className='text-xs'>export</span>
        </button>
      </div>
      <div className="mt-2 h-[170px]"> {/* Adjusted height of the chart */}
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default StackedBarChart;
