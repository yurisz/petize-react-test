import { Autocomplete, InputAdornment, TextField } from '@mui/material';
import React from 'react';
import { SearchIcon } from '../defaults';


const SEARCH_INPUT_HEIGHT = 48;


const SearchAutocompleteInput = (props) => (
    <Autocomplete
        {...props}
        renderInput={(params) => (
            <TextField
                {...params}
                placeholder='Search'
                InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                        <InputAdornment position='start'>
                            <SearchIcon size={24} />
                        </InputAdornment>
                    ),
                    style: {
                        maxHeight: SEARCH_INPUT_HEIGHT
                    }
                }}
                style={{ maxHeight: SEARCH_INPUT_HEIGHT }}
            />
        )}
    />
);


export default SearchAutocompleteInput;