import { spawn } from 'child_process';

import { accessPoints } from "../lib/utils/accessPoints.js";
import { processRSSData } from "../lib/utils/processRSSData.js";

import TestData from "../models/testdata.model.js";

export const predictRSS = async (req, res) => {
    try {
        const randomData  = await TestData.aggregate([{ $sample: { size: 1 } }]);

        const data = randomData[0];
        
        if (!data) {
            return res.status(404).json({ message: "No dummy data found in database" });
        }

        // Proses data test
        const processedTestData = processRSSData(data, accessPoints);

        // Run the Python script asynchronously using spawn
        const childpythonProcess = spawn('python', ['machine_learning/test.py', JSON.stringify(processedTestData)]);

        let pythonOutput = "";

        // print printed data in Python Script to Node Terminal
        childpythonProcess.stdout.on('data', (data) => {
            //console.log(`stdout: ${data}`);
            pythonOutput += data.toString();
        });
        // print error in Python Script to Node Terminal
        childpythonProcess.stderr.on('data', (data) => {
            //console.log(`stderr: ${data}`);
            console.error(`stderr: ${data}`);
        });

        childpythonProcess.on('close', (code) => {
            //console.log(`close: ${code}`);
            if (code !== 0) {
                console.error(`Python script exited with code ${code}`);
                return res.status(500).json({ message: "Error in prediction script" });
            }

            // Cek output Python
            console.log('Python Output:', pythonOutput);

            try {
                const prediction = JSON.parse(pythonOutput.trim()); // Parse hasil prediksi

                const targetData = {
                    FLOOR: data.FLOOR,
                    BUILDINGID: data.BUILDINGID,
                    SPACEID: data.SPACEID,
                    RELATIVEPOSITION: data.RELATIVEPOSITION,
                };
                
                res.json({
                    target: targetData,
                    prediction,
                });
            } catch (error) {
                console.error('Error parsing JSON from Python output:', error);
                return res.status(500).json({ message: "Invalid JSON received from Python", error });
            }
        });

        //res.status(500).json({ message: 'Berhasil' });

    } catch (error) {
        console.error('error in predictRSS function:', error.message);
        res.status(500).json({ message: 'Internal server error', error });
    }
};