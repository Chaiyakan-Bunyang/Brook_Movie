const exrpess = require('express')
const cors = require('cors')
const app = exrpess()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const mysql = require('mysql2')
const bcrypt = require('bcrypt')
const saltRound = 10;
const jwt = require('jsonwebtoken')
const secret = 'E-commerce-Login'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'e-commerce_db'
}); 

connection.connect((err)=>{
    if(err){
        console.log('Error connect to MySql');
        return;
    }
    console.log('MySql successfully connected!');
})



app.use(cors())

app.post('/register',jsonParser,(req,res)=>{
 const {fname,lname,username,password,email} = req.body
 bcrypt.hash(password,saltRound,(err,hash)=>{
    try{
        connection.query(
            "INSERT INTO users(id,fname,lname,username,password,email) VALUES(?,?,?,?,?,?)",
            [hash,fname,lname,username,hash,email],
            (err,results,fields)=>{
                if(err){
                    res.json({status: 'error',message:err})
                    return
                }
                res.json({status: 'ok',message:err})
            }
            )
     } catch(err){
        console.log(err);
        return res.status(500)
     }
 })

})
app.put('/edituser',jsonParser,(req,res)=>{
    const {fname,lname,username,email,id} = req.body
       try{
           connection.query(
               "UPDATE users SET fname=?, lname=?, username=?, email=? WHERE id=?",
               [fname,lname,username,email,id],
               (err,results,fields)=>{
                   if(err){
                       res.json({status: 'error',message:err})
                       return
                   }
                   res.json({status: 'ok',message:err})
               }
               )
        } catch(err){

           console.log(err);
           return res.status(500)
        }
    }
    )
app.get('/profile/:id',(req,res)=>{
    const id =req.params.id
    try{
        connection.query(
            "SELECT * FROM users WHERE id = ?",[id],
            (err,result)=>{
               if(err){
                res.json({status:'error',message:err})
                return
               }
               if(result.length==0){
                res.json({status:'error',message:'No user found'})
                return
               }
               res.json(result)
               console.log(result);
            }
        )
    }
    catch(err){
        console.log(err);
        return res.status(500)
    }
})

app.post('/login',jsonParser,(req,res)=>{
const {email,password,id} = req.body
try{
    connection.query(
    "SELECT * FROM users WHERE email=?",
    [email],(err,result,fields)=>{
        if(err){
            res.json({status:'error',message:err})
            return
        }
        if(result.length==0){
            res.json({status:'error',message:"No user found"})
            return
        }
        bcrypt.compare(password, result[0].password, function(err, isLogin) {
            if(isLogin){
                const token =jwt.sign({email:result[0].email,username:result[0].username,id:result[0].id},secret,{ expiresIn:'1h' })
                res.json({status:'ok',message:"login success",token})
            }else{
                res.json({status:'error',message:"login fail!"})
            }
        });
    }
        )
}

catch(err){
   console.log(err);
   return res.status(500)
}
})

app.post('/authen',jsonParser,(req,res)=>{
   try{
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token,secret)
    res.json({status:'ok',decoded})
   }
   catch(err){
    console.log(err);
    res.json({status:'error',message:err.message})
   }
})

app.listen(2000,()=>{
    console.log('start server in port 2000');
})