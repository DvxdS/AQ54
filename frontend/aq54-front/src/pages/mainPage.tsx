import React from 'react'
import NavBar from '../components/navbar';
import MainContent from '../components/main_content';


const MainPage:React.FC = () => {
    return(
        <div className='bg-neutral-950 w-full h-full'>
            <NavBar/>
            <MainContent/>
            
        </div>
    )
}

export default MainPage;