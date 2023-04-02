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

const AccountPage = ({ isAccountVisible, onAccountPage }) => {
    const [selectedTab, setSelectedTab] = useState(0);
    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const style = {
        display: isAccountVisible ? 'block' : 'none',
        backgroundColor: '#fff',
        borderRadius: '10px', // kenar yuvarlatma
        width: '30%', // panel genişliği %30
        height: '88vh', // biraz boşluk bırakmak için %10 boşluk
        margin: '10vh 2vh 100vh 100vh', // üstünden ve altından boşluk bırak
        padding: '0',
        zIndex: '999',
        position: 'fixed',
        top: '0',
        right: '0', // sağ tarafta
    }

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
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                        alt="John Doe"
                        src="https://picsum.photos/id/27/200/300"
                        sx={{ width: 128, height: 128, marginTop: 4 }}
                    />
                    <IconButton sx={{ marginLeft: '-36px', marginTop: '-36px' }}>
                        <AddPhotoAlternateIcon />
                    </IconButton>
                </Box>
                <Typography variant="h5" sx={{ marginTop: 2 }}>Javier Rodriguez</Typography>
                <Typography variant="subtitle1" sx={{ marginTop: 1 }}>@javiier</Typography>
                <Typography variant="subtitle2">3 locations · 5 friends</Typography>
                <Divider sx={{ width: '90%', marginTop: 3 }} />
                <Tabs
                    value={selectedTab}
                    onChange={handleTabChange}
                    indicatorColor="inherit"
                    textColor="inherit"
                    sx={{ marginTop: 3 }}
                >
                    <Tab label="Locations" icon={<LocationOnIcon />} />
                    <Tab label="Friends" icon={<PeopleIcon />} />
                    <Tab label="About me" icon={<PersonIcon />} />
                </Tabs>
                <Box sx={{ marginTop: 3, width: '90%' }}>
                    {selectedTab === 0 && <Typography variant="body1">
                        <div style={{ overflowY: 'auto', maxHeight: '200px' }}>
                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
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

                            <div style={{ overflowY: 'auto', maxHeight: '140px' }}>
                                <List sx={{ width: '100%', maxWidth: 360 }} aria-label="contacts">
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
                        <div style={{ overflowY: 'auto', maxHeight: '200px' }}>
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
