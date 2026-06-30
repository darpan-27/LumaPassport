const upload = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const downloadBtn = document.getElementById('downloadBtn');

// Set target Passport size (Standard 2x2 inches at 300 DPI)
const TARGET_SIZE = 600; 

upload.addEventListener('change', (e) => {
    const reader = new FileReader();
    reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
            canvas.width = TARGET_SIZE;
            canvas.height = TARGET_SIZE;
            
            // Draw white background
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Center and scale image
            const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
            const x = (canvas.width / 2) - (img.width / 2) * scale;
            const y = (canvas.height / 2) - (img.height / 2) * scale;
            
            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
});

downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'luma-passport-photo.jpg';
    link.href = canvas.toDataURL('image/jpeg', 1.0);
    link.click();
});
