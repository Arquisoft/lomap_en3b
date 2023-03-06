import React,{useState} from 'react'
import {AppBar, Tabs, Toolbar, Typography, Tab, Button, useMediaQuery, useTheme} from "@mui/material";
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DrawerComp from "./DrawerComp";


const PAGES = ["Explore","Maps","Friends","Groups"];
const Header = () => {

    const [value, setValue] = useState();
    const theme = useTheme();
    console.log(theme);
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));
    console.log(isMatch);
    return(
        <React.Fragment>
            <AppBar sx={{background: 'black'}}>
                <Toolbar>
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
                                <Button sx={{marginLeft: 'auto'}} variant="outlined" color="secondary" startIcon={<AccountCircleIcon />}>Login</Button>
                                <Button sx={{marginLeft: '10px'}} variant="outlined" color="secondary" startIcon={<AddCircleOutlineIcon />}>Sign Up</Button>
                            </>

                        )
                    }

                </Toolbar>

            </AppBar>
        </React.Fragment>
    )
}
 export default Header;