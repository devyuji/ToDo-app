let express = require('express');
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
app.set('view engine','ejs');
let lists = [];
let work = [];
app.use(express.static('decoration'));

app.get('/',function(req, res){
    let today = new Date();
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let day = today.toLocaleDateString('en-US',options);
    res.render('index',{day:day , newItem :lists});
});

app.post('/',function(req,res){
    let list = req.body.list;
    // console.log(req.body);
    if(req.body.btn == 'work'){
        work.push(list);
        res.redirect('/work');
    }
    else{
    lists.push(list);
    res.redirect('/');
    }
});
app.get('/work',function(req,res){
    res.render('index',{day:'work',newItem :work}); 
});

app.listen(process.env.PORT || 3000,function(){
    console.log('server started at 3000 port');
});