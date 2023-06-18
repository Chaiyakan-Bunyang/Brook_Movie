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

  return (
    <div className='login template d-flex justify-content-center align-items-center 100-w vh-100 bg-light'>
    <Card style={{ width: '40rem',height:'35rem' }} className='p-5'>
      <Card.Body>
      <form>
        <h3 className='text-center mb-4'>Sign Up</h3>
        <div className='mb-3'>
          <FloatingLabel controlId="floatingInput" label="Username"className="mb-3" >
              <Form.Control type="text" placeholder="name@example.com" />
          </FloatingLabel>
        </div>
        <div className='mb-3'>
          <FloatingLabel controlId="floatingInput" label="Email Address"className="mb-3" >
              <Form.Control type="email" placeholder="name@example.com" />
          </FloatingLabel>
        </div>
        <div className='mb-3'>  
        <InputGroup>
        <FloatingLabel controlId="floatingInput" label="Password"className="mb-3" >
              <Form.Control type={showpassword? "text":"password"} placeholder="name@example.com" />
        </FloatingLabel>
        <Button onClick={()=>setShowpassword(!showpassword)}  style={{ width: '50px',height:'58px',border:' 1px solid #dee2e6'}} className='bg-white'>
            {showpassword ? <FaEyeSlash style={{ color:'#000'}} /> :<FaEye style={{ color:'#000'}}/>}
            </Button>
        </InputGroup>
          
        </div>
        <div className='mb-5'>  
        <InputGroup>
        <FloatingLabel controlId="floatingInput" label="Confirm Password"className="mb-3" >
            <Form.Control type={showcf_password ? "text":"password"} placeholder="name@example.com" />
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
