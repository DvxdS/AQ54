import React, { useState } from 'react';
import DatePicker from './datepicker'; // Ensure you have this component implemented

const MainContent: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedStation, setSelectedStation] = useState<string | null>(null); // null for all stations
    const [selectedMetric, setSelectedMetric] = useState<string | null>(null); // Track selected metric

    const metrics = ['CO', 'O3', 'PM2.5', 'PM10', 'NO2', 'Temperature', 'Internal Temp', 'RH'];

    // Function to handle date change
    const handleDateChange = (date: Date | null) => {
        if (date) {
            setSelectedDate(date);
        }
    };


    // Function to handle station change
    const handleStationChange = (station: string | null) => {
        setSelectedStation(station);
    };

    // Function to handle metric change
    const handleMetricChange = (metric: string) => {
        setSelectedMetric(metric);
    };

    return (
        <div className="container mx-auto p-4 mb-8 ">
        <div className="flex justify-center items-center mb-5">
        <h1 className="text-5xl font-bold text-white Xtext-center">
            Consultez Les données de l'air d'Abidjan
        </h1>
        </div>

            <div className="flex flex-col sm:flex-row justify-between mb-4 mt-4">
                <DatePicker selectedDate={selectedDate} onDateChange={handleDateChange} />
                <div className="mt-2 sm:mt-0 sm:ml-4 flex justify-center">
                    <button
                        onClick={() => handleStationChange('SMART188')}
                        className={`px-4 py-2 rounded ${
                            selectedStation === 'SMART188' ? 'bg-blue-500' : 'bg-gray-500'
                        } text-white mr-2`}
                    >
                        SMART188
                    </button>
                    <button
                        onClick={() => handleStationChange('SMART189')}
                        className={`px-4 py-2 rounded ${
                            selectedStation === 'SMART189' ? 'bg-blue-500' : 'bg-gray-500'
                        } text-white`}
                    >
                        SMART189
                    </button>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between mb-4">
                <div className="text-white mb-4 md:mb-0 text-3xl">
                    <p> {selectedDate.toDateString()}</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {metrics.map((metric) => (
                        <button
                            key={metric}
                            onClick={() => handleMetricChange(metric)}
                            className={`px-2 py-1 rounded ${
                                selectedMetric === metric ? 'bg-blue-500' : 'bg-gray-500'
                            } text-white`}
                        >
                            {metric}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MainContent;
