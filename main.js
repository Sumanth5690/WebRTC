let localStream;
let remoteStream;

let init=async()=>{
    //getting acess to the streaming from the user 
localStream=await navigator.mediaDevices.getUserMedia({video:true,audio:false})
document.getElementById('user-1').srcObject=localStream
}

init()