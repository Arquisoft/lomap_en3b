import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import {
    FormControl,
    SelectEmpty,
    Loading,
    Container,
    MarginBottom,
} from './styles/ListStyle.js';
import Rating from "react-rating-stars-component";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import {IconButton, Grid, Avatar, ListItemButton, ListItem,} from "@mui/material";
import {Place as PlaceIcon} from "@mui/icons-material";
import Card from '@mui/material/Card';
import ListItemText from "@mui/material/ListItemText";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import Input from '@mui/material/Input';
import {  Divider, Tabs, Tab,List} from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import RedditIcon from '@mui/icons-material/Reddit';
import LocationOffIcon from '@mui/icons-material/LocationOff';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from "@mui/icons-material/Close";
import ListItemAvatar from '@mui/material/ListItemAvatar';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Link from '@mui/material/Link';

const EditList = ({ isHomeVisible, onHomePage}) => {

    const handleHomeClick = () => {
        onHomePage();
    };

    const style = {
        display: isHomeVisible ? 'block' : 'none',
        width: '100%',
        maxWidth: '100rem',
        margin: '0 auto',
        height: '100%',
        maxHeight: '50rem',
        position: 'fixed',
        top: 45
    };


    const scrollStyle = {
        overflowY: 'scroll',
        height: 'calc(100% - 100px)',
    };



    return (

        <Container style={style}>
            <Box
                style={{
                    width: '50%',
                    margin: '0 auto',
                    backgroundColor: 'lightgrey',
                    height: 'calc(100% - 1.5rem)',
                    overflowY: 'scroll',
                }} >

                <List >
                    <Box  style={{
                        width: '90%',
                        margin: '0 auto',
                        backgroundColor: 'white',
                        borderRadius: '1rem',
                    }}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar src="https://picsum.photos/200/300" />
                    </ListItemAvatar>
                    <ListItemText
                        primary="James Dean"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Review to  <h4>@adamm 's Relax Place</h4>
                                </Typography>
                                <Box>{'Now I know why adam is so calm, this place is from heaven…'}</Box>
                                <Box>
                                <img style={{
                                    width: '100%',
                                    height:'250px',
                                }}  src='https://picsum.photos/id/375/2000/1000'/>
                                </Box>
                                <Box>
                                    <IconButton disabled><StarIcon/></IconButton>
                                    <IconButton disabled><StarIcon/></IconButton>
                                    <IconButton disabled><StarIcon/></IconButton>
                                    <IconButton disabled><StarBorderIcon/></IconButton>
                                    <IconButton disabled><StarBorderIcon/></IconButton>
                                </Box>
                            </React.Fragment>
                        }
                    />

                </ListItem>
                    </Box>
                    <Divider sx={{ my: '0.5rem' }}/>

                    <Box
                        style={{
                            width: '90%',
                            margin: '0 auto',
                            backgroundColor: 'white',
                            borderRadius: '1rem',
                        }}
                    >
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="LoMap" src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                                primary="LoMap"
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            Top 5 Place You need to visit in Oviedo
                                        </Typography>
                                        <Box>{'Top 5 Place You need to visit in Oviedo' } <Link href="#">5 Places</Link> </Box>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    </Box>

                    <Divider sx={{ my: '0.5rem' }}/>

                    <Box  style={{
                        width: '90%',
                        margin: '0 auto',
                        backgroundColor: 'white',
                        borderRadius: '1rem',
                    }}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar src="https://picsum.photos/200/300" />
                            </ListItemAvatar>
                            <ListItemText
                                primary="Marilym Monroe"
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            Added a new Location <h4>Mom's Place</h4>
                                        </Typography>
                                        <Box>{'I coming here when I got bored from my childrens lol :)'}</Box>
                                        <Box>
                                            <img style={{
                                                width: '100%',
                                                height:'250px',
                                            }}  src='https://picsum.photos/id/37/2000/1000'/>
                                        </Box>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    </Box>
                    <Divider sx={{ my: '0.5rem' }}/>

                    <Box  style={{
                        width: '90%',
                        margin: '0 auto',
                        backgroundColor: 'white',
                        borderRadius: '1rem',
                    }}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar src="https://picsum.photos/200/300" />
                            </ListItemAvatar>
                            <ListItemText
                                primary="El Salvadore"
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            Restaurant
                                        </Typography>
                                        <Box>{'best coffe in oviedo, dont forget to add us your map!'}</Box>
                                        <Box>
                                            <img style={{
                                                width: '100%',
                                                height:'250px',
                                            }}  src='https://picsum.photos/id/326/2000/1000'/>
                                        </Box>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    </Box>
                </List>
            </Box>
        </Container>
    );
};


export default EditList;