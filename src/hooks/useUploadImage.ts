import { useState } from "react";
import firebaseApp from "../firebaseConfig";
import imageCompression from "browser-image-compression";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const useUploadImage = () => {
    const [isLoading, setIsLoading] = useState(false);

    const uploadImage = async (fileInput: File) => {
        setIsLoading(true);

        try {
            // Compress the image before uploading
            const compressedFile = await imageCompression(fileInput, {
                maxSizeMB: 1,
                maxWidthOrHeight: 1024,
                useWebWorker: true,
            });

            // Upload to Firebase Storage
            const storage = getStorage(firebaseApp);
            const storageRef = ref(storage, `images/${compressedFile.name}`);
            await uploadBytes(storageRef, compressedFile);

            // Get the download URL and update state
            const downloadURL = await getDownloadURL(storageRef);

            return downloadURL;

        } catch (error) {
            console.error('Error uploading image:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return { uploadImage, isLoading, setIsLoading };
};

export default useUploadImage;
