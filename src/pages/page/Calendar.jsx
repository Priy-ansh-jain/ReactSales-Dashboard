import { useState } from 'react';
import dayjs from 'dayjs';
import { Button } from "../../components/ui/button"; // Importing a Button from ShadCN
import { Header } from '../components';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [events, setEvents] = useState({}); // Store events for each date
  const [newTicket, setNewTicket] = useState({ name: '', price: '', deposit: '' }); // Input for new ticket

  const today = dayjs(); // Current date
  const daysInMonth = currentDate.daysInMonth();
  const firstDayOfMonth = currentDate.startOf('month').day();

  // Function to change the current month
  const changeMonth = (monthOffset) => {
    setCurrentDate(currentDate.add(monthOffset, 'month'));
  };

  // Function to render the days of the week
  const renderDaysOfWeek = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return daysOfWeek.map((day, index) => (
      <div key={index} className="text-center font-semibold">{day}</div>
    ));
  };

  // Function to render the days in the current month
  const renderDaysInMonth = () => {
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>);
    }

    // Actual days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = currentDate.date(day); // Create a dayjs object for the current day in the loop

      // Check if this day is the same as today's date
      const isToday = date.isSame(today, 'day');

      days.push(
        <div
          key={day}
          className={`h-12 text-center border border-gray-200 hover:bg-gray-100 rounded-md flex items-center justify-center ${isToday ? 'bg-blue-500 text-white font-bold' : ''}`}
          onClick={() => handleDateClick(date)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  // Function to handle date click
  const handleDateClick = (date) => {
    const dateKey = date.format('YYYY-MM-DD');
    if (events[dateKey]) {
      alert(`Tickets for ${dateKey}:\n` + events[dateKey].map(e => `${e.name}: $${e.price}, Deposit: $${e.deposit}`).join('\n'));
    } else {
      alert(`No tickets for ${dateKey}`);
    }
  };

  // Function to add a new ticket
  const addTicket = () => {
    const dateKey = currentDate.format('YYYY-MM-DD');
    const ticket = {
      name: newTicket.name,
      price: parseFloat(newTicket.price) || 0,
      deposit: parseFloat(newTicket.deposit) || 0,
    };

    setEvents(prevEvents => ({
      ...prevEvents,
      [dateKey]: [...(prevEvents[dateKey] || []), ticket],
    }));

    // Reset input fields
    setNewTicket({ name: '', price: '', deposit: '' });
  };

  // Function to get highest and lowest deposits for a date
  const getDepositStats = (date) => {
    const dateKey = date.format('YYYY-MM-DD');
    const ticketDeposits = events[dateKey] || [];
    const deposits = ticketDeposits.map(ticket => ticket.deposit);
    const highest = Math.max(...deposits, 0);
    const lowest = deposits.length > 0 ? Math.min(...deposits) : 0;

    return { highest, lowest };
  };

  return (
    <div className="container mx-auto p-4">
      <Header title="Calendar" />

      <div className="flex justify-between items-center mb-4">
        <Button onClick={() => changeMonth(-1)}>Previous</Button>
        <h2 className="text-xl font-bold">{currentDate.format('MMMM YYYY')}</h2>
        <Button onClick={() => changeMonth(1)}>Next</Button>
      </div>

      <div className="grid grid-cols-7 gap-4 mb-4">
        {renderDaysOfWeek()}
      </div>

      <div className="grid grid-cols-7 gap-4">
        {renderDaysInMonth()}
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-bold">Add Ticket</h3>
        <input
          type="text"
          placeholder="Ticket Name"
          value={newTicket.name}
          onChange={(e) => setNewTicket({ ...newTicket, name: e.target.value })}
          className="border rounded p-1 mr-2"
        />
        <input
          type="number"
          placeholder="Price"
          value={newTicket.price}
          onChange={(e) => setNewTicket({ ...newTicket, price: e.target.value })}
          className="border rounded p-1 mr-2"
        />
        <input
          type="number"
          placeholder="Deposit"
          value={newTicket.deposit}
          onChange={(e) => setNewTicket({ ...newTicket, deposit: e.target.value })}
          className="border rounded p-1 mr-2"
        />
        <Button onClick={addTicket}>Add Ticket</Button>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-bold">Deposit Stats</h3>
        {getDepositStats(currentDate).highest > 0 || getDepositStats(currentDate).lowest > 0 ? (
          <>
            <p>Highest Deposit: ${getDepositStats(currentDate).highest}</p>
            <p>Lowest Deposit: ${getDepositStats(currentDate).lowest > 0 ? getDepositStats(currentDate).lowest : 'No deposits yet'}</p>
          </>
        ) : (
          <p>No tickets added for this date.</p>
        )}
      </div>
    </div>
  );
};

export default Calendar;
