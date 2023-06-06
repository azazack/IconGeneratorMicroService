"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var storage_blob_1 = require("@azure/storage-blob");
var account = "storageicon";
var accountKey = process.env.ACCOUNT_KEY;
var sharedKeyCredential = new storage_blob_1.StorageSharedKeyCredential(account, accountKey);
var blobServiceClient = new storage_blob_1.BlobServiceClient("https://".concat(account, ".blob.core.windows.net"), sharedKeyCredential);
exports.default = blobServiceClient;
