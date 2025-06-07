let localStream;
let remoteStream;
let peerConnection;

let init=async()=>{
    //getting acess to the streaming from the user 
localStream=await navigator.mediaDevices.getUserMedia({video:true,audio:false})
document.getElementById('user-1').srcObject=localStream
createOffer()
}


//creating offer to another video
let createOffer=async()=>{
peerConnection=new RTCPeerConnection()

remoteStream=new MediaStream()
document.getElementById('user-2').srcObject=remoteStream

let offer=await peerConnection.createOffer()
await peerConnection.setLocalDescription(offer)
console.log('offer:',offer)
}

init()