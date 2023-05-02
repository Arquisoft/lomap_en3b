import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import {
    Container, FormControl,
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
import EmojiEmotionsSharpIcon from '@mui/icons-material/EmojiEmotionsSharp';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import EditIcon from '@mui/icons-material/Edit';


/**
 * This is the info list that displays the details about an added location and also lets you add comments and revies
 *
 *
 * The component receives props such as isInfoVisible, onInfoList, selected, and newComments.
 * It renders the UI inside a container with the style attribute that depends on the isInfoVisible prop.
 *  It defines a set of states using the useState hook, such as comment, comments, selectedTab, selectedRating, name, category, privacy, and key.

    The component also includes various functions that handle events like onChangeHandler, onClickHandler, handleImageUpload, handleAddButtonClick, handleTabChange, and handleRatingChange.
 These functions set the states of the component when events occur.
 * @param isInfoVisible
 * @param onInfoList
 * @param selected
 * @param newComments
 */

const InfoList = ({isInfoVisible, onInfoList,selected,newComments, onEditMarker}) => {

    const[comment,setComment] = useState("");
    const[commentpic,setCommentpic] = useState("");
    const[comments,setComments]=useState([]);
    const[review,setReview]=useState([]);
    const[image,setImage]=useState("");
    const[description,setDescription]=useState("");
    const[stars,setStars]=useState(0);
    const [isValid,setIsValid] = useState(false);
    const validationError = document.getElementById("validation-error");
    const validationErrorRef = React.useRef(null);


    

    const [selectedTab, setSelectedTab] = useState(1);
    const [selectedRating, setSelectedRating] = useState(2); // default rating is 2
    const [selectedEmoji, setSelectedEmoji] = useState(null);
    const [ınfo,setInfo] = useState(1);
    const [edit,setEdit] = useState(3);
    const onClickEdit = () => {
        if (ınfo === 1 && edit === 3) {
            setInfo(3);
            setEdit(1);
        } else {
            setInfo(1);
            setEdit(3);
        }
    };
    /////
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [privacy, setPrivacy] = useState('public');
    const[pic,setPic] = useState(""); //Picture
    const [key, setKey] = useState('');
    

    /////////////////////////////////picture
    const handleImageUploadpic = () => {
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

    /////
        const [anchorEl, setAnchorEl] = React.useState(null);

        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };

        const handleClose = () => {
            setAnchorEl(null);
        };

        const open = Boolean(anchorEl);
        const id = open ? 'simple-popover' : undefined;

    /////////////////////////////



    const style = {
        display: isInfoVisible ? 'block' : 'none',
        backgroundColor: '#fff',
        borderRadius: '0.3125rem',
        padding: '0.625rem',
        maxWidth: '18.75rem',
        minWidth: '15.625rem',
    };


     // Define an event handler to update the list with the propertys from the selected component
    React.useEffect(() => {
        if (isInfoVisible) {

           upgradeComments();

          setName(selected[0].name);
          setCategory(selected[0].category); //setters for every field in the infoList
          setPrivacy(selected[0].privacy);
          
          setKey(selected[0].key);
          setDescription(selected[0].description);
          setImage(selected[0].pic);
          countStars();
        } else {
          setComments([]);
        }
      }, [selected]);


      const countStars = () => {
        let totalStars = 0;
        let totalComments = 0;
        review.forEach((comment) => {
          
            totalStars += comment.ratingStars.split('⭐').length - 1;
            totalComments += 1;
          
        });
        const averageStars = totalComments > 0 ? totalStars / totalComments : 0;
        setStars(averageStars);
      }
      
      




    // Define an event handler to add a new comment to the comments array

    const onClickHandler = () => {
        let ratingStars = '';
        if (selectedRating === 1) {
            ratingStars = '⭐';
        } else {
            ratingStars = '⭐'.repeat(selectedRating);
        }

        setReview((prevReview) => [...prevReview, {comment, commentpic, ratingStars}]);

        setComments((comments) => [...comments, `<div style="margin-bottom: 5px;">${comment}</div><div>${commentpic}</div><div>${ratingStars}</div>`]);
        setComment('');
        setCommentpic('');
    };


    const upgradeComments = () => {
        try {
          if (!selected || !selected[0] || !selected[0].comments) {
            throw new Error("Comments are not available.");
          }
          const newComments = selected[0].comments.map((comment) => {
            const { comment: text, commentpic, ratingStars } = comment;
      
            return `<div style="margin-bottom: 5px;">${text}</div><div>${commentpic}</div><div>${ratingStars}</div>`;
          });
          setComments(newComments);
        } catch (error) {
          console.error(error);
          // handle the error here, for example:
          // setComments(["No comments available."]);
        }
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
                    setCommentpic(` <img src="${resizedImageDataUrl}" alt="comment-image"/>`);
                };
            };
        };
        input.click();
    };

    //The close button handler
    //When we close the infoList we send a new object to the map component with the new comment and the key of the location we need to update
    const handleAddButtonClick = () => {
        onInfoList();
        setSelectedTab(1);
        
        newComments( {key,review});

    };

    const handleButtonEdit = () =>{
        if(isValid){
            onInfoList();
            setSelectedTab(1);
            setInfo(1);
            setEdit(3);
            onEditMarker({ key,name, category, privacy,pic,description });//sends an object containing the new values to the Map component where we update the location
            validationErrorRef.current.style.display = "none";
            setIsValid(false);
        }else{
            validationErrorRef.current.style.display = "block";
        }

    };

    React.useEffect(() => {
        
        if (name !== '' && category !== '') {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [name, category]);

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
                        <List sx={{ overflowY: 'scroll', maxWidth:'17rem', maxHeight: '22.25rem', fontWeight: 'bold', mb: '0.625rem' }}>
                            {comments.map((html, index) => (
                                <ListItem key={index} sx={{ width: '100%', bgcolor: '#fafafa', borderRadius: '0.1875rem', my: '0.1875rem' }}>
                                    <ListItemText
                                        primary={
                                            <Box sx={{ display: 'flex', alignItems: 'center', mt: '0.3125rem', width: '70%' }}>
                                                <Avatar />
                                                <Box sx={{ ml: '0.5rem' }}>Batu</Box>
                                            </Box>}
                                        secondary={<div dangerouslySetInnerHTML={{__html: html}} />}
                                        primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: 'bold', mb: '0.3125rem' }}
                                        secondaryTypographyProps={{ fontSize: '0.75rem' }}
                                    />
                                </ListItem>
                            ))}
                        </List>
                        <Box sx={{ display: 'flex', alignItems: 'center',  mt: '0.3125rem', width: '35%'  }}>
                            <div> <Rating
                                name="rating"
                                value={selectedRating}
                                onChange={handleRatingChange}
                                size="small"
                                sx={{ mr: '0.625rem' }}
                            />  </div>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: '0.625rem', width: '100%' }}>
                            <TextField
                                label="Add a comment"
                                placeholder="Add a comment"
                                value={comment}
                                onChange={onChangeHandler}
                                variant="outlined"
                                size="small"
                                multiline
                                rows={2} // how much rows show when ıts started
                                maxRows={3} // max rows number
                                sx={{ flexGrow: 1,  mr: '0.625rem', fontSize: '0.75rem' }}
                                InputProps={{ sx: { borderRadius: '1.25rem', pl: '0.625rem' } }}
                            />

                            <IconButton aria-describedby={id} variant="contained" onClick={handleClick}>
                                <EmojiEmotionsSharpIcon sx={{ fontSize: '1.125rem' }}/>
                            </IconButton>
                            <Popover
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}

                            >
                                <Typography sx={{ p: 2 }}>
                                    <IconButton  style={{ fontSize: '1rem' }} onClick={() => setComment(prevComment => prevComment + '❤️')}>❤️</IconButton>
                                    <IconButton  style={{ fontSize: '1rem' }} onClick={() => setComment(prevComment => prevComment + '👍')}>👍</IconButton>
                                    <IconButton  style={{ fontSize: '1rem' }} onClick={() => setComment(prevComment => prevComment + '👌')}>👌</IconButton>
                                    <IconButton  style={{ fontSize: '1rem' }} onClick={() => setComment(prevComment => prevComment + '✨')}>✨</IconButton>
                                </Typography>
                            </Popover>
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
                {selectedTab === ınfo && <Typography variant="body1">
                {image && <img src={image} alt="Image" style={{ width: '100%', borderRadius: '0.3125rem' }} onError={() => setImage(null)} />}

                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',my: '0.625rem', width: '100%' }}>
                        <InputLabel sx={{ fontSize: '1rem', fontWeight: 'bold' }}>{name}</InputLabel>
                        <Box sx={{ display: 'flex', alignItems: 'center', my: '0.3125rem' }}>
                            <Rating name="size-small" value={stars} size="extra-small" readOnly />

                        </Box>
                        <Typography variant="caption" sx={{ mt: '0.3125rem' }}>{category} • {privacy}</Typography>
                        <Typography variant="body2" sx={{ mt: '0.3125rem', textAlign: 'center' }}>
                          {description} </Typography>
                        <IconButton onClick={onClickEdit} size="small"><EditIcon/></IconButton>
                    </Box>
                </Typography>}
                {selectedTab === edit && <Typography variant="body1">
                    <Container style={style}>
                        <>

                            <div style={{ display: 'flex', flexDirection: 'column'}} >
                                <FormControl style={{ width: '100%' }}>
                                    <InputLabel> Name </InputLabel>
                                    <TextField style={{ width: '100%' }} value={name} onChange={(e) => setName(e.target.value)} />
                                </FormControl>
                                <FormControl style={{ width: '100%'}}>
                                    <InputLabel>Type</InputLabel>
                                    <Select style={{ width: '100%', minWidth: '100px' }} value={category} onChange={(e) => setCategory(e.target.value)}>
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
                                    <Button  onClick={handleImageUploadpic} size='small'>
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
                                <div id="validation-error" ref={validationErrorRef} style={{ display: 'none', color: 'red', marginTop: '0.5rem' }}>
                                     Please complete name and type .
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center'}}>
                                    <Button variant="contained" style={{ backgroundColor: 'grey' }} onClick={() => {
                                        handleButtonEdit(); //event to know that the action is finoished
                                    }}>
                                        Finish
                                    </Button>
                                    <IconButton onClick={onClickEdit} size="small"><EditIcon/></IconButton>
                                </div>
                            </div>
                        </>
                    </Container>
                </Typography>}

            </Box>
        </Container>
    )};
export default InfoList;

