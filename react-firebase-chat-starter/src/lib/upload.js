import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebase";

const upload = async (file) =>{
    const timestamp = new Date().getTime();
    const storageRef = ref(storage, 'images/${timestamp} + {file.name}');

    const uploadTask = uploadBytesResumable(storageRef, file);

    return  new Promise ((resolve,reject)=>{
    uploadTask.on("state_changed", 
    (snapshot) => {
        
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        
    }, 
    (error) => {
        reject("something wents wrong !!" + error.code)
    
    }, 
    () => {
        
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL)
        });
    },
);
    });


};

export default upload