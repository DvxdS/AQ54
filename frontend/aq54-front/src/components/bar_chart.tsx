import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartProps {
    data: any;
    selectedMetric: string | null;
    selectedStation: string | null;
}

const BarChart: React.FC<BarChartProps> = ({ data, selectedMetric, selectedStation }) => {
    if (!selectedMetric) {
        return <div>Please select a metric.</div>;
    }
    console.log(data)

    const getDatasets = () => {
        const datasets = [];
        if (!selectedStation || selectedStation === 'SMART188') {
            datasets.push({
                label: 'SMART188',
                data: data.map((entry: any) => entry.SMART188),
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
            });
        }
        if (!selectedStation || selectedStation === 'SMART189') {
            datasets.push({
                label: 'SMART189',
                data: data.map((entry: any) => entry.SMART189),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            });
        }
        return datasets;
    };

    const chartData = {
        labels: data.map((entry: any) => entry.hour),
        datasets: getDatasets(),
    };
    console.log(chartData)

    return (
        <div className=' w-full h-full'>
            <Bar
                data={chartData}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: `Hourly ${selectedMetric} Levels`,
                        },
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Hour of the Day',
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: selectedMetric,
                            },
                        },
                    },
                }}
            />
        </div>
    );
};

export default BarChart;
