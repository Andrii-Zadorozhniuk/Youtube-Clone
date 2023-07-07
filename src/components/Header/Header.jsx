import youtubelogo from '../../pictures/youtube-logo.svg'
import  upload  from '../../pictures/upload.svg';
import notifications from "../../pictures/notifications.svg"
import "./HeaderStyles.css"
import SearchIcon from '@material-ui/icons/Search';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import Sidebar from '../Sidebar/Sidebar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useState, useEffect, useRef } from 'react';   
import { getAutocomplete } from '../../api/autocomplete';
import { Link, useNavigate } from 'react-router-dom';

import KeyboardReact from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
const Header = () => {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [openSearchBar, setOpenSearchBar] = useState(false);

    return (
        <>
        <header>
            <Logo setOpenSidebar={setOpenSidebar} openSidebar={openSidebar} />
        <Search cName="comp" />
        <div className='right-section'>
            <SearchIcon className='icon-mobile icon' onClick={() => setOpenSearchBar(true)}/>
            <KeyboardVoiceIcon className='voice-icon icon-mobile'  />
            <img src={upload} className='icon-mobile2 icon'/>
            <div className='notif icon'><img src={notifications} className='notif-icon' />
            <div className='notif-count'>9+</div> </div>
            <img className='avatar icon' src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png' />
        </div>
        </header>
        <Sidebar setOpenSidebar={setOpenSidebar} openSidebar={openSidebar}/>
        {openSearchBar && 
        <div className='mobile-search'>
            <ArrowBackIcon onClick={() => setOpenSearchBar(false)} className='icon' />
            <Search cName="mobile"/>
        </div>
        }

        </>
    )
}

export const Logo = ({setOpenSidebar, openSidebar}) => {
    return (
        <div className='youtube-logo'>
        <div className='sidebar-menu' onClick={() => {
            setOpenSidebar(!openSidebar)
        }}>
        <MenuIcon className='sidebar-icon' /></div>
        <Link to='/'><img src={youtubelogo} /></Link>
        </div>
    )
}
const Search = (props) => {
    const navigate = useNavigate();
    const [autocomplete, setAutocomplete] = useState([])
    const [searchValue, setSearchValue] = useState("");
    const [openKeyboard, setOpenKeyboard] = useState(false);
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
      } = useSpeechRecognition();
    useEffect(() => {
        setSearchValue(transcript)
        {transcript != "" ?
        getAutocomplete(transcript).then((data) => setAutocomplete(data?.results)) :
        setAutocomplete([]);
        setSearchValue(transcript)
    }
      }, [transcript])
    const onSearch = (event) => {
        {event.target.value != "" ?
        getAutocomplete(event.target.value).then((data) => setAutocomplete(data?.results)) :
        setAutocomplete([]);
        setSearchValue(event.target.value)
    }
    }
    const search = () => {
        if (searchValue != "") {
        navigate("/search", {state: {result: searchValue}})
        setTimeout(() => setAutocomplete([]), 1000)
        window.location.reload(false);}
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            search();
        }
      }


    
 
    return (
<div className={`center-section ${props.cName}`}>
            <div className='input'>
                <input type='search' placeholder='Введите запрос' onKeyDown={handleKeyDown} value={searchValue}
                onChange={onSearch} onBlur={() => setTimeout(() => setAutocomplete([]), 1000)} />
                {autocomplete?.length > 0 && <div className='autocomplete-box' onClick={() => window.location.reload(false)}>
                    {autocomplete?.map((result) => {
                        return (
                            <Link to='/search' state={{result: result}} className='autocomplete-link'>
                                <SearchIcon />
                                {result}</Link>
                        )
                    })}
                </div>}
                <KeyboardIcon className='icon' onClick={() => setOpenKeyboard(!openKeyboard)}/>
            </div>
                <button onClick={search}><SearchIcon /></button>
                <KeyboardVoiceIcon className='voice-icon' onClick={
                    !listening ? SpeechRecognition.startListening :
                    SpeechRecognition.stopListening
                } />
                {openKeyboard &&
        <div className='virtual-keyboard-box'>
        <KeyboardReact onChange={(input) => {
        {input != "" ?
        getAutocomplete(input).then((data) => setAutocomplete(data?.results)) :
        setAutocomplete([]);
        setSearchValue(input)
    }
        }}/>
        </div>}
        </div>
    )
}

export default Header;