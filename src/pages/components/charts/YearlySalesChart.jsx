import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { HiOutlineDotsHorizontal } from "react-icons/hi";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const YearlySalesChart = () => {
  // Sample data for the chart
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: '2023',
        data: [1000, 5000, 4200, 9000, 6000, 16000, 15000, 5000, 4200, 10000, 6000, 13000],
        borderColor: '#0073cf',
        backgroundColor: 'rgba(0, 115, 207, 0.2)',
        fill: true,
        tension: 0.4, // Smooth curves for the line
      },
      {
        label: '2022',
        data: [0, 2000, 3000, 7800, 4000, 13000, 12000, 3000, 2400, 8000, 5000, 10000],
        borderColor: '#E0EFFE',
        backgroundColor: '#B9DFFE',
        fill: true,
        tension: 0.4, // Smooth curves for the line
      },
    ],
  };

  return (
    <div className="bg-white rounded-lg shadow-md  p-2 h-[234px]">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-700">Yearly Sales</h2>
        <button>
          <HiOutlineDotsHorizontal className="hover:bg-gray-200 rounded-full p-2" />
        </button>
      </div>
      <div className="mt-4 h-[170px]">
        <Line data={data} options={{
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  return `$${tooltipItem.parsed.y.toLocaleString()}`;
                },
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }} />
      </div>
    </div>
  );
};

export default YearlySalesChart;
