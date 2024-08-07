import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  initSocketConnection,
  joinRoom,
  getCameras,
  getMedia,
  makeConnection,
  myStream,
  leaveCall,
} from "@/util/socket";
import styled from "styled-components";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import MicNoneIcon from "@mui/icons-material/MicNone";
import MicOffIcon from "@mui/icons-material/MicOff";
import CallEndIcon from "@mui/icons-material/CallEnd";
import Button from "../elements/Button";
import "./WebRTC.css";

let roomId;

const WebRTC = () => {
  const [muted, setMuted] = useState(true);
  const [cameraOff, setCameraOff] = useState(true);
  const [cameras, setCameras] = useState([]);
  const navigate = useNavigate();
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const handleMuteClick = () => {
    const enabled = !muted;
    myStream.getAudioTracks()[0].enabled = enabled;
    setMuted(enabled);
    console.log("음소거!!");
  };

  const handleCameraClick = () => {
    const enabled = !cameraOff;
    myStream.getVideoTracks()[0].enabled = enabled;
    setCameraOff(enabled);
  };

  useEffect(() => {
    initSocketConnection();
    getCameras().then(setCameras);
    initCall();
    // 방 생성
    roomId = Math.floor(Math.random() * 100000); // 랜덤 방 번호 생성
    roomId = 1; // 랜덤 방 번호 생성
    joinRoom(roomId);
    
    window.addEventListener("addStream", (event) => {
      remoteVideoRef.current.srcObject = event.detail.stream;
    });

    return () => {
      leaveCall();
    };
  }, []);

  const initCall = async () => {
    const stream = await getMedia();
    localVideoRef.current.srcObject = stream;
    makeConnection();
  };

  const onClickCallEnd = () => {
    leaveCall();
    navigate("/");
  };

  return (
    <VideoContainer>
      <div className="remote-position">
        <Video ref={remoteVideoRef} autoPlay playsInline />
        <div className="local-position">
          <LocalVideo ref={localVideoRef} muted autoPlay playsInline />
        </div>
      </div>
      <div className="control-panel">
        <div className="rtc-btn">
          <Button
            _onClick={handleCameraClick}
            $bg={{
              default: "var(--white-color-100)",
              hover: "var(--bg-baige-color)",
            }}
            $width="70px"
            $height="70px"
            $radius="40px"
            $border="none"
          >
            {cameraOff ? <VideocamIcon style={{ fontSize: "36px" }} /> : <VideocamOffIcon style={{ fontSize: "36px" }} />}
          </Button>
        </div>
        <div className="rtc-btn">
          <Button
            _onClick={onClickCallEnd}
            $bg={{
              default: "var(--button-red-color)",
              hover: "var(--bg-baige-color)",
            }}
            $width="70px"
            $height="70px"
            $radius="40px"
          >
            <CallEndIcon style={{ fontSize: "36px" }} />
          </Button>
        </div>
        <div className="rtc-btn">
          <Button
            _onClick={handleMuteClick}
            $bg={{
              default: "var(--white-color-100)",
              hover: "var(--bg-baige-color)",
            }}
            $width="70px"
            $height="70px"
            $radius="40px"
            $border="none"
          >
            {muted ? <MicNoneIcon style={{ fontSize: "36px" }} /> : <MicOffIcon style={{ fontSize: "36px" }} />}
          </Button>
        </div>
      </div>
    </VideoContainer>
  );
};

const VideoContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  background-color: white;
`;

const LocalVideo = styled.video`
  width: 350px;
  height: 300px;
  z-index: 4;
`;

const ControlPanel = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
`;

export default WebRTC;
