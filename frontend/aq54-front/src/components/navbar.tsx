import React from 'react';

const NavBar: React.FC = () => {
    return (
        <nav className="bg-neutral-950 p-4 flex justify-between items-center">
            <div className="text-white text-xl font-bold">
                AQ54
            </div>
            <div className="text-white">
                <img
                    src="https://via.placeholder.com/40"
                    alt="User Account"
                    className="w-10 h-10 rounded-full"
                />
            </div>
        </nav>
    );
};

export default NavBar;
