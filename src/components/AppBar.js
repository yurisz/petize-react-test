import React, { useContext } from 'react';
import { Grid, AppBar as MUIAppBar, useMediaQuery, useTheme } from '@mui/material';
import Logo from './Logo';
import '../css/components/app-bar.css'
import { DEFAULT_PAGE_PADDING, SMALL_PAGE_PADDING } from '../defaults';
import SearchAutocompleteInput from './SearchAutocompleteInput';
import { GlobalContext } from '../App';


const SMALL_SPACING = 20;


const AppBar = () => {

    const { search } = useContext(GlobalContext);
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));


    return (
        <MUIAppBar
            elevation={0}
            color='inherit'
            style={{ padding: `${SMALL_SPACING}px ${(md) ? SMALL_PAGE_PADDING : DEFAULT_PAGE_PADDING}px` }}
            className='app-bar'
        >
            <Grid container style={{ gap: (md) ? SMALL_PAGE_PADDING : DEFAULT_PAGE_PADDING }}>
                <div>
                    <Logo fontSize={32} />
                </div>
                <Grid item xs={12} sm={6}>
                    <SearchAutocompleteInput
                        readOnly
                        inputValue={search.inputValue}
                        options={[]}
                    />
                </Grid>
            </Grid>
        </MUIAppBar>
    )
};


export default AppBar;