
const Email = ({ onClose }) => {
  return (
    <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg p-4 z-50">
      <button onClick={onClose} className="absolute top-2 right-2 text-gray-600">
        <span className="text-xl">×</span>
      </button>
      <h2 className="text-xl font-bold mb-2">New Email</h2>
      <p>This is where the email content will be displayed.</p>
      <p>More details can be added here...</p>
    </div>
  );
};

export default Email;
