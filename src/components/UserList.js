import React from 'react';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        background: '#eff9ff',
        display: 'flex',    
    },
    title: {
        flex: '1',
        fontWeight: 600,
        lineHeight: 'inherit' 
    },
    counter: {
        lineHeight: 'inherit' 
    }
})

function UserList(props) {
    const classes = useStyles();
    return (
        <List subheader={
            <ListSubheader className={classes.root}>
                <Typography className={classes.title} color="primary">{props.title}</Typography>
                <Typography className={classes.counter} color="primary">{props.list.length}</Typography>
            </ListSubheader>}
            dense={false}>
            {props.list}
        </List>
    )
};

export default UserList;