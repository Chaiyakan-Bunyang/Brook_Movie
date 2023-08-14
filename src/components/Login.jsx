import React, { useEffect,useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { FaEye,FaEyeSlash} from "react-icons/fa";
import { InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
function Login(props) {
  const { setShowNavbar } = props;
  setShowNavbar(false);

  const [showpassword,setShowpassword] = useState(false)
  const [show, setShow] = useState(false);
  const [show_error,setShow_error] = useState(false)

  const handleClose = () => setShow_error(false);
 
  const handleSubmit = (e)=>{
    e.preventDefault();
    const user_email = e.target.elements.email.value;
    const user_password = e.target.elements.password.value;
    
    const jsonData = {email:user_email,password:user_password}

    fetch(`http://localhost:2000/login`,{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(jsonData)
    })
    .then(res => res.json())
    .then(data=>{
     if(data.status =='ok'){
      localStorage.setItem('token',data.token)
      setShow(true)
      setTimeout(()=>{
        window.location = '/'
      }, 2000)
      console.log('success',data);
     }
     else{
      setShow_error(true)
     }
    })
    .catch((error)=>{
      console.log('error',error);
    });
  }
  
  return (
  <div>
     <Modal
        show={show}
        backdrop="static"
        keyboard={false}
      >
         <Modal.Header>
          <Modal.Title>กำลังเข้าสู่ระบบ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>กรุณารอซักครู่</h5>
        <Spinner animation="border" role="status" variant="primary">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
        </Modal.Body>
       
      </Modal>

      <Modal
        show={show_error}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>เข้าสู่ระบบไม่สำเร็จ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         ไม่พบข้อมูลผู้ใช้ในระบบ กรุณาระบุ อีเมล หรือ รหัสผ่านให้ถูกต้อง
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            ปิด
          </Button>
        </Modal.Footer>
      </Modal>
    <div className="login template d-flex flex-column justify-content-center align-items-center 100-w vh-100 bg-light">
      <Card style={{ width: '30rem',height:'30rem',padding:'30px'}} >
        <Card.Body>
        <form action="submit" onSubmit={handleSubmit}>
          <h3 className="text-center mb-4">เข้าสู่ระบบ</h3>
          <div className="mb-3">
            <FloatingLabel
              controlId="floatingInput"
              label="Email Address"
              className="mb-3"
            >
              <Form.Control type="email" placeholder="name@example.com" name="email" />
            </FloatingLabel>
          </div>
          <div className="mb-3">
          <InputGroup>
        <FloatingLabel controlId="floatingInput" label="Password" className="mb-3" >
        <Form.Control type={showpassword? "text":"password"} name="password"  placeholder="Password"/>
        </FloatingLabel>
        <Button onClick={()=>setShowpassword(!showpassword)}  style={{ width: '50px',height:'58px',border:' 1px solid #dee2e6'}} className='bg-white'>
            {showpassword ? <FaEyeSlash style={{ color:'#000'}} /> :<FaEye style={{ color:'#000'}}/>}
            </Button>
        </InputGroup>
          </div>
          <div className="mb-2">
            <input
              type="checkbox"
              className="custom-control custom-checkbox"
              id="check"
            />
            <label htmlFor="check" className="custom-input-label ms-1">
              จำรหัสผ่าน
            </label>
          </div>
          <div className="d-grid mb-3">
            <button className="btn btn-primary" type="submit">Sign in</button>
          </div>
          <p className="text-right">
            Forgot <a href="">ลืมรหัสผ่าน</a>
            <a href="">เข้าสู่ระบบ</a>
          </p>
        </form>
        </Card.Body>
        
      </Card>
    </div>

  </div>
    
  );
}

export default Login;
