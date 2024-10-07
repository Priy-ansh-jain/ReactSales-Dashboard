import { useEffect, useState } from 'react';
import { FaPaypal, FaWallet, FaCcVisa } from 'react-icons/fa'; // Importing icons from react-icons
import axios from 'axios';
import { recentTransactions } from '../../../data/dummy';

// Payment Gateway Component
const PaymentDashboard = () => {
  const [cryptoPrices, setCryptoPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const [showTransactions, setShowTransactions] = useState(false);

  const paymentGateways = [
    { icon: <FaPaypal className="text-blue-600" />, name: 'Paypal', amount: 6235 },
    { icon: <FaWallet className="text-green-600" />, name: 'Wallet', amount: 235 },
    { icon: <FaCcVisa className="text-blue-800" />, name: 'Credit Card', amount: 235 },
  ];

  const toggleTransactions = () => {
    setShowTransactions(prevState => !prevState);
  };

  useEffect(() => {
    const fetchCryptoPrices = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,litecoin&vs_currencies=usd');
        setCryptoPrices(response.data);
      } catch (error) {
        console.error('Error fetching crypto prices:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoPrices();
  }, []);

  return (
    <div className="p-2 h-full flex flex-col justify-between">
      {/* Payment Gateways Section */}
      {!showTransactions && (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4 h-[220px] overflow-auto">
          <h2 className="text-lg font-semibold mb-2">Payment Gateways</h2>
          <div className="mt-2">
            {paymentGateways.map((gateway, index) => (
              <div key={index} className="flex items-center justify-between p-2 border-b border-gray-200 hover:bg-gray-100 transition duration-200">
                <div className="flex items-center">
                  <div className="text-2xl mr-3">{gateway.icon}</div>
                  <span className="font-medium text-gray-800">{gateway.name}</span>
                </div>
                <span className="font-semibold text-gray-700">${gateway.amount}</span>
              </div>
            ))}
            {/* Display Cryptocurrency Prices */}
            {!loading && (
              <div>
                <h3 className="font-semibold mt-4">Cryptocurrency Prices:</h3>
                {Object.keys(cryptoPrices).map((key, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border-b border-gray-200 hover:bg-gray-100 transition duration-200">
                    <span className="font-medium text-gray-800 capitalize">{key}</span>
                    <span className="font-semibold text-gray-700">${cryptoPrices[key].usd}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Button to toggle Recent Transactions */}
      <button
        onClick={toggleTransactions}
        className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        {showTransactions ? 'Hide Transactions' : 'Show Transactions'}
      </button>

      {/* Recent Transactions Section (Add your transactions data here) */}
      {showTransactions && (
        <div className="bg-white rounded-lg shadow-md p-2 mt-4 h-[220px] overflow-auto">
          <h2 className="text-lg font-semibold mb-2">Recent Transactions</h2>
          <div>
            {recentTransactions.map((transaction, index) => (
              <div key={index} className="flex items-center justify-between p-2 border-b border-gray-200 hover:bg-gray-100 transition duration-200">
                <div className="flex items-center">
                  <div className="text-2xl" style={{ color: transaction.iconColor, backgroundColor: transaction.iconBg, borderRadius: '50%', padding: '8px' }}>
                    {transaction.icon}
                  </div>
                  <div className="ml-3">
                    <span className="font-medium text-gray-800">{transaction.title}</span>
                    <p className="text-gray-600">{transaction.desc}</p>
                  </div>
                </div>
                <span className={`font-semibold text-gray-700 ${transaction.amount.startsWith('-') ? 'text-red-600' : 'text-green-600'}`}>
                  {transaction.amount}
                </span>
                {transaction.percentage && (
                  <span className={`text-${transaction.pcColor} ml-2`}>
                    {transaction.percentage}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentDashboard;
