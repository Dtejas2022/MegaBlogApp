import conf from "../conf/conf";
import { Client, ID, Databases, Storage,Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appWriteUrl) 
            .setProject(conf.appWriteProjectId);
            this.databases = new Databases(this.client);
            this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuedImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuedImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            throw error;
        }
    }

    async updatePost(slug, {title,content, featuedImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuedImage,
                    status,
                }
            )
        } catch (error) {
            throw error;
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            throw error;
            return false;
        }
    }

    async getPost(slug){
        try {
            retuen await this.databases.getDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
            )
        } catch (error) {
            throw error;
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                queries,
            )
        } catch (error) {
            throw error;
            return false;
        }
    }

    //file upload services 

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appWriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            throw error;
            return false;
        }
    }

    async deleteeFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appWriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            throw error;
            return false;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appWriteBucketId,
            fileId
        )
    }

}


const service = new Service()
export default service