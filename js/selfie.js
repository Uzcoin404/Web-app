const video = document.querySelector('.camera video'),
selfie = document.querySelector('.selfie'),
canvas = document.querySelector('.image canvas'),
photo = document.querySelector('.image .photo'),
selfieDown = document.querySelector('.selfie_down'),
closeBtn = document.querySelector('.close_btn'),
image = document.querySelector('.image'),
controlSound = document.querySelector('.control_sound'),
startbutton = document.querySelector('.take_photo');

let width = 1920;
let height = 1080;
let sound = false;
function startup() {
    var streaming = false;
    navigator.mediaDevices.getUserMedia({ video: true, audio: sound })
    .then(function(stream) {
        video.srcObject = stream;
        video.play();
    })
    .catch(function(err) {
        console.log("An error occurred: " + err);
    });

    video.addEventListener('canplay', function(ev){
        if (!streaming) {
            height = video.videoHeight / (video.videoWidth/width);

            canvas.setAttribute('width', width);
            canvas.setAttribute('height', height);
            streaming = true;
        }
    }, false);

    startbutton.addEventListener('click', function(ev){
        takepicture();
        ev.preventDefault();
        image.style.display = 'block';
    }, false);
    clearPhoto();
}

function clearPhoto() {
    var context = canvas.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
}

function takepicture() {
    var context = canvas.getContext('2d');
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);
    
      var data = canvas.toDataURL('image/png');
      photo.setAttribute('src', data);
      selfieDown.href = data;
    } else {
      clearPhoto();
    }
}
window.addEventListener('load', startup, false);

video.addEventListener("mousemove", e => {
    const timer = video.getAttribute("timer");
    if (timer) {
      clearTimeout(timer);
      video.setAttribute("timer", "");
    }
  
    const t = setTimeout(() => {
      video.setAttribute("timer", "");
      selfie.classList.add("active");
    }, screen.width > 576 ? 3500 : 5000);
    video.setAttribute("timer", t);
  
    selfie.classList.remove("active");
});

controlSound.addEventListener('click', function(){
    this.classList.toggle('active');
    if (this.classList.contains('active')) {
        sound = true;
        startup(true);
    } else {
        sound = false;
        startup(false);
    }
});
closeBtn.addEventListener('click', function(){
    clearPhoto();
    image.style.display = 'none';
});