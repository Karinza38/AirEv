

const express=require('express');
const app=express();
const mongoose=require("mongoose");
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const port = 2901;
let time=0;
let finall=[]






const DB="mongodb+srv://sanchit:diehardfan@cluster0.lxmxcq5.mongodb.net/AirEv?retryWrites=true&w=majority";
const client = new MongoClient(DB);


const supplier=["TelioEv","Tata Motors","charge point","Hyliion Holdings","Proterra","Aptiv","NASDAQ:TSLA"];
const supp = async function() {
       
    
        
        // user_info={username:user_info.username,password:user_info.password};
        
        

        const database = client.db("AirEv");
        const users = database.collection("Suplier");
        
        const options = {
        projection: { name:1}
        };
        const user_info={username:"sanchit",password:"sanchit"};
        console.log(user_info);
        
        const user_data = await users.find({}).toArray(function(err, result) {
            if (err) throw err;
            for (let i = 0; i < 10; i++) {
                supplier.push(result[i]);
              }
            });
        console.log(supplier);
        

          
        
        
    
    
}
    
    


supp();

const run = async function(res) {
    try {
        
    
        
        // user_info={username:user_info.username,password:user_info.password};
        delete user_info.name;
        delete user_info.email;
        delete user_info.model;
        delete user_info.address;
        delete user_info._id;
        


        const database = client.db("AirEv");
        const users = database.collection("User_Login");
        
        const options = {
        projection: { _id: 1, username: 1, password: 1 ,name:1,email:1,model:1,address:1},
        };
        console.log(user_info);
        const user_data = await users.findOne(user_info, options);
        console.log(user_data+"DCFVGBHNJM");
        if(user_data){
            user_info.name=user_data.name;
            user_info.email=user_data.email;
            user_info.model=user_data.model;
            user_info._id=user_data._id;
            user_info.address=user_data.address;

            console.log(user_data);
            res.writeHead(302, {
                Location: "http://127.0.0.1:2901/dash"
            });
            res.end();
            
        }

        else{
            const data= {page:'Login',
                 type:'none',   
                 msg:"Create your Account",
                 addr:"http://localhost:2901/sign",
                 addr2:"http://localhost:2901/loginp"};
            const view={hide:"block"};
            res.render("home",{data:data,view:view,supplier});
            
        }
        
    }
    
        finally {
        console.log('end');
        
        return;

    }
    
    }
    
    
    
const run2 = async function(res) {
    try {
        
    
        
        
        const database = client.db("AirEv");
        const users = database.collection("User_Login");
        
        const options = {
        projection: { _id: 1, username: 1, password: 1 , name:1,email:1,model:1,address:1},
        };
        const user_data = await users.findOne(user_info, options);
        // console.log(user_data);
        if(user_info.username==="" || user_info.name==="" || user_info.password==="" || user_info.email===""){
            res.writeHead(302, {
                Location: "http://127.0.0.1:2901/invalid"
            });
            res.end();

        }
        else if(user_data){
            console.log(user_data);
            res.writeHead(302, {
                Location: "http://127.0.0.1:2901/invalid"
            });
            res.end();
            
        }

        else{
            
            const result = await users.insertOne(user_info);
            console.log(`A document was inserted with the _id: ${result.insertedId} ${user_info.username}`);
            
            res.writeHead(302, {
                Location: "http://127.0.0.1:2901/dash"
            });
            res.end();
            
        }
        
    }
    
        finally {
        console.log('end');
        
        return;

    }
    
    }
    run2().catch(console.dir);



const update_details = async function(res) {
    try {
        
    
        
        // user_info={username:user_info.username,password:user_info.password};
        

        console.log("update");
        const database = client.db("AirEv");
        const users = database.collection("User_Login");
        const myquery = { _id: user_info._id };
        const update={name:user_info.name,username:user_info.username,password:user_info.password,model:user_info.model}
        const newvalues = { $set: update };
        const options = {
        projection: { _id: 1, username: 1, password: 1 ,name:1,email:1,model:1,address:1},
        };
        console.log("update");
        console.log(update);
        console.log(user_info);
        const user_data = await users.updateOne(myquery, newvalues, function(err, res) {
            if (err) throw err;
            console.log("1 document updated");
          });
        
    }
    
        finally {
        console.log('end');
        
        return;

    }
    
    }
    
    








const user_info={username:'',password:''};

console.log('hi');


app.set('view engine','ejs');

app.use(express.static('public'))
app.use('/assets',express.static(__dirname+'public/assets'));



app.get('/', (req, res) => {  
    
    
    res.render('homepage');
});

app.post('/', (req, res) => {  
    
    
    res.render('homepage');
});


app.get('/login', (req, res) => {  
    const data= {page:'Login',
                 type:'none',   
                 msg:"Create your Account",
                 addr:"http://localhost:2901/sign",
                 addr2:"http://localhost:2901/loginp"}; 
    const view={hide:"none"}; 
    
    res.render('home',{data:data,view:view});      
                                                       
});
app.post('/login', (req, res) => {  
    const data= {page:'Login',
                 type:'none',   
                 msg:"Create your Account",
                 addr:"http://localhost:2901/sign",
                 addr2:"http://localhost:2901/loginp"};  
    console.log("LOG OUT");   
    const view={hide:"none"};  
    res.render('home',{data:data,view:view,supplier});      
                                                       
});

let supin='';
app.post('/pay', urlencodedParser, function (req, res) {  
    supin=req.body.telio;
   console.log(req.body.telio);
   res.render("pay",{supin,user_info});

    
    
});

app.post('/dashdash', urlencodedParser, function (req, res) {  
    time=time+1;
    const data= {page:"dash",msg:"Update Details"}; 
   console.log(time);
   finall.push(supin);
   console.log(finall);
   res.render("dash",{user_info:user_info,data:data,supplier,finall});

    
    
});

app.post('/sign', (req, res) => {  
    const data= {page:'Sign Up',
                 type:'block',
                 msg:"Already have an account?",
                 addr:"http://localhost:2901/login",
                 addr2:"http://localhost:2901/signp"   }; 
                 const view={hide:"none"};  
    
    res.render('home',{data:data,view:view,supplier});      
                                                       
});

app.post('/transaction', (req, res) => {  
    const data= {page:"transaction"};     
    res.render('dash',{user_info:user_info,data:data,supplier,finall});      
                                                       
});

app.post('/user-profile', (req, res) => {  
    const data= {page:"profile" };
    const u={u:"Update Details"};
       
     
    res.render('dash',{user_info:user_info,data:data,u:u,supplier,finall});      
                                                       
});

app.get('/dash', (req, res) => {  
    const data= {page:"dash",msg:"Update Details"};     
 
    res.render('dash',{user_info:user_info,data:data,supplier,finall});      
                                                       
});

app.post('/dash', (req, res) => {  
    const data= {page:"dash",msg:"Update Details"};  
 
    res.render('dash',{user_info:user_info,data:data,supplier,finall});      
                                                       
});

app.post('/charging-st', (req, res) => {  
    const data={page:"charging-st"};
    res.render('dash',{user_info:user_info,data:data,supplier,finall});      
                                                       
});

app.get('/p', (req, res) => {

    run(res);      
                                                       
});

app.get('/pp', (req, res) => {       
    run2(res);      
                                                       
});

app.get('/invalid', (req, res) => { 
    const data= {page:'Sign Up',
                 type:'block',
                 msg:"Already have an account?",
                 addr:"http://localhost:2901/login"   };      
    res.render("invalid",{data,data,supplier});      
                                                       
});


app.post('/loginp', urlencodedParser, function (req, res) {  
  
    user_info.username=req.body.username;
    user_info.password=req.body.pass;
    res.writeHead(302, {
        Location: "http://127.0.0.1:2901/p"
    });
    res.end();
    
});

app.post('/signp', urlencodedParser, function (req, res) {  
  
    user_info.username=req.body.username;
    user_info.password=req.body.pass;
    user_info.name=req.body.name;
    user_info.email=req.body.email;
    user_info.model=req.body.model;
    user_info.address=req.body.address;

    

    res.writeHead(302, {
        Location: "http://127.0.0.1:2901/pp"
    });
    res.end();
    
});

app.post('/update', urlencodedParser, function (req, res) {  
  
    user_info.username=req.body.username;
    user_info.password=req.body.pass;
    user_info.name=req.body.name;
    user_info.email=req.body.email;
    user_info.email=req.body.model;
    user_info.address=req.body.address;
    const u={u:"Updated"};     

    update_details(res);
    const data= {page:"profile"};  
    res.render('dash',{user_info:user_info,data:data,u:u,supplier});
    
});

app.post('/portable', urlencodedParser, function (req, res) {  
  
    const data= {page:"portable"};  
    res.render('dash',{user_info:user_info,data:data,supplier});
    
});

app.post('/portable-input', urlencodedParser, function (req, res) {  
  
    const data= {page:"portable23"};
    const p_input={model:req.body.model,number:req.body.number,address:req.body.address,payment:req.body.payment};

    res.render('dash',{user_info:user_info,data:data,p_input:p_input,supplier});
    
});



app.listen(port, () => {            
    console.log(`Now listening on port ${port}`); 
});











  
  

// run(user_info);


// MongoClient.connect(DB,function(err,db){
//     console.log('Connection success');
//     let dbo=db.db("AirEv");
//     dbo.collection("User_Login").find({}).toArray(function(err, result) {
//         if (err) throw err;
//         console.log(`username: ${result[0].username} password: ${result[0].password}`);
//         db.close();
//       });
// });








// const MongoClient = require('mongodb').MongoClient;
// // Replace the uri string with your MongoDB deployment's connection string.
// const uri = "mongodb+srv://sanchit:diehardfan@cluster0.lxmxcq5.mongodb.net/AirEv?retryWrites=true&w=majority";
// const client = new MongoClient(uri);
// async function run2() {
//   try {
//     const database = client.db("AirEv");
//     const haiku = database.collection("User_Login");
//     // create a document to insert
//     const doc = {
//       title: "Record of a Shriveled Datum",
//       content: "No bytes, no problem. Just insert a document, in MongoDB",
//     }
//     const result = await haiku.insertOne(doc);
//     console.log(`A document was inserted with the _id: ${result.insertedId}`);
//   } finally {
//     await client.close();
//   }
// }
// run().catch(console.dir);