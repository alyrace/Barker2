import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import {Grow} from '@material-ui/core';
import colors from '../../assets/colors/colors';
import {getImages} from '../../utils/ImageAPI';

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: '400px',
    },
    menu: {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: theme.spacing(2),
    },
    box: {
        width: '45%',
        height: '90px',
        backgroundColor: 'blue',
        borderRadius: '10px',
        marginBottom: theme.spacing(2),
    },
    optionContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
}));



const BoardDrawerBackground = ({setOpenSideMenu, opensidemenu, setNewBgImg}) => {
    const classes = useStyles();
    const [opencoloroptions, setOpenColorOptions] = useState(false);
    const [openimageoptions, setOpenImageOptions] = useState(false);
    const [images, setImages] = useState([]);

    const getListOfImages = async () => {
        const listOfImages = await getImages();
        setImages(listOfImages);
    }

    useEffect(()=>{
        getListOfImages();
    }, []);

    return (
        <div>
            <Drawer
                open={opensidemenu}
                //className={open ? classes.drawer : classes.hide}
                //variant='persistent' 
                anchor='right'
                onClose = {() => {setOpenSideMenu(false)}}
                >
                <div className={classes.drawer}>
                    <div className={classes.menu}>
                        <div className={classes.box}
                            style={{
                                backgroundImage: 'url(https://images.unsplash.com/photo-1539074012390-794e447a2d9e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTJ8fHBhc3RlbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60)',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                            }}
                            onClick={()=>setOpenImageOptions(true)}
                        ></div>
                        <div className={classes.box}
                            style={{
                                backgroundImage: 'url(https://images.unsplash.com/photo-1604937455095-ef2fe3d46fcd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80)',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                            }}
                            onClick={()=>{
                                setOpenColorOptions(true);
                                setOpenImageOptions(false);
                            }}

                        >
                        </div>
                    </div>
                    {openimageoptions ? (
                        <Grow in={openimageoptions}>
                            <div className={classes.optionContainer}>
                                {images.map((image, index)=>{
                                    return (
                                        <div className={classes.box}
                                            key={index}
                                            style={{
                                                backgroundImage: `url(${image.thumb})`,
                                                backgroundRepeat: 'no-repeat',
                                                backgroundSize: 'cover',
                                            }}
                                            onClick = {() => setNewBgImg(image.url)}
                                        >
                                        </div>
                                    );
                                })}
                            </div>
                        </Grow>
                    ):(
                        <Grow in={opencoloroptions}>
                            <div className={classes.optionContainer}>
                                {colors.map((color, index)=>{
                                    return (
                                        <div className={classes.box}
                                            key={index}
                                            style={{
                                                backgroundColor: color,
                                            }}
                                            onClick = {() => setNewBgImg(color)}
                                        >
                                        </div>
                                    );
                                })}
                            </div>
                        </Grow>
                    )}    
                </div>
            </Drawer>
        </div>
    )
}

export default BoardDrawerBackground;
