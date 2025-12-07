const video = document.getElementById('video');
const screenVideo = document.getElementById('screenVideo');
const cameraBtn = document.getElementById('cameraBtn');
const micBtn = document.getElementById('micBtn');
const screenBtn = document.getElementById('screenBtn');

let stream;
let micEnabled = true;
let screenStream;

// Get camera and mic
async function startMedia() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    video.srcObject = stream;
  } catch (err) {
    alert("Error accessing camera or microphone: " + err);
  }
}

// Toggle camera
cameraBtn.addEventListener('click', () => {
  if(!stream) return;
  const videoTrack = stream.getVideoTracks()[0];
  videoTrack.enabled = !videoTrack.enabled;
  cameraBtn.textContent = videoTrack.enabled ? "Stop Camera" : "Start Camera";
});

// Toggle mic
micBtn.addEventListener('click', () => {
  if(!stream) return;
  const audioTrack = stream.getAudioTracks()[0];
  micEnabled = !micEnabled;
  audioTrack.enabled = micEnabled;
  micBtn.textContent = micEnabled ? "Mute Mic" : "Unmute Mic";
});

// Toggle screen sharing
screenBtn.addEventListener('click', async () => {
  if(!screenStream) {
    try {
      screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      screenVideo.srcObject = screenStream;
      screenBtn.textContent = "Stop Sharing";
      screenStream.getVideoTracks()[0].onended = () => {
        screenStream = null;
        screenVideo.srcObject = null;
        screenBtn.textContent = "Share Screen";
      };
    } catch (err) {
      alert("Error accessing screen: " + err);
    }
  } else {
    screenStream.getTracks().forEach(track => track.stop());
    screenStream = null;
    screenVideo.srcObject = null;
    screenBtn.textContent = "Share Screen";
  }
});

startMedia();
