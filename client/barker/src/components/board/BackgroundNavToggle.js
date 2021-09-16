import React, {useState} from 'react';
import BoardDrawerBackground from './BoardDrawerBackground';
import DrawerToggle from './DrawerToggle';
const BackgroundNavToggle = ({setBackgroundImage}) => {
    const [opensidemenu, setOpenSideMenu] = useState(false);

    return (
        <div>
            <DrawerToggle setOpenSideMenu={setOpenSideMenu} />
            <BoardDrawerBackground 
                opensidemenu= {opensidemenu} 
                setOpenSideMenu={setOpenSideMenu} 
                setNewBgImg={setBackgroundImage}
            />  
        </div>
    )
}

export default BackgroundNavToggle;
