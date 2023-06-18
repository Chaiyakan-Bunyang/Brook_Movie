import React, { useEffect,useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { FaEye,FaEyeSlash} from "react-icons/fa";
import { InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
function Login(props) {
  const { setShowNavbar } = props;
  setShowNavbar(false);

  const [showpassword,setShowpassword] = useState(false)
  return (
    <div className="login template d-flex justify-content-center align-items-center 100-w vh-100 bg-light">
      <Card style={{ width: '30rem',height:'30rem',padding:'30px'}} >
        <Card.Body>
        <form>
          <h3 className="text-center mb-4">Login</h3>
          <div className="mb-3">
            <FloatingLabel
              controlId="floatingInput"
              label="Email Address"
              className="mb-3"
            >
              <Form.Control type="email" placeholder="name@example.com" />
            </FloatingLabel>
          </div>
          <div className="mb-3">
          <InputGroup>
        <FloatingLabel controlId="floatingInput" label="Password"className="mb-3" >
              <Form.Control type={showpassword? "text":"password"} placeholder="name@example.com" />
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
            <label htmlFor="check" className="custom-input-label">
              Remember me
            </label>
          </div>
          <div className="d-grid mb-3">
            <button className="btn btn-primary">Sign in</button>
          </div>
          <p className="text-right">
            Forgot <a href="">Password?</a>
            <a href="">Sign Up</a>
          </p>
        </form>
        </Card.Body>
        
      </Card>
    </div>
  );
}

export default Login;
