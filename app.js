const upload = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

upload.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    const img = await createImageBitmap(file);
    
    // Canvas set passport size (35mm x 45mm)
    canvas.width = 350; 
    canvas.height = 450;
    
    // 1. Background Change (White)
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw Image
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
    // Note: Actual AI background removal needs specialized API 
    // like Remove.bg API or BodyPix library.
});

function downloadSheet() {
    const link = document.createElement('a');
    link.download = 'passport_sheet.png';
    link.href = canvas.toDataURL();
    link.click();
}
