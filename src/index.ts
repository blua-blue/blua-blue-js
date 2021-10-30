import axios, {AxiosInstance} from "axios";
import {Article} from "./types/Article";
import {Image} from "./types/Image";
import {Category} from "./types/Category";

class BluaBlueNodeSdk{
    private readonly APIkey: string;
    private readonly PublicId: string;
    private endpoint: string;
    private apiVersion: string;
    private token:string;
    private api: AxiosInstance;
    constructor(PublicId: string = null, APIkey: string = null, endpoint='https://blua.blue', apiVersion='v1') {
        this.PublicId = PublicId || (typeof process !== 'undefined' ? process.env.BLUA_BLUE_PUBLIC_KEY : null);
        this.APIkey = APIkey || (typeof process !== 'undefined' ? process.env.BLUA_BLUE_PRIVATE_KEY : null);
        this.endpoint = endpoint;
        this.apiVersion = apiVersion;
        this.api = axios.create({
            baseURL: endpoint+'/api.'+apiVersion,
            headers:{}
        })
        this.api.interceptors.request.use(config => {
            if(this.token){
                config.headers.Authorization = `baerer ${this.token}`;
            }
            return config;
        })
    }
    async authenticate(): Promise<void>{
        return this.api.post('/auth/'+this.APIkey+'/'+this.PublicId).then(res => {
            this.token = res.data.token;

        }).catch(BluaBlueNodeSdk.evaluateError)
    }
    getToken(){
        return this.token;
    }
    setToken(token):void{
        this.token = token;
    }
    login(redirect: string, endpoint: string=null){
        return this.endpoint + '/auth?redirect='+ redirect + (endpoint? '&endpoint='+endpoint:'');
    }
    async getArticle(slug: string): Promise<Article>{
        try{
            const {data} = await this.api.get('/article/slug/'+slug)
            return data;
        } catch (e) {
            BluaBlueNodeSdk.evaluateError(e)
        }
    }
    async getOwnArticles(): Promise<Array<Article>>{
        try{
            const {data} = await this.api.get('/article/mine')
            return data;
        } catch (e) {
            BluaBlueNodeSdk.evaluateError(e)
        }
    }

    async updateArticle(article:Article):Promise<Article>{
        try{
            const {data} = await this.api.put('/article', article)
            return data;
        } catch (e) {
            BluaBlueNodeSdk.evaluateError(e)
        }
    }
    async createArticle(article:Article):Promise<Article>{
        try{
            const {data} = await this.api.post('/article', article)
            return data;
        } catch (e) {
            BluaBlueNodeSdk.evaluateError(e)
        }
    }
    async getImages():Promise<Array<Image>>{
        try{
            const {data} = await this.api.get('/image')
            return data;
        } catch (e) {
            BluaBlueNodeSdk.evaluateError(e)
        }
    }
    async registerImage(image: string, mode= 'external'):Promise<Array<Image>>{
        try{
            const {data} = await this.api.post('/image',{mode,image})
            return data;
        } catch (e) {
            BluaBlueNodeSdk.evaluateError(e)
        }
    }
    async deleteImage(id){
        try{
            const {data} = await this.api.delete('/image/'+id)
            return data;
        } catch (e) {
            BluaBlueNodeSdk.evaluateError(e)
        }
    }
    async getCategories():Promise<Array<Category>>{
        try{
            const {data} = await this.api.get('/category')
            return data;
        } catch (e) {
            BluaBlueNodeSdk.evaluateError(e)
        }
    }
    async getAccountInfo(){
        try{
            const {data} = await this.api.get('/profile-settings')
            return data;
        } catch (e) {
            BluaBlueNodeSdk.evaluateError(e)
        }
    }
    private static evaluateError(error){
        throw new Error("Failed to execute method - "+error);
    }
}
export default BluaBlueNodeSdk;