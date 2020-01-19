import React, {useEffect, useState, Fragment} from "react";
import axios from "axios";
import {take} from "lodash";
import {CardHeader, makeStyles} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    root: {
        marginBottom: 10
    }
}));

export default function Blog() {

    const [blog, setBlog] = useState([]);

    useEffect(() => {
        axios.get('/api/blog').then(res => {
            setBlog(res.data);
        })
    }, []);

    const classes = useStyles();

    return <Fragment>
        <h2>Blog</h2>
        {take(blog, 10).map((b,idx) =>
            <Card className={classes.root} key={"blog_" + idx}>
                <CardHeader
                    title={b.title}
                />
                <CardContent>
                    <Typography>{b.body}</Typography>
                </CardContent>
            </Card>
        )}
    </Fragment>
}