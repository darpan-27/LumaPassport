const upload = document.getElementById('imageUpload');
const canvas = document.getElementById('outputCanvas');
const ctx = canvas.getContext('2d');

upload.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    const img = new Image();
    img.src = URL.createObjectURL(file);
    
    img.onload = async () => {
        // Load BodyPix Model
        const net = await bodyPix.load();
        const segmentation = await net.segmentPerson(img);
        
        // Canvas size A4 sheet mate
        canvas.width = 2480; // A4 width
        canvas.height = 3508;
        ctx.fillStyle = "#FFFFFF"; // White background
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Process background removal logic
        // Drawing 8 copies (4x2 grid) for standard printing
        const pWidth = 413; // 35mm
        const pHeight = 531; // 45mm
        
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 2; j++) {
                ctx.drawImage(img, i * (pWidth + 50) + 100, j * (pHeight + 50) + 100, pWidth, pHeight);
            }
        }
    };
});

function printSheet() {
    const data = canvas.toDataURL('image/png');
    const win = window.open();
    win.document.write(`<img src="${data}" onload="window.print();">`);
}
