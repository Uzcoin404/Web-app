const recordBtn = document.querySelector('.record_btn');
const outputAudio = document.querySelector('.output_audio');
const voiceRecord = document.querySelector('.voice_record');
let isClick = false;

recordBtn.addEventListener('mousedown', function(){
    isClick = true;
    voiceRecord.classList.add('active');
    recordVoice();
});
recordBtn.addEventListener('touchstart', function(){
    isClick = true;
    voiceRecord.classList.add('active');
    recordVoice();
});



function recordVoice() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();
            let audioChunks = [];

            mediaRecorder.addEventListener("dataavailable", event => {
                audioChunks.push(event.data);
            });
            mediaRecorder.addEventListener("stop", () => {
                const blob = new Blob(audioChunks, { 'type': 'audio/mp3;' });
                audioChunks = [];
                const audioURL = window.URL.createObjectURL(blob);
                outputAudio.src = audioURL;
            });

            recordBtn.addEventListener('mouseup', function(){
                isClick = false;
                outputAudio.classList.add('active');
                if (!isClick) {   
                    setTimeout(() => {
                        mediaRecorder.stop();
                        outputAudio.classList.remove('active');
                    }, 500);
                }
                voiceRecord.classList.remove('active');
            });
            recordBtn.addEventListener('touchend', function(){
                isClick = false;
                outputAudio.classList.add('active');
                if (!isClick) {   
                    setTimeout(() => {
                        mediaRecorder.stop();
                        outputAudio.classList.remove('active');
                    }, 500);
                }
                voiceRecord.classList.remove('active');
            });
        });
    } else {
        console.log('getUserMedia not supported on your browser!');
    }
}