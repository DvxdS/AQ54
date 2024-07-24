import React, { useState, useEffect, useMemo, useCallback } from 'react';
import DatePicker from './datepicker'; 
import { fetchHourlyData } from '../api/data_api';
import BarChart from './bar_chart';
import CustomLoader from './loader';
import debounce from 'debounce';
import MapComponent from './map';


const MainContent: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedStation, setSelectedStation] = useState<string | null>(null); 
    const [hourlyData, setHourlyData] = useState<any>(null); 
    const metrics = ['CO', 'O3', 'PM2_5', 'PM10', 'NO2', 'temperature', 'internal_temperature', 'RH'];
    const [selectedMetric, setSelectedMetric] = useState<string>(metrics[0]); 
    const [loading, setLoading] = useState<boolean>(false);

    // Function to handle date change
    const handleDateChange = (date: Date | null) => {
        if (date) {
            setSelectedDate(date);
        }
    };

    // Function to handle station change
    const handleStationChange = (station: string | null) => {
        setSelectedStation((prevStation) => (prevStation === station ? null : station));
    };

    // Function to handle metric change
    const handleMetricChange = (metric: string) => {
        setSelectedMetric(metric);
    };

    // Fetch and process data when selectedDate or selectedMetric changes
    const debouncedFetchData = useCallback(
        debounce(async (date: Date) => {
            setLoading(true);
            const data = await fetchHourlyData(date);
            setHourlyData(data);
            setLoading(false);
        }, 300),
        []
    );

    useEffect(() => {
        debouncedFetchData(selectedDate);
    }, [selectedDate, selectedMetric, debouncedFetchData]);

    const processedData = useMemo(() => {
        if (!hourlyData) return null;

        const formattedDate = selectedDate.toISOString().split('T')[0];
        const hourlyDataForDate = {
            SMART188: hourlyData.SMART188?.[formattedDate]?.[selectedMetric] || {},
            SMART189: hourlyData.SMART189?.[formattedDate]?.[selectedMetric] || {}
        };

        const chartData = [];
        for (let hour = 0; hour < 24; hour++) {
            chartData.push({
                hour: `${hour}:00`,
                SMART188: hourlyDataForDate.SMART188[hour] || 0,
                SMART189: hourlyDataForDate.SMART189[hour] || 0
            });
        }

        // Log the processed data for debugging
        console.log('Processed data:', chartData);

        return chartData;
    }, [hourlyData, selectedDate, selectedMetric]);

    return (
        <div className="container mx-auto p-4 mb-8 ">
            <div className="flex justify-center items-center mb-5">
                <h1 className="text-5xl font-bold text-white">
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
                            selectedStation === 'SMART189' ? 'bg-red-400' : 'bg-gray-500'
                        } text-white`}
                    >
                        SMART189
                    </button>
                </div>
            </div>
    
            <div className="flex flex-col md:flex-row justify-between mb-4">
                <div className="text-white mb-4 md:mb-0 text-3xl">
                    <p>{selectedDate.toDateString()}</p>
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
    
            <div className="flex flex-col md:flex-row gap-4 mt-5 h-full">
                <div className="flex-1 min-w-[500px] h-full">
                    {processedData && (
                        <BarChart data={processedData} selectedMetric={selectedMetric} selectedStation={selectedStation} />
                    )}
                </div>
                <div className="flex-1 min-w-[300px] h-full">
                    <MapComponent />
                </div>
            </div>
        </div>
    );
    
};

export default MainContent;
