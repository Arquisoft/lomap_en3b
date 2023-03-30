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

const List = ({ isVisible }) => {
    const [type, setType] = useState('Bars');
    const [rating, setRating] = useState('');
    const [name, setName] = useState('');
    const [visibility, setVisibility] = useState('public');

    const handleAdd = () => {
        // logic for adding a new item to the list goes here
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleVisibilityChange = (event) => {
        setVisibility(event.target.value);
    };

    const style = {
        display: isVisible ? 'block' : 'none',
    };

    return (
        <Container style={style}>
            <Typography variant="h4">Click to add a marker</Typography>
            <FormControl>
                <InputLabel>Type</InputLabel>
                <Select value={type} onChange={(e) => setType(e.target.value)}>
                    <MenuItem value="Bars">Bars</MenuItem>
                    <MenuItem value="Shops">Shops</MenuItem>
                    <MenuItem value="Restaurants">Restaurants</MenuItem>
                    <MenuItem value="Parks">Parks</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel>Rating</InputLabel>
                <Select value={rating} onChange={(e) => setRating(e.target.value)}>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel>Name</InputLabel>
                <TextField value={name} onChange={handleNameChange} />
            </FormControl>
            <FormControl>
                <RadioGroup value={visibility} onChange={handleVisibilityChange}>
                    <FormControlLabel
                        value="public"
                        control={<Radio />}
                        label="Public"
                    />
                    <FormControlLabel
                        value="private"
                        control={<Radio />}
                        label="Private"
                    />
                </RadioGroup>
            </FormControl>
            <MarginBottom />
            <Button variant="contained" color="primary" onClick={handleAdd}>
                Finish
            </Button>
        </Container>
    );
};

export default List;
