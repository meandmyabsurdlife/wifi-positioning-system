import React, { useState, useEffect  } from "react";
import axios from "axios";

const PredictionPage = () => {
    const [targetData, setTargetData] = useState(null); // Data target dari database
    const [predictionResult, setPredictionResult] = useState(null); // Hasil prediksi
    const [isLoading, setIsLoading] = useState(false);

    const [predictionComparison, setPredictionComparison] = useState(null); // Perbandingan

    const handleSimulation = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post("http://localhost:5000/api/positionings/predict");
            const { target, prediction } = response.data;

            setTargetData(target); // Data target
            setPredictionResult(prediction); // Hasil prediksi
        } catch (error) {
            console.error("Error during simulation:", error);
            alert("Terjadi kesalahan saat memulai simulasi.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (targetData && predictionResult) {
            const { 
                BUILDINGID: targetBuilding, 
                FLOOR: targetFloor, 
                SPACEID: targetRoom, 
                RELATIVEPOSITION: targetPosition
            } = targetData;

            const { 
                predicted_building_id: predBuilding, 
                predicted_floor: predFloor, 
                predicted_space_id: predRoom, 
                predicted_relative_position: predPosition 
            } = predictionResult;

            if (targetBuilding !== predBuilding) {
                setPredictionComparison({
                    message: "Tidak berada di gedung sesuai",
                    color: "bg-red-500",
                });
            } else if (targetFloor !== predFloor) {
                setPredictionComparison({
                    message: "Tidak berada di lantai yang sesuai",
                    color: "bg-red-500",
                });
            } else if (targetRoom !== predRoom) {
                setPredictionComparison({
                    message: "Tidak berada di ruangan yang sesuai",
                    color: "bg-red-500",
                });
            } else if (targetPosition !== predPosition) {
                const positionMessage =
                    targetPosition === 1
                        ? "Masih berada di dalam ruangan"
                        : "Masih berada di luar ruangan";
                setPredictionComparison({
                    message: positionMessage,
                    color: "bg-red-500",
                });
            } else {
                setPredictionComparison({
                    message: "Lokasi sesuai",
                    color: "bg-green-500",
                });
            }
        }
    }, [targetData, predictionResult]);

    return (
        <div className="flex flex-col items-center w-full mt-8">

            <div className="text-center">
                <h2 className="text-2xl mb-4">Simulasi Pengecekan Lokasi</h2>
                <button 
                    className="btn btn-outline btn-warning font-bold"
                    onClick={handleSimulation}
                    disabled={isLoading}
                >
                        {isLoading ? "Loading..." : "Cek Lokasi"}
                </button>
            </div>


            <div className="flex w-full flex-col lg:flex-row items-center justify-center mt-4 space-y-4 lg:space-y-0 lg:space-x-4">
                <div>
                    <p className="mb-4">Hasil Seharusnya</p>
                    <div className="card bg-base-300 rounded-box grid h-64 w-96 flex-grow place-items-center">
                        {targetData ? (
                            <pre>{JSON.stringify(targetData, null, 2)}</pre>
                        ) : (
                            "Data target akan muncul di sini."
                        )}
                    </div>
                </div>
                <div className="divider lg:divider-horizontal">...</div>
                <div>
                    <p className="mb-4">Hasil Prediksi</p>
                    <div className="card bg-base-300 rounded-box grid h-64 w-96 flex-grow place-items-center">
                        {predictionResult ? (
                            <pre>{JSON.stringify(predictionResult, null, 2)}</pre>
                        ) : (
                            "Hasil prediksi akan muncul di sini."
                        )}
                    </div>
                </div>
            </div>

            {predictionComparison && (
                <div
                    className={`mt-8 w-11/12 lg:w-2/3 p-4 text-center rounded ${predictionComparison.color}`}
                >
                    <p className="text-white font-bold">{predictionComparison.message}</p>
                </div>
            )}

        </div>
    );
};

export default PredictionPage;