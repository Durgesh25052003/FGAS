import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import { db } from '../../../config';

const UserSchemes = () => {
  const [schemes, setSchemes] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState(null);

  const handleViewDetails = (scheme) => {
    setSelectedScheme(scheme);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedScheme(null);
  };

 const fetchSchemes = async () => {
    try {
     const schemes =  await getDocs(collection(db, 'schemes'));
     const schemeData =schemes.docs.map((doc)=>doc.data())
     setSchemes(schemeData);
    }catch (error) {
     console.log(error);
    }
}

 useEffect(()=>{
  fetchSchemes();
 },[])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-poppins p-8">
      <h2 className="text-3xl font-bold text-blue-700 mb-8">Available Schemes</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schemes.map((scheme) => (
          <div key={scheme.id} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold text-blue-700 mb-2">{scheme.name}</h3>
            <p className="text-gray-600 mb-4 line-clamp-3">{scheme.description}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors flex items-center"
              onClick={() => handleViewDetails(scheme)}
            >
              <FaInfoCircle className="mr-2" /> View Details
            </button>
          </div>
        ))}
      </div>

      {/* Scheme Details Modal */}
      {showModal && selectedScheme && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full">
            <h3 className="text-2xl font-bold text-blue-700 mb-4">{selectedScheme.name}</h3>
            <div className="space-y-3 mb-6">
              <p><strong>Description:</strong> {selectedScheme.description}</p>
              <p><strong>Eligibility:</strong> {selectedScheme.eligibility}</p>
              <p><strong>Benefits:</strong> {selectedScheme.benefits}</p>
              <p><strong>Apply Link:</strong> <a href={selectedScheme.applyLink} className="text-blue-600 hover:underline">Click here to apply</a></p>
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

export default UserSchemes;