import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/footer";
import axios from "axios";
import "./fertilizer.css";

const FertilizerForm = () => {
  const [district, setdistrict] = useState("");
  const [soil, setsoil] = useState("");
  const [croptype, setcroptype] = useState("");
  const [nitrogen, setNitrogen] = useState("");
  const [phosphorus, setPhosphorus] = useState("");
  const [potassium, setPotassium] = useState("");
  const [ph, setph] = useState("");
  const [rainfall, setrainfall] = useState("");
  const [temperature, setTemperature] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState("");
  const [errorMessages, setErrorMessages] = useState({});

  const validateInput = (value, min, max, isFloat = false) => {
    if (value === "") return "";

    const numValue = isFloat ? parseFloat(value) : parseInt(value);

    if (isNaN(numValue)) {
      return "Input must be a number";
    } else if (numValue < min || numValue > max) {
      return `Input must be within the range of ${min}-${max}`;
    } else {
      return "";
    }
  };

  const handleChange = (e, setter, min, max, isFloat = false) => {
    const value = e.target.value;
    const error = validateInput(value, min, max, isFloat);
    setter(value);
    setErrorMessages((prev) => ({
      ...prev,
      [e.target.name]: error
    }));
  };

  const handleSelectDistrict = (e) => setdistrict(e.target.value);
  const handleSelectsoil = (e) => setsoil(e.target.value);
  const handleSelectcrop = (e) => setcroptype(e.target.value);

  // Reset form
  const resetForm = () => {
    setdistrict("");
    setsoil("");
    setcroptype("");
    setNitrogen("");
    setPhosphorus("");
    setPotassium("");
    setph("");
    setrainfall("");
    setTemperature("");
    setErrorMessages({});
  };

  // Form submission
  const onSearchSubmit = async (e) => {
    e.preventDefault();

    if (
      !district ||
      !soil ||
      !croptype ||
      !nitrogen ||
      !phosphorus ||
      !potassium ||
      !ph ||
      !rainfall ||
      !temperature
    ) {
      alert("Please fill out all the fields");
      return;
    }

    console.log("Data to be sent:", {
      district,
      soil,
      croptype,
      nitrogen,
      phosphorus,
      potassium,
      ph,
      rainfall,
      temperature
    });

    setIsLoading(true);

    const url = "http://127.0.0.1:5000/predict";
    const body = JSON.stringify({
      district,
      soil,
      croptype,
      nitrogen,
      phosphorus,
      potassium,
      ph,
      rainfall,
      temperature
    });

    try {
      const response = await axios.post(url, body, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      const recommendedFertilizer = response.data["RecommendedFertilizer"];
      setRecommendation(recommendedFertilizer);
      alert("Fertilizer recommendation fetched successfully");
      resetForm(); // Clear all input fields after successful submission
    } catch (error) {
      console.error(
        "Error fetching fertilizer recommendation:",
        error.response ? error.response.data : error.message
      );
      alert(
        "Failed to fetch fertilizer recommendation. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <form onSubmit={onSearchSubmit}>
        <div className="grid place-items-center my-14">
          <div className="container bg-gray-100 p-10 grid place-items-center mt-14">
            <p className="text-2xl font-medium text-green-600 my-12">
              Predict the Fertilizer for your crop
            </p>
            <div className="flex flex-row my-2 w-3/5">
              <div>Select a District</div>
              <div className="ml-16">
                <select
                  value={district}
                  onChange={handleSelectDistrict}
                  className="border-2 border-green-600 p-2 rounded-sm w-64"
                >
                  <option value="">Select District</option>
                  <option value="Mangalore">Mangalore</option>
                  <option value="Coimbatore">Coimbatore</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Madurai">Madurai</option>
                  <option value="Hassan">Hassan</option>
                  <option value="Mysore">Mysore</option>
                </select>
              </div>
            </div>
            <div className="flex flex-row my-2 w-3/5">
              <div>Select a Soil Type</div>
              <div className="ml-16">
                <select
                  value={soil}
                  onChange={handleSelectsoil}
                  className="border-2 border-green-600 p-2 rounded-sm w-64"
                >
                  <option value="">Select soil type</option>
                  <option value="Black">Black</option>
                  <option value="Red">Red</option>
                  <option value="Reddish Brown">Reddish Brown</option>
                  <option value="Dark Brown">Dark Brown</option>
                </select>
              </div>
            </div>
            <div className="flex flex-row my-2 w-3/5">
              <div>Select a Crop Type</div>
              <div className="ml-16">
                <select
                  value={croptype}
                  onChange={handleSelectcrop}
                  className="border-2 border-green-600 p-2 rounded-sm w-64"
                >
                  <option value="">Select Crop</option>
                  <option value="Rice">Rice</option>
                  <option value="Groundnut">Groundnut</option>
                  <option value="Sugarcane">Sugarcane</option>
                  <option value="Coconut">Coconut</option>
                  <option value="Arecanut">Arecanut</option>
                  <option value="Spices">Spices</option>
                  <option value="Vegetables">Vegetables</option>
                  <option value="Black Pepper">Black Pepper</option>
                  <option value="Rubber">Rubber</option>
                  <option value="Cotton">Cotton</option>
                </select>
              </div>
            </div>
            <input
              name="nitrogen"
              value={nitrogen}
              onChange={(e) => handleChange(e, setNitrogen, 20, 150)}
              className="w-3/5 my-2"
              type="number"
              placeholder="Enter nitrogen value (20-150)"
            />
            {errorMessages.nitrogen && (
              <p className="text-red-500">{errorMessages.nitrogen}</p>
            )}

            <input
              name="phosphorus"
              value={phosphorus}
              onChange={(e) => handleChange(e, setPhosphorus, 20, 90)}
              className="w-3/5 my-2"
              type="number"
              placeholder="Enter phosphorus value (20-90)"
            />
            {errorMessages.phosphorus && (
              <p className="text-red-500">{errorMessages.phosphorus}</p>
            )}

            <input
              name="potassium"
              value={potassium}
              onChange={(e) => handleChange(e, setPotassium, 5, 150)}
              className="w-3/5 my-2"
              type="number"
              placeholder="Enter potassium value (5-150)"
            />
            {errorMessages.potassium && (
              <p className="text-red-500">{errorMessages.potassium}</p>
            )}

            <input
              name="ph"
              value={ph}
              onChange={(e) => handleChange(e, setph, 5.5, 8.5, true)}
              className="w-3/5 my-2"
              type="text"
              placeholder="Enter pH value (5.5-8.5)"
            />
            {errorMessages.ph && (
              <p className="text-red-500">{errorMessages.ph}</p>
            )}

            <input
              name="rainfall"
              value={rainfall}
              onChange={(e) => handleChange(e, setrainfall, 300, 1700)}
              className="w-3/5 my-2"
              type="number"
              placeholder="Enter rainfall value (300-1700)"
            />
            {errorMessages.rainfall && (
              <p className="text-red-500">{errorMessages.rainfall}</p>
            )}

            <input
              name="temperature"
              value={temperature}
              onChange={(e) => handleChange(e, setTemperature, 10, 40)}
              className="w-3/5 my-2"
              type="number"
              placeholder="Enter temperature value (10-40)"
            />
            {errorMessages.temperature && (
              <p className="text-red-500">{errorMessages.temperature}</p>
            )}

            <div className="grid place-items-center mt-14">
              <div className="mt-2">
                <button
                  type="submit"
                  className="inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs 
                  leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg
                  focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800
                  active:shadow-lg transition duration-150 ease-in-out"
                >
                  Get Fertilizer Recommendation
                </button>
              </div>
            </div>

            {recommendation && (
              <div className="mt-6 text-center">
                <p className="text-xl font-semibold text-green-700">
                  Recommended Fertilizer: {recommendation}
                </p>
              </div>
            )}
          </div>
        </div>
      </form>
      <Footer />
    </>
  );
};

export default FertilizerForm;
