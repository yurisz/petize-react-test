import { Button, Grid, TextField } from '@mui/material';
import React from 'react';
import Logo from '../../components/Logo';
import '../../css/pages/home.css';
import { useTheme } from '@emotion/react';
import { SearchIcon } from '../../defaults';


const LOGO_FONT_SIZE = 80;
const DEFAULT_SPACING = 56;


const Home = () => {

    const theme = useTheme();
    //[ DEVELOPMENT ONLY ]
    console.log('theme', theme);
    console.log('theme.breakpoints.up("sm")', theme.breakpoints.up('sm'));


    return <Grid container className='home'>
        <Grid item xs={12} sm={10} style={{ gap: DEFAULT_SPACING }} className='box'>
            <div>
                <Logo fontSize={LOGO_FONT_SIZE} />
            </div>
            <Grid container item xs={12} style={{ gap: DEFAULT_SPACING }}>
                {/* //[ DEVELOPMENT ONLY ] */}
                {/* <Grid item xs={12} sm={10} style={{ maxWidth: (theme.breakpoints.up('sm')) ? `calc(83.333333% - ${DEFAULT_SPACING}px)` : '' }}> */}
                <Grid item xs={12} sm={10}>
                    <TextField fullWidth placeholder='Search' InputProps={{ startAdornment: <SearchIcon /> }} />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Button fullWidth color='primary' variant='contained' size='large' style={{ height: DEFAULT_SPACING }} className='search-button'>Search</Button>
                </Grid>
            </Grid>
        </Grid>
    </Grid >
};


export default Home;