import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { initialUsers } from '../../data/dummy';
import { Header } from '../components';

// Initial list of 20 users (customized with deposit and login time)


const Contacts = () => {
  const [users, setUsers] = useState(initialUsers);
  const [newUser, setNewUser] = useState({ name: '', email: '', deposit: '', product: '', loginTime: '', profilePhoto: '' });

  // Add User function
  const addUser = () => {
    if (newUser.name && newUser.email && newUser.deposit && newUser.product && newUser.loginTime && newUser.profilePhoto) {
      setUsers([...users, { id: users.length + 1, ...newUser }]);
      setNewUser({ name: '', email: '', deposit: '', product: '', loginTime: '', profilePhoto: '' }); // Reset input fields
    } else {
      alert('Please fill in all fields');
    }
  };

  // Remove User function
  const removeUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <Header title="Contacts" />


      {/* Table of Users */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Profile</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Deposit</th>
              <th className="border border-gray-300 px-4 py-2">Tickets</th>
              <th className="border border-gray-300 px-4 py-2">Login Time</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border border-gray-300 px-4 py-2">
                  <img src={user.profilePhoto} alt={`${user.name}'s profile`} className="w-10 h-10 rounded-full" />
                </td>
                <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                <td className="border border-gray-300 px-4 py-2">${user.deposit}</td>
                <td className="border border-gray-300 px-4 py-2">{user.product}</td> {/* Ensure this is product */}
                <td className="border border-gray-300 px-4 py-2">{user.loginTime}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <Button className="bg-red-500 text-white" onClick={() => removeUser(user.id)}>
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Form */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Add New User</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="border rounded-lg p-2 w-full"
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="border rounded-lg p-2 w-full"
          />
          <input
            type="number"
            placeholder="Deposit"
            value={newUser.deposit}
            onChange={(e) => setNewUser({ ...newUser, deposit: e.target.value })}
            className="border rounded-lg p-2 w-full"
          />
          <input
            type="text"
            placeholder="Tickets"
            value={newUser.product}
            onChange={(e) => setNewUser({ ...newUser, product: e.target.value })}
            className="border rounded-lg p-2 w-full"
          />
          <input
            type="text"
            placeholder="Login Time"
            value={newUser.loginTime}
            onChange={(e) => setNewUser({ ...newUser, loginTime: e.target.value })}
            className="border rounded-lg p-2 w-full"
          />
          <input
            type="text"
            placeholder="Profile Photo URL"
            value={newUser.profilePhoto}
            onChange={(e) => setNewUser({ ...newUser, profilePhoto: e.target.value })}
            className="border rounded-lg p-2 w-full"
          />
        </div>
        <Button className="bg-blue-500 text-white" onClick={addUser}>
          Add User
        </Button>
      </div>
    </div>
  );
};

export default Contacts;