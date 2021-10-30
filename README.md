# Blua.Blue universal JS SDK

- cjs
- es2015
- esm
- umd

## Installation



## As UMD

```html
<script src="https://unpkg.com/axios@0.24.0/dist/axios.min.js"></script> // requires axios to be defined
<script src="dist/umd/BluaBlueClient.js"></script>
<script>
    const public = 'D1BA9ADD390E11EC9509D83BBF2ADDD8';
    const private = '3a91fe7a79f12a28de7fe5c4dccce19d3e37'; // needless to say in browser: use a read-only-scope-key
    const client = new BluaBlueClient(public, private);
    const container = document.getElementById('my-articles')
    client.authenticate().then(()=>{
        client.getOwnArticles().then(articles => {
            console.log(articles)
        })
    })
    
</script>
```

## In node

```javascript
const Blua = require('blua-blue-js/dist/cjs').default

const client = new Blua('5594613839C611EC9509D83BBF2ADDD8','3a91fe7a79f12a28de7fe5c4dccce19d3e37');
(async ()=>{
    await client.authenticate();
    console.log(await client.getOwnArticles())
})()
```
