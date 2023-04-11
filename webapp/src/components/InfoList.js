import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import {
    FormControl,
    SelectEmpty,
    Loading,
    Container,
    MarginBottom,
} from './styles/ListStyle.js';
import Rating from "react-rating-stars-component";
import {IconButton, Grid,List, ListItem, ListItemText, Box, ListItemAvatar, Avatar } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CloseIcon from "@mui/icons-material/Close";

const InfoList = ({isInfoVisible, onInfoList,selected}) => {

const[comment,setComment] = useState("");
const[comments,setComments]=useState(['This is a great spot!', 'I love coming here.']);

    const style = {
        display: isInfoVisible ? 'block' : 'none',
        backgroundColor: '#fff',
        borderRadius: '0.3125rem',
        padding: '0.625rem',
        maxWidth: '18.75rem',
        minWidth: '15.625rem',
    };

const onClickHandler = () =>{
    setComments((comments) => [...comments, comment]);
    setComment('');
    console.log(selected.name);
};
const onChangeHandler = (e) => {
setComment(e.target.value);
};

////////////////////////
    const handleAddButtonClick = () => {
        onInfoList();
    };


    return (
        <Container style={style}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}} >

                <IconButton style={{ marginLeft: '16.25rem', marginTop: '-0.625rem'}} onClick={() => {
                    handleAddButtonClick(); // PANELİN AÇILIP KAPANMA İŞLEMİNİ YAPTIK
                }}><CloseIcon/>
                </IconButton>
                <img src="https://picsum.photos/200" alt="Image" style={{ width: '90%', borderRadius: '0.3125rem' }} />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',my: '0.625rem', width: '100%' }}>
                    <InputLabel sx={{ fontSize: '1rem', fontWeight: 'bold' }}>{selected[0].name}</InputLabel>
                    <Box sx={{ display: 'flex', alignItems: 'center', my: '0.3125rem' }}>
                        <Rating name="rating" count={5} size="small" defaultValue={3} precision={0.5} readOnly />
                        <Typography variant="caption" sx={{  ml: '0.3125rem' }}>3.0</Typography>
                    </Box>
                    <Typography variant="caption" sx={{ mt: '0.3125rem' }}>{selected[0].type} • {selected[0].privacy}</Typography>
                </Box>
                <Box sx={{ width: '100%', backgroundColor: '#f5f5f5', borderRadius: '0.3125rem', p: '0.625rem', my: '0.625rem' }}>
                    <Typography variant="caption" sx={{ fontWeight: 'bold', mb: '0.625rem' }}>Reviews</Typography>
                    <List sx={{ overflowY: 'scroll',  maxHeight: '6.25rem', fontWeight: 'bold', mb: '0.625rem' }}>
                        {comments.map((text, index) => (
                            <ListItem key={index} sx={{ bgcolor: '#fafafa', borderRadius: '0.1875rem', my: '0.1875rem' }}>
                                <ListItemAvatar>
                                    <Avatar alt="Profile Picture" src="https://picsum.photos/id/446/50/50" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Nate"
                                    secondary={text}
                                    primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: 'bold', mb: '0.3125rem' }}
                                    secondaryTypographyProps={{ fontSize: '0.75rem' }}
                                />
                                <Box sx={{ display: 'flex', alignItems: 'center', mt: '0.3125rem', width: '25%' }}>
                                    <Rating name="rating" count={5} size={12} defaultValue={3} precision={0.5} readOnly  />
                                </Box>
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
                            <div><Rating name="rating" count={5} size={12} defaultValue={3} precision={0.5} readOnly /></div>
                        </Box>
                        <IconButton onClick={onClickHandler} size="small">
                            <AddAPhotoIcon sx={{ fontSize: '1.125rem' }} />
                        </IconButton>
                        <IconButton onClick={onClickHandler} size="small">
                            <SendIcon sx={{ fontSize: '1.125rem' }} />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </Container>
    )};
export default InfoList;