const { PythonShell } = require('python-shell');

const find = async (req) => {
    const { location, sqft, bath, bhk } = req.body;  // Get data from request body

    try {
        console.log("Received data:", location, sqft, bath, bhk);

        // Run the Python script and pass the data as command-line arguments
        const result = await new Promise((resolve, reject) => {
            PythonShell.run('../../model/predict.py', {
                args: [location, sqft, bath, bhk]  // Pass input data to the Python script
            }, (err, result) => {
                if (err) {
                    console.error("Error executing Python script:", err);
                    reject(err);
                } else {
                    console.log("Prediction result:", result);
                    resolve(result);
                }
            });
        });

        // Return the prediction result from Python
        return { success: true, data: result[0] };  // Assuming the result is in the first index of the array

    } catch (error) {
        return {
            success: false, message: error.message || error
        };
    }
}

module.exports = {
    find,
};
