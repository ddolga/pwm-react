import React, {useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";


function getCurrentTab({pathname}) {
    if (pathname.includes("blog"))
        return 0;
    else if (pathname.includes("gallery")) {
        return 1;
    }

    return 0;
}

export default function BarTab() {

    const history = useHistory();
    const currentLocation = useLocation();


    const [tabIndex, setTabIndex] = useState(0);

    const v = getCurrentTab(currentLocation);
    if (tabIndex !== v) {
        setTabIndex(v);
    }

    function handleTabChange(e, newValue) {
        setTabIndex(newValue);
        switch (newValue) {
            case 0:
                history.push("/blog");
                break;
            case 1:
                history.push("/gallery/5e083010403f901df1ad9dd3");
                break;
            default:
                history.push("/");
        }
    }

    return <Tabs value={tabIndex} onChange={handleTabChange}>
        <Tab label="Blog"/>
        <Tab label="Gallery"/>
    </Tabs>
}