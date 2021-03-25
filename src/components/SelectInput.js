import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
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
    }
}));

function SelectInput(props) {
    const [value, setValue] = useState(props.techGroups[0].value);
    const classes = useStyles();
    const handleChange = e => setValue(e.target.value);
    const items = props.techGroups.map(group => <MenuItem value={group.value} key={group.value}>{group.name}</MenuItem>);

    return (
        <Paper component="form" className={classes.paper} variant="outlined" square>
            <Select
                className={classes.input}
                value={value}
                onChange={handleChange}
                disableUnderline
            >
                {items}
            </Select>
        </Paper>
    )
};

export default SelectInput;