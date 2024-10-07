import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import axios from 'axios';

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const SalesOverview = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for expenses and profit
  const [expenses, setExpenses] = useState(0); // Initialize expenses state
  const [profit, setProfit] = useState(0); // Initialize profit state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data); // Set the fetched products in state

        // Calculate total sales
        const totalSales = response.data.reduce((acc, product) => acc + product.price, 0);

        // Define expenses and profit based on total sales
        const calculatedExpenses = totalSales * 0.25; // Example: 25% of total sales as expenses
        const calculatedProfit = calculatedExpenses * 2; // Profit is double the expenses

        setExpenses(calculatedExpenses); // Set expenses state
        setProfit(calculatedProfit); // Set profit state
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Calculate total amount
  const totalAmount = expenses + profit;

  // Data for the doughnut chart
  const data = {
    labels: ['Expenses', 'Profit'], // Only showing expenses and profit
    datasets: [
      {
        data: [expenses, profit], // Only expenses and profit data
        backgroundColor: ['#FFCE56', '#0073cf'], // Color for each segment
        hoverBackgroundColor: ['#FF6384', '#0abab5'],
      },
    ],
  };

  // Custom plugin to draw text in the center of the doughnut
  const centerTextPlugin = {
    id: 'centerText',
    beforeDraw: (chart) => {
      const { ctx, chartArea } = chart;
      if (!chartArea) return;

      const { width, height, x, y } = chartArea;
      ctx.save();
      ctx.font = 'bold 20px Arial'; // Increased font size for visibility
      ctx.textAlign = 'center';
      ctx.fillStyle = '#000';

      // Draw total amount in the center
      ctx.fillText(`Total: $${totalAmount.toFixed(2)}`, x + width / 2, y + height / 2); // Format to two decimal places
      ctx.restore();
    },
  };

  return (
    <div className="rounded-lg w-full h-full p-2 shadow-md bg-white">
      <div className='flex justify-between items-center mb-4'>
        <h2 className="text-lg font-semibold">Sales Overview</h2>
        <button>
          <HiOutlineDotsHorizontal className='text-xl hover:bg-gray-200 rounded-full p-1' />
        </button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="h-48 md:h-[full] lg:h-[full] ">
          <Doughnut
            data={data}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                centerText: { // Use the custom plugin
                  display: true,
                },
              },
            }}
            plugins={[centerTextPlugin]} // Register the custom plugin
          />
        </div>
      )}
      <div className="mt-4 text-center">

        <p className="text-lg font-bold">Total Amount: <span className="text-xl">${totalAmount.toFixed(2)}</span></p>
      </div>
    </div>
  );
};

export default SalesOverview;
