import React, { useState, useEffect, useCallback } from 'react';
import NavBar from '../components/navbar';
import MainContent from '../components/main_content';
import CustomLoader from '../components/loader';
import { fetchHourlyData } from '../api/data_api';
import debounce from 'debounce';

const MainPage: React.FC = () => {
    const [initialLoading, setInitialLoading] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(true);
    const [hourlyData, setHourlyData] = useState<any>(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedMetric, setSelectedMetric] = useState<string>('CO'); // Default metric

    const debouncedFetchData = useCallback(
        debounce(async (date: Date) => {
            const data = await fetchHourlyData(date);
            setHourlyData(data);
            setLoading(false);
        }, 300),
        []
    );

    useEffect(() => {
        // Fetch data initially when the component mounts
        const fetchData = async () => {
            await debouncedFetchData(selectedDate);
            setInitialLoading(false); // Set initialLoading to false after the first fetch
        };

        fetchData();
    }, [debouncedFetchData, selectedDate]);

    useEffect(() => {
        // Fetch data when the date changes
        if (!initialLoading) {
            setLoading(true);
            debouncedFetchData(selectedDate);
        }
    }, [selectedDate, debouncedFetchData]);

    useEffect(() => {
        // Fetch data when the metric changes
        // No loading state change here
        debouncedFetchData(selectedDate);
    }, [selectedMetric, debouncedFetchData]);

    return (
        <div className='bg-neutral-950 w-full h-full relative'>
            <NavBar />
            {(initialLoading || loading) && (
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <CustomLoader />
                </div>
            )}
            <MainContent
                hourlyData={hourlyData}
                setSelectedDate={setSelectedDate}
                selectedDate={selectedDate}
                selectedMetric={selectedMetric}
                setSelectedMetric={setSelectedMetric}
            />
        </div>
    );
};

export default MainPage;
