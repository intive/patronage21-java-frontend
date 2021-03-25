import React from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
        lineHeight: '50px',
        height: 50
    },
    input: {
        flex: 1,
        padding: '2px 10px',
    },
    iconButton: {
        padding: 10,
    },
}));

function SearchInput(props) {
    const classes = useStyles();

    return (
        <Paper component="form" className={classes.paper} variant="outlined" square>
            <InputBase
                className={classes.input}
                placeholder={props.placeholder}
                inputProps={{ "aria-label": props.ariaLabel }}
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    )
};

export default SearchInput;