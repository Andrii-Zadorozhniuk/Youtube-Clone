import "./HomeStyles.css"
import { getHomeVideos } from "../../api/home";
import { getSearchVideos } from "../../api/search";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ScrollContainer from "react-indiana-drag-scroll";
const Home = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [videos, setVideos] = useState([]);
    const [query, setQuery] = useState("all");
    useEffect(() => {
        if (query == "all") {
        getHomeVideos().then((data) => { 
            setVideos(data.contents)
            console.log(data.contents)
        }).finally(() => {
            setIsLoading(false);
        })
     } else {
            getSearchVideos(query).then((data) => {
                setVideos(data.contents)
                console.log(data.contents)
            }).finally(() => {
                setIsLoading(false);
            })
        }
    }, [query])

    if (isLoading == false) return (
        <div className='home-section'>
            <ScrollContainer className="tabs" id="tabs"
            >
                <button className={query === 'all' && 'clicked'} onClick={() => setQuery("all")}>All</button>
                <button className={query === 'video games' && 'clicked'} onClick={() => setQuery("video games")}>Video Games</button>
                <button className={query === 'music' && 'clicked'} onClick={() => setQuery("music")}>Music</button>
                <button className={query === 'literature' && 'clicked'} onClick={() => setQuery("literature")}>Literature</button>
                <button className={query === 'fitness' && 'clicked'} onClick={() => setQuery("fitness")}>Fitness</button>                <button className={query === 'trending' && 'clicked'} onClick={() => setQuery("trending")}>Trending</button>
                <button className={query === 'mathematics' && 'clicked'} onClick={() => setQuery("mathematics")}>Mathematics</button>
                <button className={query === 'documentation' && 'clicked'} onClick={() => setQuery("documentation")}>Documentation</button>
                <button className={query === 'cartoons' && 'clicked'} onClick={() => setQuery("cartoons")}>Cartoons</button>
                <button className={query === 'film discussion' && 'clicked'} onClick={() => setQuery("films discussion")}>Films Discussion</button>
                <button className={query === 'actors' && 'clicked'} onClick={() => setQuery("actors")}>Actors</button>
            </ScrollContainer>
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
                })}
            </div>
        </div>
    )
    else return <div className="loading-section">
        <div class="loader"></div>
    </div>
}
export const Video = (props) => {
    const navigate = useNavigate();
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
        <div className="video">
            <div className="thumbnail" onClick={() => navigate("/videodetails", {state: {id: props.id}})}>
            <img src={props.thumbnail}/>
            {props.live === false ? <p>{time}</p> : <p>LIVE</p>}
            </div>
            <div className="video-info" >
                <img src={props.channelPfp} className="channel-pfp"
                onClick={() => navigate("/channeldetails", {state: {channelId: props.channelId}})} />
                <div className="video-text">
                    <h4 onClick={() => navigate("/videodetails", {state: {id: props.id}})}>{props.title}</h4>
                    <p onClick={() => navigate("/channeldetails", {state: {channelId: props.channelId}})}>{props.channel}</p>
                    {props.live === false ? <p>{kFormatter(props.views)} views  &#x2022;  {props.date}</p> :
                    <p>LIVE &#x2022; {props.viewers} viewers</p> }
                </div>
            </div>
        </div>
    )
}
export default Home;