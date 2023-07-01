import React, { useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { FaEye,FaEyeSlash} from "react-icons/fa";

const SignUp = (props) => {
    const {setShowNavbar} = props
    setShowNavbar(false)

    const [showpassword,setShowpassword] = useState(false)
    const [showcf_password,setShowCf_password] = useState(false)

    

    

    const handleSubmit = (e)=>{
      e.preventDefault();
      
     const fname= e.target.elements.fname.value;
     const lname = e.target.elements.lname.value;
     const email= e.target.elements.email.value;
     const password = e.target.elements.password.value
     const username = e.target.elements.username.value

     console.log(fname,email,password);

     const jasondata = {email,password,fname,lname,username}
      

      fetch(`http://localhost:3333/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jasondata)
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "ok") {
            console.log("register success");
            window.location = '/login '
          }
          else{
            console.log("register fail");
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    }

  

  return (
    <div className='login template d-flex justify-content-center align-items-center 100-w vh-100 bg-light'>
    <Card style={{ width: '40rem',height:'45rem' }} className='p-5'>
      <Card.Body>
      <form action='submit' onSubmit={handleSubmit}>
        <h3 className='text-center mb-4'>Sign Up</h3>
        <div className='mb-3 row'>
          <div className='col'>
          <FloatingLabel controlId="floatingInput" label="Firstname"className="mb-3" >
              <Form.Control type="text" placeholder="name@example.com" name='fname' />
          </FloatingLabel>
          </div>
          <div className='col'>
          <FloatingLabel controlId="floatingInput" label="Lastname"className="mb-3" >
              <Form.Control type="text" placeholder="name@example.com" name='lname' />
          </FloatingLabel>
          </div>
        </div>
        <div className='mb-3'>
          <FloatingLabel controlId="floatingInput" label="Username"className="mb-3" >
              <Form.Control type="text" placeholder="name@example.com" name='username' />
          </FloatingLabel>
        </div>
        <div className='mb-3'>
          <FloatingLabel controlId="floatingInput" label="Email Address"className="mb-3" >
              <Form.Control type="email" placeholder="name@example.com" name='email' />
          </FloatingLabel>
        </div>
        <div className='mb-3'>  
        <InputGroup>
        <FloatingLabel controlId="floatingInput" label="Password"className="mb-3" >
              <Form.Control type={showpassword? "text":"password"} placeholder="name@example.com" name='password' />
        </FloatingLabel>
        <Button onClick={()=>setShowpassword(!showpassword)}  style={{ width: '50px',height:'58px',border:' 1px solid #dee2e6'}} className='bg-white'>
            {showpassword ? <FaEyeSlash style={{ color:'#000'}} /> :<FaEye style={{ color:'#000'}}/>}
            </Button>
        </InputGroup>
          
        </div>
        <div className='mb-5'>  
        <InputGroup>
        <FloatingLabel controlId="floatingInput" label="Confirm Password"className="mb-3" >
            <Form.Control type={showcf_password ? "text":"password"} placeholder="name@example.com" name="cf_password" />
        </FloatingLabel>
          <Button onClick={()=>setShowCf_password(!showcf_password)}  style={{ width: '50px',height:'58px',border:' 1px solid #dee2e6'}} className='bg-white'>
            {showcf_password ? <FaEyeSlash style={{ color:'#000'}} /> :<FaEye style={{ color:'#000'}}/>}
            </Button>
        </InputGroup>
         
        </div>

        <div className='d-grid mb-4'>
            <button className='btn  bg-danger bg-gradient text-white'>Sign up</button>
          </div>
      </form>
      </Card.Body>
    </Card>
  </div>
  )
}

export default SignUp
