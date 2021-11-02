import BluaBlueNodeSdk from "../src";
import {Article} from "../src/types/Article";
/*import axios from "axios";

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>;*/



describe("test client", () => {
    let server, bluaBlue;
    beforeAll(done => {
        bluaBlue = new BluaBlueNodeSdk('mockPublic','mockAPI','http://localhost:3001/api');
        server = require("../mockBluaBlue/api");
        done();
    });
    afterAll(done => {
        server.close(done);
    })

   /* beforeEach(function () {
        server = require("../mockBluaBlue/api");
    });
    afterEach(function (done) {
        server.close(done);
    });*/
    it("should authenticate successfully", async () => {
        const newBB = new BluaBlueNodeSdk('mockPublic','mockAPI','http://localhost:3001/api');
        await newBB.authenticate();
        expect(newBB.getToken()).toBe('testtoken');
    });
    it("should retrieve Article by slug and own", async () => {
        await bluaBlue.authenticate();
        const article = await bluaBlue.getArticle('test')
        const articles = await bluaBlue.getOwnArticles()
        expect(article.id).toBe('ABC');
        expect(articles[0].id).toBe('ABC');
    });
    it("should create and update an article", async () => {
        await bluaBlue.authenticate();
        const article = {name:'new article'}
        const apiArticle = await bluaBlue.createArticle(article);
        expect(apiArticle.id).toBe('123');
        apiArticle.name = 'updated article';
        const updatedArticle = await bluaBlue.updateArticle(apiArticle);
        expect(updatedArticle.name).toBe('updated article')
    });
    it("should register, retrieve and delete images", async () => {
        await bluaBlue.authenticate();
        const external = await bluaBlue.registerImage('test.webp');
        expect(external.id).toBe('external')
        expect(external.path).toBe('test.webp')
        const internal = await bluaBlue.registerImage('fakeBase64','upload');
        expect(internal.id).toBe('internal')
        const images = await bluaBlue.getImages();
        expect(images.length).toBeGreaterThan(0);
        const deleted = await bluaBlue.deleteImage('123');
        expect(deleted.delete).toBe('happened')
    });
    it("should get categories", async () => {
        await bluaBlue.authenticate();
        const cats = await bluaBlue.getCategories();
        expect(cats.length).toBeGreaterThan(0)

    });
    it("should get profile info", async () => {
        await bluaBlue.authenticate();
        const info = await bluaBlue.getAccountInfo();
        expect(info.api[0].scope).toBe('all')

    });
    it("should fail to authenticate", async ()=> {
        const mockArticle: Article = {
            article_content: undefined,
            delete_date_st: 0,
            insert_date_st: 0,
            update_date_st: 0,
            name: 'mockarticle',
            slug:'mockarticle',
            is_public:1,
            insert_date:'2020-12-12',
            article_comment:[],
            publish_date_st: 123123,
            article_rating:[],
            article_store:[]
        };

        const failMock = new BluaBlueNodeSdk('nope','wrong','http://localhost:3001/api');
        await expect(failMock.authenticate()).rejects.toThrow(/Failed to execute/)
        await expect(failMock.getArticle('any')).rejects.toThrow(/Failed to execute/)
        await expect(failMock.getOwnArticles()).rejects.toThrow(/Failed to execute/)
        await expect(failMock.updateArticle(mockArticle)).rejects.toThrow(/Failed to execute/)
        await expect(failMock.createArticle(mockArticle)).rejects.toThrow(/Failed to execute/)
        await expect(failMock.getImages()).rejects.toThrow(/Failed to execute/)
        await expect(failMock.registerImage('path.png','upload')).rejects.toThrow(/Failed to execute/)
        await expect(failMock.deleteImage('123')).rejects.toThrow(/Failed to execute/)
        await expect(failMock.getCategories()).rejects.toThrow(/Failed to execute/)
        await expect(failMock.getAccountInfo()).rejects.toThrow(/Failed to execute/)
    })

});