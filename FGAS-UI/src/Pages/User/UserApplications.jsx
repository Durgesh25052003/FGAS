import { addDoc, collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FaPlus, FaEye } from 'react-icons/fa';
import { db } from '../../../config';

const UserApplications = () => {
  const [complaints, setComplaints] = useState([
    { id: 1, subject: 'Water Supply Issue', date: '2023-01-15', status: 'Resolved', description: 'No water supply for 3 days in my area. Crops are drying.', resolution: 'Water supply restored on 2023-01-18.' },
    { id: 2, subject: 'Pesticide Quality', date: '2023-02-01', status: 'Pending', description: 'Received substandard pesticides from government-approved vendor.', resolution: '' },
    { id: 3, subject: 'Road Damage', date: '2023-03-10', status: 'Under Review', description: 'Road leading to my farm is severely damaged, making transport difficult.', resolution: '' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showComplaintForm, setShowComplaintForm] = useState(false);
  const [newComplaint, setNewComplaint] = useState({ subject: '', description: '' });

  const handleViewDetails = (complaint) => {
    setSelectedComplaint(complaint);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedComplaint(null);
  };

  const handleNewComplaintChange = (e) => {
    const { name, value } = e.target;
    setNewComplaint(prevState => ({ ...prevState, [name]: value }));
  };
  
 const fetchApplications =async()=>{
    const applicationRef = await getDocs(collection(db, "applications"));
    const applications = applicationRef.docs.map((doc) => ({...doc.data(), id: doc.id}));
    setComplaints(applications);
 }

 useEffect(()=>{
    fetchApplications();
  },[])

  // Complaint Form Logic and Submission

  const handleSubmitComplaint = async(e) => {
    e.preventDefault();
    if (newComplaint.subject && newComplaint.description) {
      const complaintId = complaints.length > 0 ? Math.max(...complaints.map(c => c.id)) + 1 : 1;
      const newComp = {
        id: complaintId,
        subject: newComplaint.subject,
        date: new Date().toISOString().slice(0, 10),
        status: 'Pending',
        description: newComplaint.description,
        resolution: ''
      };
      setComplaints(prevComplaints => [...prevComplaints, newComp]);
      // Firebase Store Logic
      const collectionRef = collection(db, "applications");
      await addDoc(collectionRef,newComp);
      setNewComplaint({ subject: '', description: '' });
      setShowComplaintForm(false);
      alert('Complaint submitted successfully!');
    } else {
      alert('Please fill in both subject and description.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-poppins p-8">
      <h2 className="text-3xl font-bold text-blue-700 mb-8">My Complaints</h2>

      <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-blue-700">My Submitted Complaints</h3>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors flex items-center"
            onClick={() => setShowComplaintForm(true)}
          >
            <FaPlus className="mr-2" /> Submit New Complaint
          </button>
        </div>

        {showComplaintForm && (
          <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h4 className="text-lg font-semibold mb-4">New Complaint</h4>
            <form onSubmit={handleSubmitComplaint}>
              <div className="mb-4">
                <label htmlFor="subject" className="block text-gray-700 text-sm font-bold mb-2">Subject:</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={newComplaint.subject}
                  onChange={handleNewComplaintChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  value={newComplaint.description}
                  onChange={handleNewComplaintChange}
                  rows="4"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                ></textarea>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-400 transition-colors"
                  onClick={() => setShowComplaintForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
                >
                  Submit Complaint
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="overflow-x-auto mt-6">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-3 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Subject</th>
                <th className="py-3 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                <th className="py-3 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="py-3 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((comp) => (
                <tr key={comp.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b border-gray-200 text-sm text-gray-800">{comp.subject}</td>
                  <td className="py-3 px-4 border-b border-gray-200 text-sm text-gray-800">{comp.date}</td>
                  <td className="py-3 px-4 border-b border-gray-200 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      comp.status === 'Resolved' ? 'bg-green-200 text-green-800' :
                      comp.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' :
                      'bg-red-200 text-red-800'
                    }`}>
                      {comp.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 text-sm">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 transition-colors flex items-center"
                      onClick={() => handleViewDetails(comp)}
                    >
                      <FaEye className="mr-1" /> View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {showModal && selectedComplaint && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-2xl font-bold text-blue-700 mb-4">Complaint Details</h3>
            <div className="space-y-3 mb-6">
              <p><strong>Subject:</strong> {selectedComplaint.subject}</p>
              <p><strong>Date:</strong> {selectedComplaint.date}</p>
              <p><strong>Status:</strong> <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                selectedComplaint.status === 'Resolved' ? 'bg-green-200 text-green-800' :
                selectedComplaint.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' :
                'bg-red-200 text-red-800'
              }`}>{selectedComplaint.status}</span></p>
              <p><strong>Description:</strong> {selectedComplaint.description}</p>
              {selectedComplaint.resolution && <p><strong>Resolution:</strong> {selectedComplaint.resolution}</p>}
            </div>
            <div className="flex justify-end">
              <button
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-400 transition-colors"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserApplications;