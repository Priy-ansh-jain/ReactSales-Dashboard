import { useState } from 'react';
import { stocks, cryptocurrencies } from "../../data/dummy";
import { FaBitcoin, FaEthereum, FaDollarSign } from 'react-icons/fa'; // Example icons
import { Header } from '../components';

const Ticket = () => {
  const [isCrypto, setIsCrypto] = useState(false); // State to toggle between stocks and crypto
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // State for sorting order

  // Function to toggle between stocks and cryptocurrencies
  const toggleView = () => {
    setIsCrypto(!isCrypto);
  };

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to handle sorting
  const handleSort = (type) => {
    const sortedData = (isCrypto ? cryptocurrencies : stocks).sort((a, b) => {
      if (type === 'name') {
        return sortOrder === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      }
    });
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    return sortedData;
  };

  // Filter tickets based on search term
  const filteredTickets = (isCrypto ? cryptocurrencies : stocks).filter(ticket =>
    ticket.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper function to render icons based on cryptocurrency names
  const renderIcon = (name) => {
    if (name.toLowerCase().includes('bitcoin')) {
      return <FaBitcoin className="text-yellow-500" />;
    } else if (name.toLowerCase().includes('ethereum')) {
      return <FaEthereum className="text-purple-600" />;
    } else {
      return <FaDollarSign className="text-green-500" />;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Header title="Tickets" />
      <div className="flex justify-center mb-6">
        <button
          onClick={toggleView}
          className={`px-6 py-2 rounded-l-lg font-semibold transition-colors ${!isCrypto ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
            }`}
        >
          Stocks
        </button>
        <button
          onClick={toggleView}
          className={`px-6 py-2 rounded-r-lg font-semibold transition-colors ${isCrypto ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
            }`}
        >
          Cryptocurrencies
        </button>
      </div>

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border rounded-lg p-3 w-full shadow-sm focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Table to display tickets */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse">
          <thead className="bg-blue-100 text-blue-700">
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Symbol</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Icon</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map(ticket => (
              <tr key={ticket.id} className="hover:bg-blue-50 transition-colors">
                <td className="border px-4 py-2">{ticket.name}</td>
                <td className="border px-4 py-2">{ticket.symbol}</td>
                <td className="border px-4 py-2 text-right">${ticket.price.toLocaleString()}</td>
                <td className="border px-4 py-2 text-center">{renderIcon(ticket.name)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ticket;
