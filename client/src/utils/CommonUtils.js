class CommonUtils {

    //convert row size
    static getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = error => reject(error)
        })
    }
    //convert low qualyti to save batabase (range 0.8MB~1MB, do not exceed for file 10mb)
    static getBase64Low(file) {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (event) {
                let img = new Image();
                img.src = event.target.result;
                img.onload = function () {
                    let canvas = document.createElement("canvas");
                    let ctx = canvas.getContext("2d");
                    let width = img.width;
                    let height = img.height;
                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);
                    let quality = 1.0;
                    let sizeApply = 1 * 1024 * 1024; // 1MB
                    let size = file.size;
                    if (size > sizeApply) {
                        if (size > 10 * 1024 * 1024) { // 10MB
                            reject("Image size is too big");
                        } else if (size > 5 * 1024 * 1024) { // 5MB
                            quality = 0.3;
                        } else if (size > 3 * 1024 * 1024) { // 3MB
                            quality = 0.5;
                        } else if (size > 1 * 1024 * 1024) { // 1MB
                            quality = 0.7;
                        }
                        let compressedDataUrl = canvas.toDataURL(file.type, quality);
                        resolve(compressedDataUrl); // return string base64 compressed
                    } else {
                        resolve(event.target.result); // return string base64 uncompressed
                    }
                };
            };
            reader.onerror = function (error) {
                reject(error);
            }
        });
    }
}

export default CommonUtils;