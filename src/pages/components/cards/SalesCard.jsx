import { useState, useEffect } from 'react';
import axios from 'axios';

const SalesCard = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch sales data from the API
  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get('https://api.example.com/sales');
        setSalesData(response.data.sales);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch sales data');
        setLoading(false);
      }
    };
    fetchSalesData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">Sales Distribution</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {salesData.map((item, index) => (
          <div
            key={index}
            className="p-4 bg-blue-50 rounded-lg flex flex-col items-center justify-center text-center"
          >
            <h4 className="text-2xl font-bold text-gray-800">${item.amount}</h4>
            <p className="text-sm text-gray-500">{item.platform}</p>
            <p className="text-sm text-gray-400">{item.percentage}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesCard;
