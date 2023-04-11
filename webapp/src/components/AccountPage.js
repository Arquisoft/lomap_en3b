import React, { useState } from 'react';
import { Box, Container } from "@mui/material";
import { Avatar, Typography, Divider, Tabs, Tab,IconButton,ListItemButton,List,ListItem, TextField } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import RedditIcon from '@mui/icons-material/Reddit';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LocationOffIcon from '@mui/icons-material/LocationOff';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import CloseIcon from "@mui/icons-material/Close";

const AccountPage = ({ isAccountVisible, onAccountPage }) => {

    const [selectedTab, setSelectedTab] = useState(0);
    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const style = {
        display: isAccountVisible ? 'block' : 'none',
        backgroundColor: '#fff',
        borderRadius: '1rem', // kenar yuvarlatma
        width: '30%', // panel genişliği %30
        height: '88vh', // biraz boşluk bırakmak için %10 boşluk
        margin: '10vh 2vh 10vh 10vh', // üstünden ve altından boşluk bırak
        padding: '0',
        zIndex: '999',
        position: 'fixed',
        top: '0',
        right: '0', // sağ tarafta

        // Responsive styles
        '@media screen and (max-width: 768px)': {
            width: '60%',
            height: '70vh',
            margin: '5vh auto',
        },

        '@media screen and (max-width: 480px)': {
            width: '80%',
            height: '60vh',
            margin: '5vh auto',
            borderRadius: '0.5rem',
        }
    }

    const handleAddButtonClick = () => {
        onAccountPage();
    };

    ///////////////////////////////For Friend Part

    const [filter, setFilter] = useState('');

    const contacts = [
        { name: 'Sofia Martinez', avatar: 'https://picsum.photos/id/239/200/300' },
        { name: 'Alejandro Reyes', avatar: 'https://picsum.photos/id/240/200/300' },
        { name: 'Valentina Torres', avatar: 'https://picsum.photos/id/258/200/300' },
        { name: 'Diego Ramirez', avatar: 'https://picsum.photos/id/275/200/300' },
        { name: 'Isabella Garcia', avatar: 'https://picsum.photos/id/334/200/300' },
    ];

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const filteredContacts = contacts.filter((contact) => {
        return contact.name.toLowerCase().includes(filter.toLowerCase());
    });

    return (
        <Container style={style}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                <IconButton style={{marginRight: '26.25rem'}} onClick={() => {
                    handleAddButtonClick(); // PANELİN AÇILIP KAPANMA İŞLEMİNİ YAPTIK
                }}><CloseIcon/>
                </IconButton>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                        alt="John Doe"
                        src="https://picsum.photos/id/27/200/300"
                        sx={{ width: '8rem', height: '8rem', marginTop: '0.5rem' }}
                    />
                    <IconButton sx={{ marginLeft: '-2.25rem', marginTop: '-2.25rem' }}>
                        <AddPhotoAlternateIcon />
                    </IconButton>
                </Box>
                <Typography variant="h5" sx={{ marginTop: '0.125rem' }}>Javier Rodriguez</Typography>
                <Typography variant="subtitle1" sx={{ marginTop: '0.0625rem' }}>@javiier</Typography>
                <Typography variant="subtitle2">3 locations · 5 friends</Typography>
                <Divider sx={{ width: '90%', marginTop: '0.1875rem' }} />
                <Tabs
                    value={selectedTab}
                    onChange={handleTabChange}
                    indicatorColor="inherit"
                    textColor="inherit"
                    sx={{ marginTop: '0.1875rem' }}
                >
                    <Tab label="Locations" icon={<LocationOnIcon />} />
                    <Tab label="Friends" icon={<PeopleIcon />} />
                    <Tab label="About me" icon={<PersonIcon />} />
                </Tabs>
                <Box sx={{ marginTop: '0.1875rem', width: '90%' }}>
                    {selectedTab === 0 && <Typography variant="body1">
                        <div style={{ overflowY: 'auto', maxHeight: '14.625rem' }}>
                            <List sx={{ width: '100%', maxWidth: '22.5rem', bgcolor: 'background.paper' }}>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <Avatar variant="square" src="https://picsum.photos/id/39/200/300" />
                                        </ListItemIcon>
                                        <ListItemText primary="El Sol Dorado" secondary="Jan 9, 2023" />
                                        <ListItemText>
                                            <Typography variant="caption" style={{ color: 'rgba(0, 0, 0, 0.54)' }}>
                                                <List><ListItem>public · bar</ListItem>
                                                </List></Typography>
                                        </ListItemText>
                                        <IconButton>
                                            <LocationOffIcon/>
                                        </IconButton>
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <Avatar variant="square" src="https://picsum.photos/id/55/200/300" />
                                        </ListItemIcon>
                                        <ListItemText primary="Relax Spot" secondary="Jan 9, 2023"/>
                                        <ListItemText>
                                            <Typography variant="caption" style={{ color: 'rgba(0, 0, 0, 0.54)' }}>
                                                <List><ListItem>private · park</ListItem>

                                                </List></Typography>
                                        </ListItemText>
                                        <IconButton>
                                            <LocationOffIcon/>
                                        </IconButton>
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <Avatar variant="square" src="https://picsum.photos/id/211/200/300" />
                                        </ListItemIcon>
                                        <ListItemText primary="Danny's Boat" secondary="Jan 9, 2023"/>
                                        <ListItemText>
                                            <Typography variant="caption" style={{ color: 'rgba(0, 0, 0, 0.54)' }}>
                                                <List><ListItem>private · other</ListItem>

                                                </List></Typography>
                                        </ListItemText>
                                        <IconButton>
                                            <LocationOffIcon/>
                                        </IconButton>
                                    </ListItemButton>
                                </ListItem>

                            </List>
                        </div>
                    </Typography>}

                    {selectedTab === 1 && <Typography variant="body1">
                        <div>
                            <TextField
                                label="Search Friend"
                                variant="outlined"
                                value={filter}
                                onChange={handleFilterChange}
                                sx={{ mb: 2, width: '100%', height: '50px', fontSize: '1.5rem' }}
                            />

                            <div style={{ overflowY: 'auto', maxHeight: '10.625rem' }}>
                                <List sx={{ width: '100%', maxWidth: '22.5rem' }} aria-label="contacts">
                                    {filteredContacts.map((contact) => (
                                        <ListItem disablePadding key={contact.name}>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <Avatar src={contact.avatar} />
                                                </ListItemIcon>
                                                <ListItemText primary={contact.name} />
                                                <IconButton>
                                                    <PersonRemoveIcon />
                                                </IconButton>
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                            </div>
                        </div>

                    </Typography>}
                    {selectedTab === 2 && <Typography variant="body1">
                        <div style={{ overflowY: 'auto', maxHeight: '12.5rem' }}>
                        <div>Hello! I'm a software engineering student at the University of Oviedo.
                            My hobbies include listening to music, reading books, and exploring new places!</div>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 3 }}>
                            <IconButton aria-label="Instagram">
                                <InstagramIcon />
                            </IconButton>
                            <IconButton aria-label="Twitter">
                                <TwitterIcon />
                            </IconButton>
                            <IconButton aria-label="Reddit">
                                <RedditIcon />
                            </IconButton>
                        </Box>
                        </div>

                    </Typography>}
                </Box>
            </Box>
        </Container>
    )
};

export default AccountPage;
