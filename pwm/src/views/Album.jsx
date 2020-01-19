import React, {useEffect, useState, Fragment} from "react";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Link from "@material-ui/core/Link";
import {useHistory, useParams} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core";
import PathHistory from "../components/PathHistory";

const useStyles = makeStyles(theme => ({
    tile: {
        margin: 5,
        width: 200,
        height: 200,
    }
}));

export default function Album() {

    const history = useHistory();
    const {id} = useParams();

    const [album, setAlbum] = useState({g_title: "unknown", g_description: "unknown"});

    useEffect(() => {
        id && axios.get(`/api/album/${id}`).then(({data}) => {
                setAlbum(data);
            }
        );
    }, [id]);

    const handleLink = (childId) => (e) => {
        history.push(`/gallery/${childId}`);
    };

    const handlePhotoLink = (photoId) => (e) => {
        history.push(`/view/${photoId}/${id}`)
    };

    const onGoBack = () => {
        history.goBack();
    };

    const classes = useStyles();
    const {g_title, g_description, childAlbums, photos, path} = album;

    return <Fragment>
        <PathHistory name={g_title} path={path || []}/>
        <Typography>{g_title}</Typography>
        <Typography>{g_description}</Typography>
        <Typography><Link onClick={onGoBack}>Go Back</Link></Typography>

        <Grid container>
            {
                childAlbums && childAlbums.map((child, idx) =>
                    <Grid item key={"album_" + idx}>
                        <Card className={classes.tile}>
                            <CardContent>
                                <Typography><Link
                                    onClick={handleLink(child._id)}>{child.g_title || 'No Title'} </Link></Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                )
            }
        </Grid>

        <Grid container>
            {
                photos && photos.map((photo, idx) =>
                    <Grid item key={"photo_" + idx}>
                        <Card className={classes.tile}>
                            <CardContent>
                                <Typography><Link
                                    onClick={handlePhotoLink(photo._id)}>
                                    {photo.pathComponent || 'Unknown Path'}
                                </Link></Typography>
                            </CardContent>
                        </Card>
                    </Grid>)
            }
        </Grid>
    </Fragment>
}