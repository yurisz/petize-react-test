import React, { useContext } from 'react';
import { Avatar, Box, Grid, AppBar as MUIAppBar, Typography, useMediaQuery, useTheme } from '@mui/material';
import Logo from './Logo';
import '../css/components/app-bar.css'
import { DEFAULT_PAGE_PADDING, SMALL_PAGE_PADDING } from '../defaults';
import SearchAutocompleteInput from './SearchAutocompleteInput';
import { GlobalContext } from '../App';


const SMALL_SPACING = 20;


const AppBar = () => {

    const { search, repositories, getUserRepositories, dispatch } = useContext(GlobalContext);
    const theme = useTheme();
    const downMd = useMediaQuery(theme.breakpoints.down('md'));

    const searchInputOnChange = (event, value, reason) => {
        if (reason === 'reset') return;
        dispatch({ type: 'search', field: 'inputValue', value: (value || '') });
        (value) && searchUser(event, value)
    };

    const searchUser = async (event, value) => {
        dispatch({ type: 'loading', field: 'search', value: true });

        const response = await fetch(`https://api.github.com/users/${value}`);
        if (response.ok) {
            const responseJson = await response.json()
            dispatch({
                type: 'search',
                field: 'options',
                value: (Object.entries(responseJson)?.length) ? [responseJson] : []
            });
        }

        dispatch({ type: 'loading', field: 'search', value: false });
    };

    const searchAutocompleteOnChange = (event, value, reason) => {
        if (reason === 'selectOption') {
            (!search.inputValue) && dispatch({ type: 'search', field: 'inputValue', value: value?.login });
            dispatch({ type: 'search', field: 'option', value });
            dispatch({ type: 'search', field: 'options', value: [] });
            (value?.id !== repositories?.[0]?.owner?.id) && dispatch({ field: 'repositories', value: [] });
            (value?.repos_url) && getUserRepositories(value?.repos_url);
        }
    }

    const handleSearchAutocompleteOnClose = event => dispatch({ type: 'search', field: 'options', value: [] });


    return (
        <MUIAppBar
            elevation={0}
            color='inherit'
            style={{ padding: `${SMALL_SPACING}px ${(downMd) ? SMALL_PAGE_PADDING : DEFAULT_PAGE_PADDING}px` }}
            className='app-bar'
        >
            <Grid container style={{ gap: (downMd) ? SMALL_PAGE_PADDING : DEFAULT_PAGE_PADDING }}>
                <div>
                    <Logo fontSize={32} />
                </div>
                <Grid item xs={12} sm={6}>
                    <SearchAutocompleteInput
                        noOptionsText='Sem opções'
                        onClose={handleSearchAutocompleteOnClose}
                        open={!!search.options.length}
                        value={search.option}
                        onChange={searchAutocompleteOnChange}
                        inputValue={search.inputValue}
                        onInputChange={searchInputOnChange}
                        options={search.options}
                        getOptionLabel={(option) => (option?.name || option?.login || '')}
                        isOptionEqualToValue={(option, value) => (option?.id === value?.id)}
                        renderOption={(props, option) => (
                            <Box component='li' {...props} style={{ display: 'flex', gap: 10 }}>
                                <Avatar alt='User avatar' src={option?.avatar_url || ''} />
                                <Typography>
                                    {option?.name || option?.login || ''}
                                    {(option?.company) ? ` (${option.company})` : null}
                                    {(option?.location) ? ` - ${option.location}` : null}
                                </Typography>
                            </Box>
                        )}
                    />
                </Grid>
            </Grid>
        </MUIAppBar>
    )
};


export default AppBar;