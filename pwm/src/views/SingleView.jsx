import React, {useEffect, useState} from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import {useParams} from "react-router-dom";
import axios from "axios";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import PathHistory from "../components/PathHistory";

export default function SingleView() {

    const {id,parentId} = useParams();

    const [photo, setPhoto] = useState({g_title: "No Title"});

    useEffect(() => {
        axios.get(`/api/album/photo/${id}/${parentId}`).then(({data}) => {
            setPhoto(data);
        });

    }, [id]);

    const {g_title, pathComponent, path} = photo;

    return <Card>
        <PathHistory name={g_title || pathComponent} path={path}/>
        <CardHeader title={g_title || "No Title"}/>
        <CardContent>
            <Typography>{pathComponent}</Typography>
        </CardContent>
    </Card>
}