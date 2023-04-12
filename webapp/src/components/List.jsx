import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
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
import {IconButton, Grid, } from "@mui/material";
import {Place as PlaceIcon} from "@mui/icons-material";
import Map from  "../components/Map";
import CloseIcon from "@mui/icons-material/Close";


const List = ({ isVisible, onAddMarker}) => {


    const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [privacy, setPrivacy] = useState('public');

  const handleAddButtonClick = () => {
    if (name !== '' && type !== '') {
      onAddMarker({ name, type, privacy });
      setName('');
      setType('');
      setPrivacy('public');
      
      
    }
  };


    

    const style = {
        display: isVisible ? 'block' : 'none',
        width: '100%',
        maxWidth: '20rem',
        margin: '0 auto',
    };




    return (
        <Container style={style}>
            <>
                <IconButton style={{ marginLeft: '15.625rem', marginTop: '-1.25rem' }} onClick={() => {
                  
                }}>
                    <CloseIcon />
                </IconButton>
                <Typography variant="h5" style={{ fontFamily: 'Arial' }}>Click after you finish to Add a Marker</Typography>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '3rem' }}>
                    <FormControl style={{ width: '100%' }}>
                        <InputLabel> Name: </InputLabel>
                        <TextField style={{ width: '100%' }} value={name} onChange={(e) => setName(e.target.value)} />
                    </FormControl>
                    <FormControl style={{ width: '100%' }}>
                        <InputLabel>Type</InputLabel>
                        <Select style={{ width: '100px' }} value={type} onChange={(e) => setType(e.target.value)}>
                            <MenuItem value="bar">Bar</MenuItem>
                            <MenuItem value="shop">Shop</MenuItem>
                            <MenuItem value="restaurant">Restaurant</MenuItem>
                            <MenuItem value="park">Park</MenuItem>
                            <MenuItem value="monument">Monument</MenuItem>
                            <MenuItem value="sight">Sight</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl style={{ width: '100%' }}>
                        <InputLabel>Privacy</InputLabel>
                        <RadioGroup row value={privacy} onChange={(e) => setPrivacy(e.target.value)}>
                            <FormControlLabel
                                value="public"
                                control={<Radio color="default" />}
                                label="Public"
                            />
                            <FormControlLabel
                                value="private"
                                control={<Radio color="default" />}
                                label="Private"
                            />
                        </RadioGroup>
                    </FormControl>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                        <Button variant="contained" style={{ backgroundColor: 'grey' }} onClick={() => {
                            handleAddButtonClick(); // PANELİN AÇILIP KAPANMA İŞLEMİNİ YAPTIK
                    }}>
                        Finish
                    </Button>
                </div>
                </div>
            </>
        </Container>
    )};
    export default List;