import { useLocation } from "react-router-dom";
import { useLayoutEffect, useState } from "react";

import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';

import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';

import ReplyOutlinedIcon from '@material-ui/icons/ReplyOutlined';

import "./VideoDetailsStyles.css"
import { getVideoDetails } from "../../api/videodetails";
import { getRelatedVideos } from "../../api/relatedVideos";
import { getComments } from "../../api/comments";
import { useMediaQuery } from "@material-ui/core";
import { useNavigate } from "react-router-dom";


const VideoDetails = () => {
    const [isLoading, setIsLoading] = useState(true);

    const [video, setVideo] = useState([]);
    const [relatedVideos, setRelatedVideos] = useState([]);
    const [comments, setComments] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    useLayoutEffect(() => {
        getVideoDetails(location.state.id).then((data) => {
            setVideo(data)
            console.log(data)
        })
        getRelatedVideos(location.state.id).then((data) => {
            setRelatedVideos(data.contents.slice(0, 10))
            console.log(data)
        })
        getComments(location.state.id).then((data) => {
            setComments(data.comments.slice(0, 6))
            console.log(data)
        }).finally(() => setIsLoading(false));
    }, [])
    function kFormatter(num) {
        if (num <= 999999) {
        return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(0)) + ' thousands' : Math.sign(num)*Math.abs(num)
        } else {
            return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000000).toFixed(0)) + ' million' : Math.sign(num)*Math.abs(num)
        }
    }
    const [clickedLike, setClickedLike] = useState(false);
    const [clickedDislike, setClickedDislike] = useState(false);
    const [showMore, setShowMore] = useState(false);

    if (isLoading == false) return (
        <div className="videodetails-section">
            <div className="video">
            <iframe className="youtube-video" src= {`https://www.youtube.com/embed/${location.state.id}?autoplay=1`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            <div className="youtube-video-info">
            <h3>{video?.title}</h3>
            <div className="info">
                <div className="channel" onClick={() => navigate("/channeldetails", {state: {channelId: video?.author?.channelId}})}>
                <img src={video?.author?.avatar[0]?.url} />
                <p>{video?.author?.title}</p></div>
                <button className="follow">Follow</button>
                <div className="likes">
                    <button onClick={() => {
                        if (clickedLike == false) {
                        setClickedLike(true)} else {
                            setClickedLike(false)
                        }
                        setClickedDislike(false)
                    } }>
                        {clickedLike === true ? <ThumbUpAltIcon /> : <ThumbUpAltOutlinedIcon /> }
                        {kFormatter(video?.stats?.likes)}
                        </button>
                    <button onClick={() => {
                        if(clickedDislike == false) {
                            setClickedDislike(true)
                        } else {
                            setClickedDislike(false)
                        }
                  
                        setClickedLike(false)
                    }}
                    >
                        {clickedDislike === true ? <ThumbDownAltIcon /> : <ThumbDownAltOutlinedIcon />}
                        </button>
                </div>
                <button className="share"><ReplyOutlinedIcon /> Share</button>
            </div>
            <div className="desc-box">
                <span>{video?.isLiveContent === false ? kFormatter(video?.stats?.views) : kFormatter(video?.stats?.viewers)} views &#x2022; {video?.publishedDate}</span>
                <p>{showMore === true ? video?.description : video?.description?.substring(0, 250) + " ..." }</p>
                <button onClick={() => setShowMore(!showMore)}>{showMore ? " Less" : " More"}</button>
            </div>
            <div className="comments">
                <p className="comments-num">{kFormatter(video?.stats?.comments)} comments</p>
                {comments?.map((comment) => {
                    return (
                        <Comment 
                            avatar={comment?.author.avatar[0].url}
                            author={comment?.author.title}
                            time={comment?.publishedTimeText}
                            content={comment?.content}
                        />
                    )
                })}
            </div>
            </div></div>
            <div className="related-videos">
            {relatedVideos?.map((video) => {
                    if (video.type == "video") {
                    return (
                        <Video thumbnail={video?.video.thumbnails[1]?.url} 
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
const Video = (props) => {
    const navigate = useNavigate();
    const isDesktop = useMediaQuery('(min-width: 600px)');
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
            return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000000).toFixed(0)) + ' million' : Math.sign(num)*Math.abs(num)
        }
    }
    return (
        <div className="video" onClick={() => {
            navigate("/videodetails", {state: {id: props.id}})
            window.location.reload(true)
            }}>
            <div className="thumbnail">
            <img src={props.thumbnail}/>
            {props.live === false ? <p>{time}</p> : <p>LIVE</p>}
            </div>
            {isDesktop ? 
                <div className="video-info">
                    <h4>{props.title.length >= 40 ? props.title.substring(0, 40) + " ..." : props.title}</h4>
                    <div className="channel">
                    <p>{props.channel.substring(0, 30) }</p>
                    </div>
                    {props.live === false ? <p>{kFormatter(props.views)} views  &#x2022;  {props.date}</p> :
                    <p>LIVE &#x2022; {props.viewers} viewers</p> }
            </div> :
            <div className="video-info">
                      <img src={props.channelPfp} className="channel-pfp" />
                      <div className="video-text">
                      <h4>{props.title.length >= 50 ? props.title.substring(0, 40) + " ..." : props.title}</h4>
                          <p>{props.channel}</p>
                          {props.live === false ? <p>{kFormatter(props.views)} views  &#x2022;  {props.date}</p> :
                          <p>LIVE &#x2022; {props.viewers} viewers</p> }
                      </div>
            </div>}

        </div>
    )
}
const Comment = (props) => {
    const [showText, setShowText] = useState(true);
    return (
        <div  className="comment">
            <img src={props.avatar} />
            <div className="comment-info">
                <span>{props.author} &#x2022; {props.time}</span>
                {props.content.length > 220 ? <p>{showText ? props.content.substring(0, 220) + "... ": props.content} <button onClick={() => setShowText(!showText)}>{showText ? "More" : "Less"}</button></p> :
                <p>{props.content}</p>}
            </div>
        </div>
    )
}

export default VideoDetails;