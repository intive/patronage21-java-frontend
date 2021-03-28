import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    formControl: {
        display: 'flex'
    }
});

function SelectInput(props) {
    const [value, setValue] = useState(props.techGroups[0].value);
    const classes = useStyles();
    const handleChange = e => setValue(e.target.value);
    const items = props.techGroups.map(group => <MenuItem value={group.value} key={group.value}>{group.name}</MenuItem>);

    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <Select
                className={classes.input}
                value={value}
                onChange={handleChange}
            >
                {items}
            </Select>
        </FormControl>
    )
};

SelectInput.propTypes = {
    techGroups: PropTypes.array.isRequired
};

SelectInput.defaultProps = {
    techGroups: [{
        "value": "-",
        "name": "-"
    }]
}

export default SelectInput;