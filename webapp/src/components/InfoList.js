import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import {
    Container,
} from './styles/ListStyle.js';
import {
    IconButton,
    List,
    ListItem,
    ListItemText,
    Box,
    Avatar,
    Tab,
    Tabs,
} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Rating from '@mui/material/Rating';
import ButtonBase from '@mui/material/ButtonBase';
import ReviewsIcon from '@mui/icons-material/Reviews';
const InfoList = ({isInfoVisible, onInfoList}) => {

    const[comment,setComment] = useState("");
    const[comments,setComments]=useState(['This is a great spot! ⭐ ', 'I love coming here. ⭐⭐ ','Hi! ⭐','Good Place... ⭐⭐⭐','perfect ⭐⭐⭐⭐⭐']);
    const [selectedTab, setSelectedTab] = useState(0);
    const [selectedRating, setSelectedRating] = useState(2); // default rating is 2


    const style = {
        display: isInfoVisible ? 'block' : 'none',
        backgroundColor: '#fff',
        borderRadius: '0.3125rem',
        padding: '0.625rem',
        maxWidth: '18.75rem',
        minWidth: '15.625rem',
    };


    const onClickHandler = () => {
        let ratingStars = '';
        if (selectedRating === 1) {
            ratingStars = '⭐';
        } else {
            ratingStars = '⭐'.repeat(selectedRating);
        }
        setComments((comments) => [...comments, `${comment}  ${ratingStars}`]);
        setComment('');
    };

    const onChangeHandler = (e) => {
        setComment(e.target.value);
    };

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
                    setComment(prevComment => prevComment + ` <img src="${resizedImageDataUrl}" alt="comment-image"/>`);
                };
            };
        };
        input.click();
    };
    const handleAddButtonClick = () => {
        onInfoList();
    };

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };
    const handleRatingChange = (event, newValue) => {
        setSelectedRating(newValue);
    };

    return (
        <Container style={style}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}} >
                <Tabs
                    value={selectedTab}
                    onChange={handleTabChange}
                    indicatorColor="inherit"
                    textColor="inherit"
                    sx={{ marginTop: '0.1875rem' }}
                >
                    <Tab label="Reviews" icon={<ReviewsIcon />} />
                    <Tab label="Location" icon={<LocationOnIcon />} />
                    <Tab
                        label="Close"
                        icon={<CloseIcon/>}
                        component={ButtonBase}
                        onClick={handleAddButtonClick}
                    />
                </Tabs>
                {selectedTab === 0 && <Typography variant="body1">
                    <Box sx={{ width: '100%', backgroundColor: '#f5f5f5', borderRadius: '0.3125rem', p: '0.625rem', my: '0.625rem' }}>
                        <Typography variant="caption" sx={{ fontWeight: 'bold', mb: '0.625rem' }}>Reviews</Typography>
                        <List sx={{ overflowY: 'scroll', maxHeight: '26.25rem', fontWeight: 'bold', mb: '0.625rem' }}>
                            {comments.map((html, index) => (
                                <ListItem key={index} sx={{ width: '100%', bgcolor: '#fafafa', borderRadius: '0.1875rem', my: '0.1875rem' }}>
                                    <ListItemText
                                        primary={
                                            <Box sx={{ display: 'flex', alignItems: 'center', mt: '0.3125rem', width: '70%' }}>
                                                <Avatar />
                                                <Box sx={{ ml: '0.5rem' }}>Nate</Box>
                                            </Box>}
                                    secondary={<div dangerouslySetInnerHTML={{__html: html}} />}
                                        primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: 'bold', mb: '0.3125rem' }}
                                        secondaryTypographyProps={{ fontSize: '0.75rem' }}
                                    />
                                </ListItem>
                            ))}
                        </List>

                        <Box sx={{ display: 'flex', alignItems: 'center', mt: '0.625rem', width: '100%' }}>
                            <TextField
                                label="Add a comment"
                                placeholder="Add a comment"
                                value={comment}
                                onChange={onChangeHandler}
                                variant="outlined"
                                size="small"
                                sx={{ flexGrow: 1,  mr: '0.625rem', fontSize: '0.75rem' }}
                                InputProps={{ sx: { borderRadius: '1.25rem', pl: '0.625rem' } }}
                            />
                            <Box sx={{ display: 'flex', alignItems: 'center',  mt: '0.3125rem', width: '35%'  }}>
                                <div> <Rating
                                    name="rating"
                                    value={selectedRating}
                                    onChange={handleRatingChange}
                                    size="small"
                                    sx={{ mr: '0.625rem' }}
                                /></div>
                            </Box>
                            <IconButton onClick={handleImageUpload} size="small">
                                <AddAPhotoIcon sx={{ fontSize: '1.125rem' }} />
                            </IconButton>
                            <IconButton onClick={() => {
                                onClickHandler();
                            }} size="small">
                                <SendIcon sx={{ fontSize: '1.125rem' }} />
                            </IconButton>
                        </Box>
                    </Box></Typography>}

                {selectedTab === 1 && <Typography variant="body1">
                    <img src="https://picsum.photos/id/17/200" alt="Image" style={{ width: '100%', borderRadius: '0.3125rem' }} />
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',my: '0.625rem', width: '100%' }}>
                        <InputLabel sx={{ fontSize: '1rem', fontWeight: 'bold' }}>Helena's Spot</InputLabel>
                        <Box sx={{ display: 'flex', alignItems: 'center', my: '0.3125rem' }}>
                            <Rating name="size-small" defaultValue={3} size="extra-small" readOnly />
                            <Typography variant="caption" sx={{  ml: '0.3125rem' }}>3.0</Typography>
                        </Box>
                        <Typography variant="caption" sx={{ mt: '0.3125rem' }}>Park • Private</Typography>
                        <Typography variant="body2" sx={{ mt: '0.3125rem', textAlign: 'center' }}>
                            Helena's Spot is a private location nestled in a quiet and peaceful park.
                            It's the perfect choice for those looking to get away from the hustle and bustle
                            of the city and enjoy the beauty of nature. </Typography>
                    </Box>

                </Typography>}
            </Box>
        </Container>
    )};
export default InfoList;

