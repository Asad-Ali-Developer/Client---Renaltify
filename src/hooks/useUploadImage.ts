import { useState } from "react";
import firebaseApp from "../firebaseConfig";
import imageCompression from "browser-image-compression";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const useUploadImage = () => {

    const [ImageURL, setImageURL] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    const uploadImage = async (fileInput: File) => {
        setIsLoading(true);

        try {
            const compressedFile = await imageCompression(fileInput, {
                maxSizeMB: 1,
                maxWidthOrHeight: 1024,
                useWebWorker: true,
            });

            const storage = getStorage(firebaseApp);
            const storageRef = ref(storage, `images/${compressedFile.name}`);
            await uploadBytes(storageRef, compressedFile);
            const downloadURL = await getDownloadURL(storageRef);

            setImageURL(downloadURL);

            // console.log(downloadURL);

        } catch (error) {
            console.error('Error uploading image:', error);
        } finally {
            setIsLoading(false);
        }
    }

    return { uploadImage, ImageURL, isLoading, setIsLoading }

}

export default useUploadImage;
