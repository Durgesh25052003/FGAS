import { addDoc, collection, doc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaFilter } from 'react-icons/fa';
import { auth, db } from '../../../config';
import toast, { Toaster } from 'react-hot-toast';

const SchemeManagement = () => {
  const [schemes, setSchemes] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newScheme, setNewScheme] = useState({
    name: '',
    description: '',
    budget: '',
    deadline: '',
    status: 'Active'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewScheme(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const fetchSchemes=async()=>{
    const schemeSnapShot= await getDocs(collection(db,"schemes"))
    const schemes = schemeSnapShot.docs.map((doc) => ({
      id: doc.id,         // ⭐ this is important
      ...doc.data(),      // get all crop fields
    }));
    console.log(schemes)
    setSchemes(schemes);
  }

  useEffect(()=>{
    fetchSchemes()
  },[])

  const handleSchemesUpload = async (e) => {
    try {
      e.preventDefault();
      setSchemes([...schemes, newScheme]);
      setShowAddModal(false);
      console.log(auth.currentUser)
      console.log(newScheme)
     
      // Add your logic to upload schemes here
      const collectionRef = collection(db, "schemes");
      await addDoc(collectionRef, newScheme);
      toast.success("Scheme Uploaded Successfully")
      setNewScheme({
        name: '',
        description: '',
        budget: '',
        deadline: '',
        status: 'Active'
      });
    } catch (error) {
      console.log(error.message)
      toast.error("Something went wrong")
    }
  }
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <Toaster/>
        <h2 className="text-3xl font-bold text-green-700">Schemes Management</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700"
        >
          <FaPlus /> <span>Add New Scheme</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex items-center justify-between">
          <div className="flex space-x-4 items-center">
            <div className="relative">
              <input
                type="search"
                placeholder="Search schemes..."
                className="pl-10 pr-4 py-2 border rounded-lg w-64"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            <select className="border rounded-lg px-4 py-2">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>Draft</option>
            </select>
          </div>
          <button className="flex items-center space-x-2 text-gray-600">
            <FaFilter /> <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Schemes Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Scheme Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Beneficiaries
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Budget
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Deadline
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {schemes.map((scheme) => (
              <tr key={scheme.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{scheme.name}</div>
                  <div className="text-sm text-gray-500">{scheme.description}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {scheme.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500">{scheme.beneficiaries}</td>
                <td className="px-6 py-4 text-gray-500">{scheme.budget}</td>
                <td className="px-6 py-4 text-gray-500">{scheme.deadline}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button className="text-blue-600 hover:text-blue-900">
                    <FaEdit />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add New Scheme Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 w-full max-w-2xl">
            <h3 className="text-2xl font-bold text-green-700 mb-6">Add New Scheme</h3>
            <form className="space-y-4" onSubmit={
              handleSchemesUpload
            }>
              <div>
                <label className="block text-gray-700 mb-2">Scheme Name</label>
                <input
                  type="text"
                  name="name"
                  value={newScheme.name}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={newScheme.description}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-4 py-2"
                  rows="3"
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Budget</label>
                  <input
                    type="text"
                    name="budget"
                    value={newScheme.budget}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Deadline</label>
                  <input
                    type="date"
                    name="deadline"
                    value={newScheme.deadline}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-4 py-2"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Create Scheme
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchemeManagement;