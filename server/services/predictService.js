const { spawn } = require('child_process');
const path = require('path');

const find = (req, res) => {
    const { location, sqft, bath, bhk } = req.body; 
    console.log(location);
    console.log('Current directory:', __dirname);
    const pythonFilePath = path.join(__dirname, '../../model/predict.py');
    console.log('Python script path:', pythonFilePath); 

    // Spawn the Python process
    const pythonProcess = spawn('python', [pythonFilePath, location, sqft, bath, bhk]); 

    // Handle Python script output
    pythonProcess.stdout.on('data', (data) => {
        console.log('Python script output:', data.toString());
        try {
            // Parse the JSON data returned by Python
            const response = JSON.parse(data.toString());
            console.log("Response:", response);
            res.json({ success: true, data: response });  
        } catch (error) {
            console.error('Error parsing Python response:', error);
            res.status(500).json({ success: false, message: 'Error parsing Python response' });
        }
    });
    
   
    pythonProcess.stderr.on('data', (data) => {
        console.error('Python script error:', data.toString());
        res.status(500).json({ success: false, message: `Python error: ${data.toString()}` });
    });

 
    pythonProcess.on('close', (code) => {
        console.log(`Python process exited with code ${code}`);
        if (code !== 0) {
            res.status(500).json({ success: false, message: `Python process exited with code ${code}` });
        }
    });
}

module.exports = {
    find,
};
