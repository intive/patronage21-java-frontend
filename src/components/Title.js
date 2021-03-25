import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
    bold: {
        fontWeight: 600
    }
});

function Title(props) {
    const classes = useStyles();
    return (
        <Box my={4}>
            <Typography variant="h5" component="h1" color="primary" className={classes.bold}>
                {props.title}
            </Typography>
        </Box>
    )
};

export default Title;