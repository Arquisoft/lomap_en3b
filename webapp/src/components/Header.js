import React,{useState} from 'react'
import {AppBar, Tabs, Toolbar, Typography, Tab, Button, useMediaQuery, useTheme,Box} from "@mui/material";
import FmdGoodIcon from '@mui/icons-material/FmdGood';

import DrawerComp from "./DrawerComp";
import {LogoutButton, SessionProvider} from "@inrupt/solid-ui-react";


const PAGES = ["Explore","Maps","Friends","Groups"];

const Header = ({ onAddMarker }) => {
    const [value, setValue] = useState();
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));
  
    const handleAddButtonClick = () => {
      onAddMarker();
    };

    return(
        <React.Fragment>
            <AppBar sx={{background: 'black'}}>
                <Toolbar sx={{ gap: 2 }}>
                    <FmdGoodIcon/>
                    {
                        isMatch ? (
                          <>
                              <Typography sx={{fontsize:'1.5rem',paddingLeft: "10%"}}>LOMAP</Typography>
                              <DrawerComp/>
                          </>
                        ) : (
                            <>
                                <Tabs
                                    sx={{marginLeft: '10px'}}
                                    textColor="inherit" value={value}
                                    onChange={(e,value)=> setValue(value)}
                                    indicatorColor="secondary">
                                              {
                                                  PAGES.map((page,index)=>(
                                                      <Tab key={index} label={page}/>

                                                  ))
                                              }
                                             
                                </Tabs>

                            <Box sx={{ marginLeft: 'auto', display: 'flex' }}>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    size="large"
                                    sx={{
                                        alignSelf: 'center',
                                         textTransform: 'none',
                                         fontWeight: 'bold'
                                     }}
                                    onClick={handleAddButtonClick}
                                >
                                 Add
                                </Button>
                               
                            </Box>
                               
                                <SessionProvider sessionId="LoMap">

                                    

                                    
                                             

                                    <LogoutButton>
                                        <Button sx={{marginLeft: '60em'}} variant="outlined" color="secondary" >Log out</Button>
                                    </LogoutButton>

                                </SessionProvider>


                            </>

                        )
                    }

                </Toolbar>
               

            </AppBar>
        </React.Fragment>
    )
}
 export default Header;