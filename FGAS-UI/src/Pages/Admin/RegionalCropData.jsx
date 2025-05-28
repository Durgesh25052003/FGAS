import axios from "axios";
import { useEffect, useState } from "react"; // Import useState

const RegionalCropData = () => {
  const [crops, setCrops] = useState([]); // Add state to store crops
  const [loading, setLoading] = useState(true); // Add loading state
  const [selectedCrop, setSelectedCrop] = useState(null); // Add state for selected crop
  const [error, setError] = useState(null); // Add error state

  const fetchCrops = async () => {
    try {
      const response = await axios.get(
        "https://api.data.gov.in/resource/35be999b-0208-4354-b557-f6ca9a5355de?api-key=579b464db66ec23bdd000001c515bfbe401749206665aa52eee4079e&format=json&limit=10"
      );
      // console.log(response.data.records); // Removed console log
      setCrops(response.data.records); // Update state with fetched data
      console.log(crops)
      console.log(response.data.records[0]['crop'])
      setLoading(false); // Set loading to false
    } catch (error) {
      console.error("Error fetching crop data:", error); // Log the actual error
      setError(error); // Set error state
      setLoading(false); // Set loading to false even on error
    }
  };

  useEffect(() => {
    fetchCrops();
  }, [selectedCrop]); // Empty dependency array to run only once on mount
 const handleCropSearch = () => {
    try {
     const filteredCrop=crops.filter((crop)=>{
       return crop.crop.toLowerCase().includes(selectedCrop.toLowerCase())
     }
    )
     console.log(filteredCrop)
    }catch(error){
      console.log(error)
    }
}
  return (
    <div>
      <h1>Regional Crop Data</h1>
      <input type="text" onChange={(e)=>{
        setSelectedCrop(prev=>prev+e.target.value)
      }}/>
      <button onClick={()=>handleCropSearch()}>Submit</button>
      {loading && <p>Loading crop data...</p>}
      {error && <p>Error loading crop data: {error.message}</p>}
      {!loading && !error && crops.length > 0 && (
        <ul>
          {crops.map((crop, index) => (
            <li key={index}> {/* Using index as key, better to use a unique ID if available */}
              {/* Display some crop information, adjust based on your data structure */}
              {crop['state_name']}::
              {crop['crop']}:: {crop['district_name']} -- {crop['season']}
            </li>
          ))}
        </ul>
      )}
      {!loading && !error && crops.length === 0 && (
        <p>No crop data available.</p>
      )}
    </div>
  );
};

export default RegionalCropData;