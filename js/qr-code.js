window.addEventListener('load', function(){
	var qrcode = new QRCode("qrcode_img", {
        text: "https://github.com/Uzcoin404",
        width: 400,
        height: 400,
        colorDark : "#000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.M
    });

});

function makeCode(content, color, level) {
    var qrcode = new QRCode("qrcode_img", {
        text: content,
        width: 400,
        height: 400,
        colorDark : color,
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.L
    });
}

const qrSubmit = document.querySelector(".qr_submit"),
codeName = document.querySelector(".code_name"),
codeColor = document.querySelector(".code_color"),
codeLevel = document.querySelector(".code_level"),
menuBtn = document.querySelector(".menu_btn"),
nav = document.querySelector(".nav"),
inputs = document.querySelectorAll(".details .input");

menuBtn.addEventListener('click', function() {
	nav.classList.toggle('active');
});

qrSubmit.addEventListener('click', function(){
	getValues();
});
for (let i = 0; i < inputs.length; i++) {
	inputs[i].addEventListener('change', function(){
		getValues();
	});
}

function getValues() {
	let qrcodeImg = document.querySelectorAll(".qrcode_img img");
	let name = '';
	let color = '';
	let level = '';
	codeName.value.length > 0 ? name = codeName.value : name = 'https://github.com/Uzcoin404';
	codeColor.value.length > 0 ? color = codeColor.value : color = '#091353';
	if (codeLevel.value == 0) {
		level = 'L'
	} else if (codeLevel.value == 1) {
		level = 'M';
	} else if (codeLevel.value == 2) {
		level = 'H';
	}
	qrcodeImg.forEach(img => {
		img.remove();
	});
	makeCode(name, color, level);
	qrDownload();
}
function qrDownload() {
	setTimeout(() => {
		let dataUrl = document.querySelector('#qrcode_img').querySelector('img').src;
		var link = document.createElement("a");
		link.download = "qrcode.png";
		link.href = dataUrl;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		delete link;
	}, 1000);
}

const rippleAnimation = document.querySelectorAll(".btn");
rippleAnimation.forEach((button) => {
	button.addEventListener("click", function (e) {
		const x = e.clientX;
		const y = e.clientY;
		let btnY = 0;
		
		const buttonTop = e.target.offsetTop;
		const buttonLeft = e.target.offsetLeft;
		
		const xInside = x - buttonLeft;
		const yInside = y - buttonTop;
		
		const btnCircle = document.createElement("span");
		
		btnCircle.classList.add("btn-circle");
		btnCircle.style.top = yInside + btnY + "px";
		btnCircle.style.left = xInside + "px";
		!this.classList.contains('nav_btn') ? btnCircle.style.top = '20px' : '';

		this.appendChild(btnCircle);
		setTimeout(() => btnCircle.remove(), 50000);
	});
});
