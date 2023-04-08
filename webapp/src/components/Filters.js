import React, {useState} from 'react';

import {
    Grid,
    FormControlLabel,
    Checkbox,
    Drawer, List, Box, Typography,  IconButton

} from "@mui/material";
import {FormControl} from "./styles/ListStyle";
import InputLabel from "@mui/material/InputLabel";
import {Container} from "./styles/ListStyle";


import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {Group} from "@mui/icons-material";

export default function FilterSidebar(isVisible){
    const [type, setType]=useState('');
    const [visible, setVisible]=useState(isVisible);
    const handleAddButtonClick = () => {

    };

    const style = {
        display: visible ? 'flex' : 'none',
        flexDirection:'column'
    };

    return (
       <Container style={style}>
           <Typography variant ="h3" > Filter pins!</Typography>

           <FormControl style={{display:'flex',flexDirection:'column',flex:1}} value={type} onChange={(category)=>category.target.value}>

               <InputLabel>Location type</InputLabel>

                     <FormControlLabel control={<Checkbox/>} style={{flex: 1}} label="Sight" value="Sight" />
                    <FormControlLabel  control={<Checkbox/>} style={{flex: 1}} label="Restaurant"  value="Restaurant"/>
                    <FormControlLabel  control={<Checkbox/>} style={{flex: 1}} label="Monument" value="Monument"/>
                    <FormControlLabel control={<Checkbox/>} style={{flex: 1}} label="Park" value="Park" />
                    <FormControlLabel control={<Checkbox/>} style={{flex: 1}}  label="Bar" value="Bar" />
                    <FormControlLabel control={<Checkbox/>} style={{flex: 1}}  label="Shop" value="Shop"/>


           </FormControl>

       </Container>


    )
                };
