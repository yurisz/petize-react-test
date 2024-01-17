import { Avatar, Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import React, { useContext } from 'react';
import Logo from '../../components/Logo';
import '../../css/pages/home.css';
import { GlobalContext, PROFILE_PATH } from '../../App';
import SearchAutocompleteInput from '../../components/SearchAutocompleteInput';
import { useNavigate } from 'react-router-dom';


const LOGO_FONT_SIZE = 80;
const DEFAULT_SPACING = 56;
const SMALL_SPACING = 32;


const Home = () => {

    const navigate = useNavigate();
    const { home, search, dispatch } = useContext(GlobalContext);
    const { loading } = home;

    const searchInputOnChange = (e, value, reason) => {
        if (reason === 'reset') return;
        dispatch({ type: 'search', field: 'inputValue', value: (value || '') });
        (Object.entries(search.option)?.length) && dispatch({ type: 'search', field: 'option', value: {} });
    };

    const searchButtonOnClick = async (e) => {
        dispatch({ type: 'home', property: 'loading', field: 'search', value: true });

        const response = await fetch(`https://api.github.com/users/${search.inputValue}`);
        if (response.ok) {
            const responseJson = await response.json()
            dispatch({
                type: 'search',
                field: 'options',
                value: (Object.entries(responseJson)?.length) ? [responseJson] : []
            });
        }

        dispatch({ type: 'home', property: 'loading', field: 'search', value: false });
    };

    const searchAutocompleteOnChange = (e, value, reason) => {
        if (reason === 'selectOption') {
            (!search.inputValue) && dispatch({ type: 'search', field: 'inputValue', value: value?.login });
            dispatch({ type: 'search', field: 'option', value });
            dispatch({ type: 'search', field: 'options', value: [] });
            goToProfile({ e, value, reason });
        }
    }

    const goToProfile = ({ value }) => {
        navigate(`${PROFILE_PATH}/${value?.login}`);
    }


    return <Grid container className='home'>
        <Grid item xs={12} sm={10} style={{ gap: DEFAULT_SPACING }} className='box'>
            <div>
                <Logo fontSize={LOGO_FONT_SIZE} />
            </div>
            <Grid container item xs={12} style={{ gap: SMALL_SPACING }}>
                <Grid item xs={12} sm={10} className='search_input-div'>
                    <SearchAutocompleteInput
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
                <Grid item xs={12} sm={2} className='search_button-div'>
                    <Button fullWidth color='primary' variant='contained' disabled={!!loading.search} onClick={searchButtonOnClick} className='search-button'>
                        {(loading.search) ? <CircularProgress size={22} color='inherit' /> : 'Search'}
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    </Grid >
};


export default Home;