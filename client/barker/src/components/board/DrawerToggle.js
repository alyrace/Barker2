import React, {useState} from 'react';
import useStyles from '../../utils/drawerStyles';
import Button from '@material-ui/core/Button';
import WallpaperIcon from '@material-ui/icons/Wallpaper';

const DrawerToggle = ({setOpenSideMenu}) => {
    const classes = useStyles();

    return (
        <div>
           <Button 
            onClick={() => setOpenSideMenu(true)}
            variant='contained'
            //opensidemenu = {opensidemenu}
            //className={openSideMenu ? classes.hide : classes.showMenuButton}
            >
                <WallpaperIcon fontSize='small' /> Change Background
            </Button> 
        </div>
    )
}

export default DrawerToggle;
;