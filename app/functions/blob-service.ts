import { BlobServiceClient, StorageSharedKeyCredential } from "@azure/storage-blob"

const account = "storageicon";
const accountKey = process.env.ACCOUNT_KEY;

const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net`,
    sharedKeyCredential
);

export default blobServiceClient;