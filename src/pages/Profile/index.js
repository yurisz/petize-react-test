import React from 'react';
import '../../css/pages/profile.css';
import { Grid, useMediaQuery } from '@mui/material';
import { DEFAULT_PAGE_PADDING, SMALL_PAGE_PADDING } from '../../defaults';
import { useTheme } from '@emotion/react';
import User from './User';
import Repositories from './Repositories';


const Profile = () => {

    const theme = useTheme();
    const downMd = useMediaQuery(theme.breakpoints.down('md'));


    return <Grid container style={{ padding: `${(downMd) ? SMALL_PAGE_PADDING : DEFAULT_PAGE_PADDING}px`, gap: SMALL_PAGE_PADDING }} className='profile'>
        <Grid item xs={12} md={3}>
            <User />
        </Grid>
        <Grid item xs={12} md={9} style={{ maxWidth: (downMd) ? '' : `calc(75% - ${SMALL_PAGE_PADDING}px)` }}>
            <Repositories />
        </Grid>
    </Grid>;
};


export default Profile;