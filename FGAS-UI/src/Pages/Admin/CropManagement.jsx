import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaFilter, FaImage } from 'react-icons/fa';
import { Image } from 'cloudinary-react';

const CropManagement = () => {
  const [crops, setCrops] = useState([
    {
      id: 1,
      name: "Wheat",
      season: "Rabi",
      idealTemp: "20-25°C",
      waterRequirement: "450-650mm",
      soilType: "Loamy",
      imageUrl: "sample_image_url"
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [imageSelected, setImageSelected] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset","FGAS-img-preset"); // Replace with your Cloudinary upload preset
    setLoading(true);

    try {
      const res = await axios.post("https://api.cloudinary.com/v1_1/digao11ku/image/upload", data)
      const file = await res.data.secure_url;
      setImageSelected(file);
      setLoading(false);
    } catch (error) {
      console.error("Upload failed:", error);
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-green-700">Crop Management</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700"
        >
          <FaPlus /> <span>Add New Crop</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex items-center justify-between">
          <div className="flex space-x-4 items-center">
            <div className="relative">
              <input
                type="search"
                placeholder="Search crops..."
                className="pl-10 pr-4 py-2 border rounded-lg w-64"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            <select className="border rounded-lg px-4 py-2">
              <option>All Seasons</option>
              <option>Rabi</option>
              <option>Kharif</option>
              <option>Zaid</option>
            </select>
          </div>
        </div>
      </div>

      {/* Crops Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {crops.map((crop) => (
          <div key={crop.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 overflow-hidden">
              <Image
                cloudName="your_cloud_name" // Replace with your cloud name
                publicId={crop.imageUrl}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">{crop.name}</h3>
              <div className="mt-2 space-y-2">
                <p className="text-sm text-gray-600">Season: {crop.season}</p>
                <p className="text-sm text-gray-600">Temperature: {crop.idealTemp}</p>
                <p className="text-sm text-gray-600">Water Requirement: {crop.waterRequirement}</p>
                <p className="text-sm text-gray-600">Soil Type: {crop.soilType}</p>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button className="text-blue-600 hover:text-blue-900">
                  <FaEdit />
                </button>
                <button className="text-red-600 hover:text-red-900">
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Crop Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 w-full max-w-2xl">
            <h3 className="text-2xl font-bold text-green-700 mb-6">Add New Crop</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Crop Name</label>
                <input type="text" className="w-full border rounded-lg px-4 py-2" />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Season</label>
                <select className="w-full border rounded-lg px-4 py-2">
                  <option>Rabi</option>
                  <option>Kharif</option>
                  <option>Zaid</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Ideal Temperature</label>
                  <input type="text" className="w-full border rounded-lg px-4 py-2" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Water Requirement</label>
                  <input type="text" className="w-full border rounded-lg px-4 py-2" />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Soil Type</label>
                <input type="text" className="w-full border rounded-lg px-4 py-2" />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Crop Image</label>
                <div className="border-2 border-dashed rounded-lg p-4 text-center">
                  {imageSelected ? (
                    <div className="relative">
                      <img src={imageSelected} alt="Preview" className="max-h-40 mx-auto" />
                      <button
                        onClick={() => setImageSelected("")}
                        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div>
                      <input
                        type="file"
                        onChange={uploadImage}
                        className="hidden"
                        id="cropImage"
                        accept="image/*"
                      />
                      <label
                        htmlFor="cropImage"
                        className="cursor-pointer flex flex-col items-center space-y-2"
                      >
                        <FaImage className="text-4xl text-gray-400" />
                        <span className="text-gray-500">Click to upload image</span>
                      </label>
                    </div>
                  )}
                  {loading && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
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
                  Add Crop
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CropManagement;