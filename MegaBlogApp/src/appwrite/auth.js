import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appWriteUrl) 
        .setProject(conf.appWriteProjectId);  
    }
}


const authService = new AuthService();

export default AuthService;