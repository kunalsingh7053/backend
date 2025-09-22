import React from 'react'
import { useNavigate } from 'react-router-dom';


const UpdateProfile = () => {
  const navigate = useNavigate();
  // Example initial user data (replace with props or context as needed)

   
  const [firstName, setFirstName] = React.useState('John');
  const [lastName, setLastName] = React.useState('Doe');
  const [email, setEmail] = React.useState('john.doe@example.com');
  const [oldPassword, setOldPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [message, setMessage] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('Profile updated!');
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-2" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <form
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 flex flex-col gap-6 relative"
        onSubmit={handleSubmit}
      >
        {/* X Button top right */}
        <button
          type="button"
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white text-2xl font-bold"
          onClick={() => navigate(-1)}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4 text-center">Update Profile</h2>
        <div>
          <label className="block text-base font-medium mb-1">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label className="block text-base font-medium mb-1">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label className="block text-base font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label className="block text-base font-medium mb-1">Old Password</label>
          <input
            type="password"
            value={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
            className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter old password"
          />
        </div>
        <div>
          <label className="block text-base font-medium mb-1">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter new password"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all text-lg mt-4"
        >
          Update
        </button>
        {message && <div className="text-green-600 text-center mt-2">{message}</div>}
      </form>
    </div>
  );
}

export default UpdateProfile
