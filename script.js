const upload = document.getElementById('upload');
const canvas = document.getElementById('photoCanvas');
const ctx = canvas.getContext('2d');

upload.addEventListener('change', function(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            // અહીં પાસપોર્ટ સાઈઝનું લોજિક આવશે
            canvas.width = 300; // પાસપોર્ટ ફોટો વિડ્થ
            canvas.height = 400; // પાસપોર્ટ ફોટો હાઈટ
            ctx.drawImage(img, 0, 0, 300, 400);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
});
