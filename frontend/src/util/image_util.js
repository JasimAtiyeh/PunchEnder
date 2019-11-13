
export const onSelectFile = (e, setImage, upload, projectId) => {
  if (e.target.files && e.target.files.length > 0) {
    const reader = new FileReader();
    reader.onload = () => {
      cropImage(reader.result, 16/9)
        .then(canvas => { 
          // const image = canvas.toDataURL('image/jpeg', 1.0);
          canvas.toBlob(blob => {
            upload({ variables: { _id: projectId, image: blob } })
              .then(res => setImage(res.data.uploadProjectImage.image));
          }, 'image/jpeg', 1);
        })
    };
    return reader.readAsDataURL(e.target.files[0]);
  }
};

export const cropImage = (url, aspectRatio) => {
  return new Promise(resolve => {

    const inputImage = new Image();
    inputImage.onload = () => {
      const inputWidth = inputImage.naturalWidth;
      const inputHeight = inputImage.naturalHeight;
      const inputImageAspectRatio = inputWidth / inputHeight;

      const dWidth = 512
      const dHeight = 288; // change these two for adjustment to resolution
      const dx = 0;
      const dy = 0;
      let sWidth
      let sHeight
      let sx;
      let sy;

      if (inputImageAspectRatio < aspectRatio) {
        sWidth = inputWidth;
        sHeight = sWidth * 9 / 16;
        sy = (inputHeight - sHeight) / 2;
        sx = 0;
      } else if (inputImageAspectRatio > aspectRatio) {
        sHeight = inputHeight;
        sWidth = sHeight * 16 / 9;
        sx = (inputWidth - sWidth) / 2;
        sy = 0;
      }

      const outputImage = document.createElement('canvas');
      outputImage.width = dWidth;
      outputImage.height = dHeight;
      const ctx = outputImage.getContext('2d');
      ctx.drawImage(inputImage, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
      resolve(outputImage);
    };

    inputImage.src = url;
  })
}