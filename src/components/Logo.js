import { useTheme } from '@emotion/react';
import React from 'react';
import '../css/components/logo.css';


const Logo = ({ fontSize }) => {

    const theme = useTheme();


    return <div style={{ fontSize }} className='logo'>
        <span style={{ color: theme.palette.secondary.main }}>Search</span>
        <span> </span>
        <span style={{ color: theme.palette.primary.main }}>d_evs</span>
    </div>
};


export default Logo;