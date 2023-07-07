import "./SidebarStyles.css"
import {Link, useLocation} from 'react-router-dom'

import SubscriptionsOutlinedIcon from '@material-ui/icons/SubscriptionsOutlined';
import VideoLibraryOutlinedIcon from '@material-ui/icons/VideoLibraryOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';

import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import HomeIcon from '@material-ui/icons/Home';


import RestoreIcon from '@material-ui/icons/Restore';
import WatchLaterOutlinedIcon from '@material-ui/icons/WatchLaterOutlined';
import SlideshowOutlinedIcon from '@material-ui/icons/SlideshowOutlined';


import { Logo } from "../Header/Header";
import { useEffect } from "react";
const Sidebar = ({setOpenSidebar, openSidebar}) => {
    const location = useLocation();
    useEffect(() => {
        if(openSidebar) {
            document.body.style.overflowY = "hidden"
        } else {
            document.body.style.overflowY = "auto"
        }
    }, [openSidebar])
     return (
        <>

        <nav className={`close ${openSidebar} ${location.pathname === "/videodetails" && "video-details"}`}>
            <Link className="links-sidebar" to="/">
                {location.pathname == "/" ? <HomeIcon /> : <HomeOutlinedIcon />}
                Home</Link>
            <Link className="links-sidebar" to="/subscriptions">
            {location.pathname == "/subscriptions" ? <SubscriptionsIcon /> : <SubscriptionsOutlinedIcon />}
                Following</Link>
            <Link className="links-sidebar" to="/library">
            {location.pathname == "/library" ? <VideoLibraryIcon /> : <VideoLibraryOutlinedIcon />}
                Library</Link>

        </nav>
        <nav className={`open ${openSidebar}`}>
            <Logo setOpenSidebar={setOpenSidebar} openSidebar={openSidebar} />
            <Link className="links-sidebar" to="/" onClick={() => setOpenSidebar(false)}>
                {location.pathname == "/" ? <HomeIcon /> : <HomeOutlinedIcon />}
                Home</Link>
            <Link className="links-sidebar" to="/subscriptions" onClick={() => setOpenSidebar(false)}>
            {location.pathname == "/subscriptions" ? <SubscriptionsIcon /> : <SubscriptionsOutlinedIcon />}
                Following</Link>
            <Link className="links-sidebar" to="/library" onClick={() => setOpenSidebar(false)}>
            {location.pathname == "/library" ? <VideoLibraryIcon /> : <VideoLibraryOutlinedIcon />}
                Library</Link>
                <Link className={location.pathname == "/history" ? "links-sidebar active" : "links-sidebar"} to="/history" onClick={() => setOpenSidebar(false)}>
                    <RestoreIcon />History
                </Link>
                <Link className={location.pathname == "/watchlater" ? "links-sidebar active" : "links-sidebar"} to="/watchlater" onClick={() => setOpenSidebar(false)}>
                    <WatchLaterOutlinedIcon />Watch Later
                </Link>
                <Link className={location.pathname == "/myvideos" ? "links-sidebar active" : "links-sidebar"} to="/myvideos" onClick={() => setOpenSidebar(false)}>
                    <SlideshowOutlinedIcon />My Videos
                </Link>
        </nav>
        <div className={`sidebar-modal ${openSidebar}`} onClick={() => setOpenSidebar(false)}></div>

        </>
    )
}
export default Sidebar;