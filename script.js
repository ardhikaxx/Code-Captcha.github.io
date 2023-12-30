document.addEventListener("DOMContentLoaded", function () {
    var canvas = document.getElementById("captchaCanvas");
    var ctx = canvas.getContext("2d");

    function generateRandomString(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;

        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }

    function drawCaptcha() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = '#000';
        for (var i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.moveTo(0, Math.random() * 50);
            ctx.lineTo(canvas.width, Math.random() * 50);
            ctx.stroke();
        }

        for (var i = 0; i < 1000; i++) {
            ctx.beginPath();
            ctx.arc(Math.random() * canvas.width, Math.random() * 50, 1, 0, 2 * Math.PI);
            ctx.fillStyle = '#434343';
            ctx.fill();
        }

        var captchaCode = generateRandomString(4);
        ctx.font = 'bold 45px Poppins';
        ctx.fillStyle = '#000';
        ctx.fillText(captchaCode, 35, 35);

        window.captchaCode = captchaCode;
    }

    drawCaptcha();

    window.validateCaptcha = function () {
        var userInput = document.getElementById("captcha_code").value.toLowerCase();

        if (userInput === window.captchaCode.toLowerCase()) {
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Captcha confirmation successfully!',
                showConfirmButton: false,
                timer: 1500
            });
            drawCaptcha();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Captcha confirmation failed!',
                showConfirmButton: false,
                timer: 1500
            });
        }
    };
});