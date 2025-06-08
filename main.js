let APP_ID="6ed42a69b217408893165dfadd853878";

let token=null;
let uid=String(Math.floor(Math.random()*10000))

let client
let channel


let localStream;
let remoteStream;
let peerConnection;

const servers={
    iceServers:[
        {
            urls:['stun:stun1.l.google.com.19302','stun:stun2.l.google.com.19302']
        }
    ]
}

let init=async()=>{
    //getting acess to the streaming from the user 
localStream=await navigator.mediaDevices.getUserMedia({video:true,audio:false})
document.getElementById('user-1').srcObject=localStream
createOffer()
}


//creating offer to another video
let createOffer = async () => {
    peerConnection = new RTCPeerConnection(servers);

    remoteStream = new MediaStream();
    document.getElementById('user-2').srcObject = remoteStream;

    localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
    });

    peerConnection.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack(track);
        });
    };

    peerConnection.onicecandidate = async (event) => {
        if (event.candidate) {
            console.log('New ice candidate', event.candidate);
        }
    };

    let offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    console.log('offer:', offer);
};

init()