import { useState } from 'react';
import { Header } from '../components';
// Sample email data
const emailsData = [
  { id: 1, subject: 'Meeting Reminder', body: 'Don’t forget about the meeting at 10 AM tomorrow.' },
  { id: 2, subject: 'Project Update', body: 'The project is on schedule. Please review the latest changes.' },
  { id: 3, subject: 'Newsletter', body: 'Check out our latest news and updates!' },
  { id: 4, subject: 'Invoice', body: 'Your invoice for this month is attached.' },
];

const Email = () => {
  const [selectedEmail, setSelectedEmail] = useState(null);

  return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto p-6">
      <Header title="Gmail" />
      {/* Inbox List */}
      <div className="bg-gray-100 w-full md:w-1/3 p-4 rounded-lg shadow-lg mr-4">
        <h2 className="text-2xl font-bold mb-4">Inbox</h2>
        <div className="overflow-y-auto h-80">
          {emailsData.map((email) => (
            <div
              key={email.id}
              className="p-2 hover:bg-gray-200 cursor-pointer rounded-lg"
              onClick={() => setSelectedEmail(email)}
            >
              <h3 className="font-semibold">{email.subject}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Email Viewer */}
      <div className="bg-white w-full md:w-2/3 p-4 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Email Viewer</h2>
        {selectedEmail ? (
          <>
            <h3 className="text-xl font-bold mb-2">{selectedEmail.subject}</h3>
            <p>{selectedEmail.body}</p>
          </>
        ) : (
          <p className="text-gray-500">Select an email to read</p>
        )}
      </div>
    </div>
  );
};

export default Email;
