import { useState } from 'react';
import { FaUsers, FaSearch, FaUser } from 'react-icons/fa';

const mockFarmers = [
  { id: 'FRM12345', name: 'Ramesh Kumar', village: 'Rampur', phone: '9876543210', land: '5 acres', photo: 'https://ui-avatars.com/api/?name=Ramesh+Kumar' },
  { id: 'FRM67890', name: 'Sita Devi', village: 'Lakhanpur', phone: '9123456780', land: '3 acres', photo: 'https://ui-avatars.com/api/?name=Sita+Devi' },
  { id: 'FRM54321', name: 'Amit Singh', village: 'Basantpur', phone: '9988776655', land: '7 acres', photo: 'https://ui-avatars.com/api/?name=Amit+Singh' },
];

const Farmers = () => {
  const [farmers] = useState(mockFarmers);
  const [search, setSearch] = useState('');

  const filteredFarmers = farmers.filter(farmer =>
    farmer.name.toLowerCase().includes(search.toLowerCase()) ||
    farmer.id.toLowerCase().includes(search.toLowerCase()) ||
    farmer.village.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white font-poppins ml-64 p-8">
      <h2 className="text-3xl font-bold text-green-700 mb-8 flex items-center">
        <FaUsers className="mr-3" /> Farmers List
      </h2>
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center mb-6">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search by name, ID, or village..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-80"
          />
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farmer ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Village</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Land</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {filteredFarmers.map(farmer => (
              <tr key={farmer.id} className="hover:bg-green-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={farmer.photo} alt={farmer.name} className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap flex items-center"><FaUser className="mr-2 text-green-600" />{farmer.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{farmer.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{farmer.village}</td>
                <td className="px-6 py-4 whitespace-nowrap">{farmer.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">{farmer.land}</td>
              </tr>
            ))}
            {filteredFarmers.length === 0 && (
              <tr><td colSpan="6" className="text-center py-4 text-gray-400">No farmers found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Farmers;