import React from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerProps {
    selectedDate: Date;
    onDateChange: (date: Date | null) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onDateChange }) => {
    return (
        <div className="flex items-center">
            <label htmlFor="date" className="text-white mr-2">Choose Date:</label>
            <ReactDatePicker
                id="date"
                selected={selectedDate}
                onChange={(date) => onDateChange(date)}
                className="p-2 rounded border border-gray-300"
                dateFormat="yyyy-MM-dd"
            />
        </div>
    );
};

export default DatePicker;
