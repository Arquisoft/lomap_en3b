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

/**
 * The add Marker List
 *
 * The component takes two props: "isVisible" and "onAddMarker". "isVisible" is a boolean that determines whether the component should be visible or hidden.
 * "onAddMarker" is a callback function that will be called when the user finishes adding a marker.
 *  The component defines three state variables using the "useState" hook: "name", "category", and "privacy".
 *  The "handleAddButtonClick" function is used to add a marker when the user clicks the "Finish" button. If both the "name" and "category" fields are not empty,
 * The "onAddMarker" callback is called with an object containing the name, category, and privacy values, and the "name", "category", and "privacy" state variables are reset to their initial values.
 *
 * @param isVisible
 * @param onAddMarker
 *
 */
const List = ({ isVisible, onAddMarker}) => {

    // Define three state variables using the useState hook. The new location properys
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [privacy, setPrivacy] = useState('public');
    const[pic,setPic] = useState(""); //Picture
    const[description,setDescription] = useState(""); //Picture
    const [isValid,setIsValid] = useState(false);
    const validationError = document.getElementById("validation-error");


    // Define a function to handle the "Finish" button click event
    const handleAddButtonClick = () => {
        if (isValid) {
            onAddMarker({ name, category, privacy,pic,description });//sends an object containing the new values to the Map component where we update the location
            setName('');
            setCategory('');
            setPrivacy('public');
            setPic("");
            setDescription("");
            validationError.style.display = "none";
            setIsValid(false);


        }else{
            validationError.style.display = "block";
        }
    };

    React.useEffect(() => {
        //console.log(name);
        if (name !== '' && category !== '') {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [name, category]);


    // Define a style object based on the visibility prop passed to the component
    const style = {
        display: isVisible ? 'block' : 'none',
        width: '100%',
        maxWidth: '20rem',
        margin: '0 auto',
    };

/////////////////////////////////picture
    const handleImageUpload = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (event) => {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const imageDataUrl = reader.result;
                const img = new Image();
                img.src = imageDataUrl;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 200; // we give a width to the picture
                    const MAX_HEIGHT = 200; // we give a height to the picture
                    let width = img.width;
                    let height = img.height;
                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    const resizedImageDataUrl = canvas.toDataURL(file.type);
                    setPic( `${resizedImageDataUrl}` );

                };
            };
        };
        input.click();
    };

    // Render the component
    return (
        <Container style={style}>
            <>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h5" style={{ fontFamily: 'Arial' }}>Click after you finish to Add a Marker</Typography>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column'}}>
                    <FormControl style={{ width: '100%' }}>
                        <InputLabel> Name: </InputLabel>
                        <TextField style={{ width: '100%' }} value={name} onChange={(e) => setName(e.target.value)} />
                    </FormControl>
                    <FormControl style={{ width: '100%'}}>
                        <InputLabel>Type</InputLabel>
                        <Select style={{ width: '100px' }} value={category} onChange={(e) => setCategory(e.target.value)}>
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
                    <FormControl style={{ display: 'flex', alignItems: 'center' }}>
                        <InputLabel style={{ flex: 1 }}>Picture</InputLabel>
                        <Button  onClick={handleImageUpload} size='small'>
                            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                                {pic ? (
                                    <img src={pic} alt="uploaded image" style={{ width: '80px', height: '70px' }} />
                                ) : (
                                    <div style={{ width: '80px', height: '70px', border: '1px solid #ccc', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'gainsboro', color: 'gray' }}>Add Picture</div>
                                )}
                            </div>
                        </Button>
                    </FormControl>
                    <FormControl style={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                        id="description"
                        label="Description"
                        multiline
                        rows={2}
                        style={{ width: '100%' }}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                       
                       
                    />
                     </FormControl>
                    <div id="validation-error" style={{ display: 'none',color: 'red' }}>
                        Please complete name and type .
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center'}}>
                        <Button variant="contained" style={{ backgroundColor: 'grey' }} onClick={() => {
                            handleAddButtonClick(); //event to know that the action is finoished
                    }}>
                        Finish
                    </Button>
                </div>
                </div>
            </>
        </Container>
    )};
export default List;
