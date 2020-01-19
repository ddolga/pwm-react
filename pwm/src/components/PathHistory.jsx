import React, {useState} from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import {take, last} from "lodash";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";


export default function PathHistory(props) {

    const {name, path} = props;

    function orderPath(path) {

        if (!path || path.length === 0) {
            return [];
        }

        const root = path.find(p => p.parentId === null);
        const pathArr = [root];

        function travesty(parent, arr) {
            const child = path.find(p => p.parentId === parent._id);
            if (child !== undefined && child.g_title !== name) {
                arr.push(child);
                travesty(child, arr);
            }
        }

        travesty(root, pathArr);

        return pathArr;
    }

    const sortedPath = orderPath(path);

    return <Breadcrumbs>
        {
            sortedPath.map((seg, idx) =>
                <Link key={"path_" + idx}>{seg.g_title}</Link>)
        }
        <Typography>{name}</Typography>
    </Breadcrumbs>

}