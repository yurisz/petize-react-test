import React from 'react';
import '../../css/pages/profile.css';
import { Grid, useMediaQuery } from '@mui/material';
import { DEFAULT_PAGE_PADDING, SMALL_PAGE_PADDING } from '../../defaults';
import { useTheme } from '@emotion/react';
import User from './User';


const Profile = () => {

    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));


    return <Grid container style={{ padding: `${(md) ? SMALL_PAGE_PADDING : DEFAULT_PAGE_PADDING}px` }} className='profile'>
        <Grid item xs={12} md={2}>
            <User />
        </Grid>
        <Grid item xs={12} md={10}></Grid>
    </Grid>;
};


export default Profile;