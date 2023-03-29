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
import {IconButton, Grid,List, ListItem, ListItemText, Box } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';



const InfoList = ({isInfoVisible, onInfoList}) => {

const[comment,setComment] = useState("");
const[comments,setComments]=useState(['This is a great spot!', 'I love coming here.']);

    const style = {
        display: isInfoVisible ? 'block' : 'none',
        backgroundColor: '#fff',
        borderRadius: '5px',
        padding: '10px',
        maxWidth: '300px',
        minWidth: '250px',
    };
const onClickHandler = () =>{
    setComments((comments) => [...comments, comment]);
    setComment('');
};
const onChangeHandler = (e) => {
setComment(e.target.value);
};


    return (
        <Container style={style}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src="https://picsum.photos/200" alt="Image" style={{ width: '100%', borderRadius: '5px' }} />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: '10px', width: '100%' }}>
                    <InputLabel sx={{ fontSize: '16px', fontWeight: 'bold' }}>Helena's Spot</InputLabel>
                    <Box sx={{ display: 'flex', alignItems: 'center', my: '5px' }}>
                        <Rating name="rating" count={5} size="small" defaultValue={3} precision={0.5} readOnly />
                        <Typography variant="caption" sx={{ ml: '5px' }}>3.0</Typography>
                    </Box>
                    <Typography variant="caption" sx={{ mt: '5px' }}>Park • Private</Typography>
                </Box>
                <Box sx={{ width: '100%', backgroundColor: '#f5f5f5', borderRadius: '5px', p: '10px', my: '10px' }}>
                    <Typography variant="caption" sx={{ fontWeight: 'bold', mb: '10px' }}>Comments</Typography>
                    <List sx={{ overflowY: 'scroll', maxHeight: '100px', fontWeight: 'bold', mb: '10px' }}>
                        {comments.map((text, index) => (
                            <ListItem key={index} sx={{ bgcolor: '#fafafa', borderRadius: '3px', my: '3px' }}>
                                <ListItemText primary={text} primaryTypographyProps={{ fontSize: '14px', fontWeight: 'bold' }} />
                            </ListItem>
                        ))}
                    </List>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: '10px', width: '100%' }}>
                        <TextField
                            label="Add a comment"
                            placeholder="Add a comment"
                            value={comment}
                            onChange={onChangeHandler}
                            variant="outlined"
                            size="small"
                            sx={{ flexGrow: 1, mr: '10px', fontSize: '12px' }}
                            InputProps={{ sx: { borderRadius: '20px', pl: '10px' } }}
                        />
                        <IconButton onClick={onClickHandler} sx={{ mt: '5px' }}>
                            <SendIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </Container>

    )};
export default InfoList;