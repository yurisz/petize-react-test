import { Button, Grid, TextField } from '@mui/material';
import React from 'react';
import Logo from '../../components/Logo';
import '../../css/pages/home.css';
import { SearchIcon } from '../../defaults';


const LOGO_FONT_SIZE = 80;
const DEFAULT_SPACING = 56;
const SMALL_SPACING = 32;


const Home = () => {


    return <Grid container className='home'>
        <Grid item xs={12} sm={10} style={{ gap: DEFAULT_SPACING }} className='box'>
            <div>
                <Logo fontSize={LOGO_FONT_SIZE} />
            </div>
            <Grid container item xs={12} style={{ gap: SMALL_SPACING }}>
                <Grid item xs={12} sm={10} className='search_input-div'>
                    <TextField fullWidth placeholder='Search' InputProps={{ startAdornment: <SearchIcon size={24} /> }} />
                </Grid>
                <Grid item xs={12} sm={2} className='search_button-div'>
                    <Button fullWidth color='primary' variant='contained' className='search-button'>Search</Button>
                </Grid>
            </Grid>
        </Grid>
    </Grid >
};


export default Home;