import React, { useState } from 'react';
import { FaClipboardList, FaUser, FaFileAlt, FaCalendarAlt, FaRupeeSign } from 'react-icons/fa';

const mockApplications = [
  { id: 1, farmer: 'FRM12345', name: 'Ramesh Kumar', scheme: 'Crop Subsidy', date: '2024-06-01', amount: 5000, status: 'Pending', description: 'Subsidy for wheat crop due to drought.' },
  { id: 2, farmer: 'FRM67890', name: 'Sita Devi', scheme: 'Irrigation Policy', date: '2024-05-28', amount: 12000, status: 'Approved', description: 'Request for irrigation equipment.' },
  { id: 3, farmer: 'FRM54321', name: 'Amit Singh', scheme: 'Seed Grant', date: '2024-05-25', amount: 3000, status: 'Rejected', description: 'Seed grant for maize.' },
];

const Applications = () => {
  const [applications, setApplications] = useState(mockApplications);
  const [selectedApp, setSelectedApp] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleViewDetails = (app) => {
    setSelectedApp(app);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedApp(null);
  };

  const handleStatusChange = (status) => {
    setApplications(applications.map(app =>
      app.id === selectedApp.id ? { ...app, status } : app
    ));
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white font-poppins ml-64 p-8">
      <h2 className="text-3xl font-bold text-green-700 mb-8 flex items-center">
        <FaClipboardList className="mr-3" /> Subsidy/Policy Applications
      </h2>
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farmer ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scheme/Policy</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {applications.map(app => (
              <tr key={app.id} className="hover:bg-green-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap flex items-center"><FaUser className="mr-2 text-green-600" />{app.farmer}</td>
                <td className="px-6 py-4 whitespace-nowrap">{app.name}</td>
                <td className="px-6 py-4 whitespace-nowrap flex items-center"><FaFileAlt className="mr-2 text-green-600" />{app.scheme}</td>
                <td className="px-6 py-4 whitespace-nowrap flex items-center"><FaCalendarAlt className="mr-2 text-green-600" />{app.date}</td>
                <td className="px-6 py-4 whitespace-nowrap flex items-center"><FaRupeeSign className="mr-2 text-green-600" />{app.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${app.status === 'Approved' ? 'bg-green-100 text-green-700' : app.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{app.status}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-green-600 hover:text-green-800" onClick={() => handleViewDetails(app)}>View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Popup */}
      {showModal && selectedApp && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg relative">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl" onClick={handleCloseModal}>&times;</button>
            <h3 className="text-2xl font-bold text-green-700 mb-4">Application Details</h3>
            <p><strong>Farmer ID:</strong> {selectedApp.farmer}</p>
            <p><strong>Name:</strong> {selectedApp.name}</p>
            <p><strong>Scheme/Policy:</strong> {selectedApp.scheme}</p>
            <p><strong>Date:</strong> {selectedApp.date}</p>
            <p><strong>Amount:</strong> ₹{selectedApp.amount}</p>
            <p className="mb-4"><strong>Description:</strong> {selectedApp.description}</p>
            <div className="flex space-x-4 mt-6">
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700" onClick={() => handleStatusChange('Approved')}>Approve</button>
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700" onClick={() => handleStatusChange('Rejected')}>Reject</button>
              <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400" onClick={handleCloseModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Applications;