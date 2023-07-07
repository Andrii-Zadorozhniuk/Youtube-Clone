import "./SearchStyles.css"
import { useLocation, useNavigate } from "react-router-dom";
import { getSearchVideos } from "../../api/search";
import { useEffect } from "react";
import { useState } from "react";
import { useMediaQuery } from "@material-ui/core";
const Search = () => {
    const [isLoading, setIsLoading] = useState(true);

    const location = useLocation();
    const [videos, setVideos] = useState([])
    const getData = (query) => {
        getSearchVideos(query).then((data) => {
            setVideos(data.contents)
        }).finally(() => setIsLoading(false));
    }
    useEffect(() => { 
        getData(location.state.result) 
    }, [])
    if (isLoading == false) return (
        <div className="search-section"> 
        <div className="videos">
            {videos?.map((video) => {
                    if (video.type == "video") {
                    return (
                        <Video thumbnail={video?.video.thumbnails[0]?.url} 
                            channelPfp={video?.video.author?.avatar[0]?.url}
                            title={video?.video.title}
                            channel={video?.video.author?.title}
                            views={video?.video.stats.views}
                            date={video?.video.publishedTimeText}
                            length={video?.video.lengthSeconds}
                            live={video?.video.isLiveNow}
                            viewers={video?.video.stats.viewers}
                            id={video?.video.videoId}
                            channelId={video?.video.author.channelId}

                        />
                    )}
                })}</div>
        </div>
    )
    else return <div className="loading-section">
    <div class="loader"></div>
</div>;
}
const Video = (props) => {
    const navigate = useNavigate();
    const isDesktop = useMediaQuery('(min-width: 750px)');
    var date = new Date(null);
    date.setSeconds(props.length); 
    if (props.length >= 3600) {
    var time = date.toISOString().substr(11, 8);
    } else {
        var time = date.toISOString().substr(14, 5);
    }
    function kFormatter(num) {
        if (num <= 999999) {
        return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(0)) + ' thousands' : Math.sign(num)*Math.abs(num)
        } else {
            return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000000).toFixed(0)) + ' millions' : Math.sign(num)*Math.abs(num)
        }
    }
    return (
        <div className="video" >
            <div className="thumbnail" onClick={() => navigate("/videodetails", {state: {id: props.id}})} >
            <img src={props.thumbnail}/>
            {props.live === false ? <p>{time}</p> : <p>LIVE</p>}
            </div>
            {isDesktop ? 
                <div className="video-info">
                    <h3 onClick={() => navigate("/videodetails", {state: {id: props.id}})}>{props.title}</h3>
                    <div className="channel" onClick={() => navigate("/channeldetails", {state: {channelId: props.channelId}})}>
                    <img src={props.channelPfp} className="channel-pfp" />
                    <p >{props.channel}</p>
                    </div>
                    {props.live === false ? <p>{kFormatter(props.views)} views  &#x2022;  {props.date}</p> :
                    <p>LIVE &#x2022; {props.viewers} viewers</p> }
            </div> :
            <div className="video-info">
                      <img src={props.channelPfp} className="channel-pfp" />
                      <div className="video-text">
                          <h4 onClick={() => navigate("/videodetails", {state: {id: props.id}})}>{props.title}</h4>
                          <p onClick={() => navigate("/channeldetails", {state: {channelId: props.channelId}})}>{props.channel}</p>
                          {props.live === false ? <p>{kFormatter(props.views)} views  &#x2022;  {props.date}</p> :
                          <p>LIVE &#x2022; {props.viewers} viewers</p> }
                      </div>
            </div>}
        </div>
    )
}

export default Search;
