import { TextInput, Button, Alert } from "flowbite-react";
import { useSelector } from "react-redux";
import { useState, useRef,useEffect } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [ imageFileUploadProgress, setImageFileUploadProgress ] = useState(null);
  const [ imageFileError, setImageFileError ] = useState(null);
  console.log(imageFileUploadProgress,imageFileError);
  const fileRef = useRef();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if the file size is greater than 2MB (2 * 1024 * 1024 bytes)
      if (file.size > 2097152) {
        setImageFileError("File size should not exceed 2MB.");
        return; // Stop the function if the file is too large
      }
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
      setImageFileError(null); // Reset error message in case of valid file size
    }
  };
  

  useEffect(() => {
    if (imageFile){
      uploadImage();
    }
  },[imageFile]);

  const uploadImage = async () => {
    // Reset or clear previous error messages
    setImageFileError(null);
  
    const storage = getStorage(app);
    const fileName = `${new Date().getTime()}${imageFile.name}`;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
  
    uploadTask.on('state_changed', 
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      }, 
      (error) => {
        // Handle unsuccessful uploads here
        setImageFileError("Could not upload image. Please try again.");
      }, 
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setImageFileUploadProgress(null); // Reset progress on successful upload
        });
      }
    );
  };
  
  
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-4xl">Profile</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={fileRef}
        hidden
      ></input>
      <form className="flex flex-col gap-4">
        <div
          className="w-32 h-32 self-center cursor-pointer shadow-md rounded-full overflow-hidden"
          onClick={() => fileRef.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
                          value={imageFileUploadProgress || 0}
                          text={`${imageFileUploadProgress}%`}
                          styles={{
                            root: {
                              width: "100%",
                              height: "100%",
                            },
                            path: {
                              stroke: "#fff",
                              strokeWidth: 4,
                              transition: "stroke-dasharray 0.6s ease, stroke-dashoffset 0.6s ease",
                            },
                            trail: {
                              stroke: "#fff",
                              strokeWidth: 1,
                              transition: "stroke-dasharray 0.6s ease, stroke-dashoffset 0.6s ease",
                            },
                          }}
                        />
                      )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="User Profile Picture"
            className="rounded-full w-full h-full border-8 object-cover border-[lightgray]"
          ></img>
        </div>

        {imageFileError && <Alert className="mt-5" color="failure">{imageFileError}</Alert>}

        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
        />

        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
        />

        <TextInput type="password" id="password" placeholder="Password" />

        <Button type="submit" gradientDuoTone="tealToLime" outline>
          Update
        </Button>
      </form>

      <div className=" text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}
