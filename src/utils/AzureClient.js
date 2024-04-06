const {BlobServiceClient} = require('@azure/storage-blob');


const account = "duckcoffeestorage";

const sas = "sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-06-01T13:14:24Z&st=2024-03-08T05:14:24Z&spr=https,http&sig=scBZzzt8w6d4nnJGJ1rHl5Loj%2FrfuKNNrK5RYVZ4Wfo%3D";
const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net?${sas}`);




export async function uploadToStorage(containerName , blobName , file) {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    try {
        
        const uploadBlobResponse = await blockBlobClient.uploadData(file);
        console.log(`File uploaded: ${uploadBlobResponse.requestId}`);
        return blockBlobClient.url;


    } catch (error) {
        console.error(error);
        return null;
    }
}

