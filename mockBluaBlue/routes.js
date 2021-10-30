const router = require('express').Router();

router.post('/auth/:apikey/:publicKey', (req, res) =>{
    if(req.params.apikey === 'mockAPI' && req.params.publicKey === 'mockPublic'){
        return res.json({token:'testtoken'}).end()
    }
    return res.status(401).end();
})
const needsAuth = (req, res, next)=> {
    if(!req.isAuthenticated){
        return res.status(401).json({error:'unauthorized'}).end()
    } else {
        next()
    }
}

router.get('/article/:type/:slug?', needsAuth, (req, res) =>{

    const answers = {
        slug: {
            id:'ABC',
            name:'a mock article'
        },
        mine: [
            {
                id:'ABC',
                name:'a mock article'
            }
        ]
    }
    return res.json(answers[req.params.type])
})

router.put('/article', needsAuth, (req, res)=>{
    return res.json(req.body)
})
router.post('/article', needsAuth, (req, res)=>{
    const article = req.body;
    article.id = '123';
    return res.json(article)
})

router.get('/image', needsAuth, (req, res)=> {
    return res.json([{
        id:'123',
        path:'/asset/some.jpg'
    }])
})
router.post('/image', needsAuth, (req, res)=> {
    const newImgs = {
        upload:{
            id:'internal',
            path:'123.png'
        },
        external:{
            id:'external',
            path:req.body.image
        }
    };
    return res.json(newImgs[req.body.mode])
})
router.delete('/image/:id', needsAuth, (req, res)=>{
    res.json({'delete' :'happened'})
})

router.get('/category', needsAuth, (req, res)=>{
    res.json([
        {id:'123',name:'blog'},
        {id:'124',name:'tutorial'}
    ])
})
router.get('/profile-settings', needsAuth, (req, res)=>{
    res.json({
        storage:{images:{count:2, storage:1024}},
        api:[{id:'123','scope':'all'}]
    })
})

module.exports = router;