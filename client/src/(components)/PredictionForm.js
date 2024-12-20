'use client'

import React, { useEffect, useState } from 'react';
import { getlocation } from '../api/location/route';

const PredictionForm = () => {
    const [location, setLocation] = useState('');
    const [selectloc, setselectLoc] = useState('');
    const [sqft, setSqft] = useState('');
    const [bath, setBath] = useState('1');
    const [bhk, setBhk] = useState('');
    const [predictions, setPredictions] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getLocation = async () => {
            const loc = await getlocation();
            setLocation(loc.data);
        };
        getLocation();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const requestBody = { location: selectloc, sqft, bath, bhk };

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/predict/price`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch predictions');
            }

            const data = await response.json();
            setPredictions(data.data);
        } catch (error) {
            console.error('Error fetching predictions:', error);
            setPredictions({ error: 'Failed to fetch predictions. Please try again later.' });
        } finally {
            setLoading(false);
        }
    };

    const resetAll = () => {
        setselectLoc('');
        setSqft('');
        setBath('');
        setBhk('');
        setPredictions(null);
    }

    return (
        <div className="bg-gradient-to-r from-blue-100 to-teal-200 min-h-screen flex items-center justify-center py-4 px-4">
            <div className="max-w-3xl w-full bg-white shadow-2xl rounded-2xl p-10">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6 font-serif">Bangalore City Real Estate Price Prediction</h1>
                <p className="text-center text-gray-400 mb-8 text-base font-mono">Provide the property details to receive an estimated price prediction.</p>
                <form onSubmit={handleSubmit} className="space-y-8">

                    <div>
                        <label htmlFor="location" className="block text-lg text-start font-medium text-gray-800">Location</label>
                        <select
                            id="location"
                            value={selectloc}
                            onChange={(e) => setselectLoc(e.target.value)}
                            className="mt-2 border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                            required
                        >
                            <option value="" disabled>Select a location</option>
                            {location && Object.values(location).map((loc, index) => (
                                <option key={index} value={loc} className="capitalize bg-orange-50">{loc}</option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-3 gap-10">
                        <div>
                            <label htmlFor="sqft" className="block text-lg font-medium text-start text-gray-800">Square Feet</label>
                            <input
                                type="number"
                                id="sqft"
                                value={sqft}
                                onChange={(e) => setSqft(Math.max(0, e.target.value))}
                                className="mt-2 border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="bath" className="block text-lg font-medium text-start text-gray-800">Bathrooms <span className="text-xs text-gray-300">ranges 1-3</span></label>
                            <input
                                type="number"
                                id="bath"
                                value={bath}
                                onChange={(e) => setBath(Math.max(0, e.target.value))}
                                min={1}
                                max={60}
                                className="mt-2 border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="bhk" className="block text-lg font-medium text-start text-gray-800">BHK <span className="text-xs text-gray-300">ranges 1-3</span></label>
                            <input
                                type="number"
                                id="bhk"
                                value={bhk}
                                onChange={(e) => setBhk(Math.max(0, e.target.value))}
                                className="mt-2 border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                                required
                            />
                        </div>

                    </div>

                    <div className="flex gap-4 mt-10">
                        <button
                            type="submit"
                            className="w-full py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition duration-300 ease-in-out"
                            disabled={loading}
                        >
                            {loading ? ('Calculating...') : ('Get Price Prediction')}
                        </button>

                        <button
                            type="button"
                            onClick={() => resetAll()}
                            className="w-full py-3 bg-orange-400 text-white font-semibold rounded-lg hover:bg-orange-600 transition duration-300 ease-in-out"
                        >
                            Reset
                        </button>
                    </div>
                </form>

                {/* Predictions Result */}
                {predictions && (
                    <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold font-mono text-red-800">Predictions</h2>
                        {predictions.error ? (
                            <p className="text-red-500 mt-4">{predictions.error}</p>
                        ) : (
                            <pre className="mt-2 bg-gray-50 p-4 rounded-md border border-gray-200 overflow-auto"> The estimated price for the property details is approx. INR:{JSON.stringify(predictions, null, 2)} lakhs</pre>
                        )}
                    </div>
                )}

                <div className="grid-cols-1 gap-4 grid items-center mt-5 md:grid-cols-2">
                    <div className=" text-gray-700 text-sm text-center italic">Note: This model provides an accuracy of about <span className="text-green-700 font-bold">84%</span>.</div>

                    <div className=" text-gray-500 text-sm text-center">This model is trained using data from <a href="https://www.kaggle.com/datasets/amitabhajoy/bengaluru-house-price-data" target="_blank" rel="noreferrer" className="text-orange-600 underline">this
                        dataset</a>.</div>
                </div>

            </div>
        </div>

    );
};

export default PredictionForm;
