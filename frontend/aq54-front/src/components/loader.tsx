import React from 'react';
import { cardio } from 'ldrs';

cardio.register()

const CustomLoader: React.FC = () => {
    return (
        <l-cardio
        size = "70"
        stroke = "4"
        speed="2"
        color = "white"
        >
            
        </l-cardio>
    );
};

export default CustomLoader;
