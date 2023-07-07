import "./ChannelDetailsStyles.css"
import { useLocation } from "react-router-dom";

import { getChannelDetails } from "../../api/channeldetails";
import { getChannelVideos } from "../../api/channelvideos";

import { useEffect, useState } from "react";
import { useMediaQuery } from "@material-ui/core";

import { Video } from "../Home/Home";

const ChannelDetails = () => {
    const [isLoading, setIsLoading] = useState(true);

    const [channelDetails, setChannelDetails] = useState(null);
    const [channelVideos, setChannelVideos] = useState([]);
    const isDesktop = useMediaQuery('(min-width: 600px)');
    const location = useLocation();
    useEffect(() => {
        getChannelDetails(location.state.channelId).then((data) => {
            console.log(data)
            setChannelDetails(data)
        })
        getChannelVideos(location.state.channelId).then((data) => {
            console.log(data)
            setChannelVideos(data.contents);
        }).finally(() => setIsLoading(false));
    }, [])
    if (isLoading == false) return (
        <div className="channel-section">
            <div className="banner">
            {isDesktop ?
            <img src={channelDetails?.banner?.desktop[1].url} /> :
            <img src={channelDetails?.banner?.desktop[0].url} />}
            </div>
            <div className="channel-details">
                <div className="channel-info">
                <img src={channelDetails?.avatar[2]?.url} />
                <div className="channel-text">
                <h1>{channelDetails?.title}</h1>
                <p><span>{channelDetails?.username}</span> {channelDetails?.stats.subscribersText} {channelDetails?.stats.videosText}</p>
                </div>
                </div>
                <button>Follow</button>
            </div>
            <div className="channel-videos">
            {channelVideos?.map((video) => {
                    if (video.type == "video") {
                    return (
                        <Video thumbnail={video?.video.thumbnails[2]?.url} 
                            channelPfp={video?.video.author?.avatar[0]?.url}
                            title={video?.video.title}
                            channel={video?.video.author?.title}
                            views={video?.video.stats.views}
                            date={video?.video.publishedTimeText}
                            length={video?.video.lengthSeconds}
                            live={video?.video.isLiveNow}
                            viewers={video?.video.stats.viewers}
                            id={video?.video.videoId}
                        />
                    )}
                })}
            </div>
        </div>
    ) 
    else return <div className="loading-section">
    <div class="loader"></div>
</div>;
}

export default ChannelDetails;