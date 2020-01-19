import React, {Fragment, useState, useEffect} from 'react';
import './App.css';
import Blog from "./views/Blog";
import {Container, makeStyles} from "@material-ui/core"
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Album from "./views/Album";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import BarTab from "./components/BarTab";
import SingleView from "./views/SingleView";


function TabPanel(props) {
    const {index, value, children} = props;

    return <Box hidden={index !== value}>{children}</Box>
}

const useStyles = makeStyles(theme => ({
    offset: theme.mixins.toolbar
}));


function App() {

    const classes = useStyles();

    return <Fragment>

        <Router>
            <AppBar>
                <BarTab/>
            </AppBar>
            <div className={classes.offset}/>
            <Container>
                <Switch>
                    <Route path="/blog">
                        <Blog/>
                    </Route>
                    <Route path="/gallery/:id">
                        <Album/>
                    </Route>
                    <Route path="/view/:id/:parentId">
                        <SingleView/>
                    </Route>
                    <Route path="/">
                        <Blog/>
                    </Route>
                </Switch>
            </Container>
        </Router>
    </Fragment>
}

export default App;
