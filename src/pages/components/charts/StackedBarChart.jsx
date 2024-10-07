import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

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
    <div className="p-4 bg-white rounded-lg shadow-md h-[300px]">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-700">Revenue Updates</h2>
        <button className="bg-gray-100 p-2 rounded-md text-sm">Export</button>
      </div>

      <div className="mt-4 h-[200px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default StackedBarChart;
