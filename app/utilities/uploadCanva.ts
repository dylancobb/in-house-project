


export default function uploadCanva(imageUrl: string): Promise<string> {

    
    // Define the image URL you want to upload
    
    
    // Cloudinary upload URL
    const cloudinaryUploadURL: string =
    "https://api.cloudinary.com/v1_1/theartofstarkness/upload";
    

    // DO WE NEED TO STORE THIS INTO ENV FILE?
    // Specify your Cloudinary upload preset
    const uploadPreset: string = "r5a22ziq"; // Replace with your actual upload preset

// Specify the folder where you want to store the image
const folderName: string = "testImages"; // Replace with the desired folder name

// Prepare the form data for the HTTP POST request
const formData: FormData = new FormData();
formData.append("file", imageUrl);
formData.append("upload_preset", uploadPreset);
formData.append("folder", folderName); // Include the folder parameter

// Make the HTTP POST request
return fetch(cloudinaryUploadURL, {
    method: "POST",
    body: formData,
})
.then((response) => response.json())
.then((data) => {
    // console.log("Image uploaded to Cloudinary:", data);
    console.log(data.url);
    // You can use the data returned by Cloudinary as needed, e.g., to display the image or get the URL to pass on to DynamoDB.
    return data.url
})
.catch((error) => {
    console.error("Error uploading image to Cloudinary:", error);
});

}