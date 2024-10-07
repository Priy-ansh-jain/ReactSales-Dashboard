import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { HiOutlineDotsHorizontal } from "react-icons/hi";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const YearlySalesChart = () => {
  // Sample data for the chart
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: '2023',
        data: [3000, 4000, 2000, 5000, 6000, 7000, 5000, 8000, 10000, 12000, 15000, 13000],
        borderColor: '#0073cf',
        backgroundColor: 'rgba(0, 115, 207, 0.2)',
        fill: true,
        tension: 0.4, // Smooth curves for the line
      },
      {
        label: '2022',
        data: [2000, 3000, 4000, 3500, 6000, 5000, 6000, 7000, 8000, 10000, 12000, 10000],
        borderColor: '#66BB6A',
        backgroundColor: 'rgba(102, 187, 106, 0.2)',
        fill: true,
        tension: 0.4, // Smooth curves for the line
      },
    ],
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-[300px]">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-700">Yearly Sales</h2>
        <button>
          <HiOutlineDotsHorizontal className="hover:bg-gray-200 rounded-full p-2" />
        </button>
      </div>
      <div className="mt-4 h-[200px]">
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
