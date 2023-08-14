import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import Alert from 'react-bootstrap/Alert';

const SignUp = (props) => {
  const { setShowNavbar } = props;
  setShowNavbar(false);

  const [validated, setValidated] = useState(false);
  const [showpassword, setShowpassword] = useState(false);
  const [showcf_password, setShowCf_password] = useState(false);
  const [show, setShow] = useState(false);
  const [check_password,setCheck_password] = useState("");
  const [check_cf_password,setCheck_cf_password] = useState("");
  const [showalert,setShowAlert] = useState(false)
  const handleClose = () => setShowAlert(false);

  const fetchApi_Signup = (e) => {
    const fname = e.target.elements.fname.value;
    const lname = e.target.elements.lname.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const username = e.target.elements.username.value;
    const jsondata = { email, password, fname, lname, username };
    fetch(`http://localhost:3333/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsondata),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          console.log("register success");
        } else {
          console.log("register fail");
          setShow_error(true);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity()) {
      // ฟอร์มถูกต้อง สามารถส่งคำร้องขอได้
      const fname = e.target.elements.fname.value;
      const lname = e.target.elements.lname.value;
      const email = e.target.elements.email.value;
      const password = e.target.elements.password.value;
      setCheck_password(password);
      const username = e.target.elements.username.value;
      const jsondata = { email, password, fname, lname, username };

      // ส่งคำร้องขอไปยังเซิร์ฟเวอร์
      if(password==check_cf_password){
        //ตรวจสอบว่ารหัสผ่านตรงกับยืนยันรหัสผ่านหรือไม่
      fetch(`http://localhost:2000/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsondata),
      })
        .then((res) => res.json())
        .then((data) => {
       
          if (data.status === "ok") {
            setShow(true);
            setTimeout(() => {
              window.location = "/login ";
            }, 3000);
            console.log("register success");
          } else {
            console.log("register fail");
            setShow_error(true);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
      }
      else{
        form.checkValidity(false);
        setCheck_password("")
        setCheck_cf_password("");
        setShowAlert(true)
      } 
    }  
          else {
      // ฟอร์มไม่ถูกต้อง แสดงข้อผิดพลาดหรือดำเนินการเพิ่มเติมตามต้องการ
      e.stopPropagation();
      setValidated(true);
    }
  };

  return (
    <div className="login template d-flex justify-content-center align-items-center flex-column 100-w vh-100 bg-light">
      {showalert && (
         <Modal
         show={showalert}
         onHide={handleClose}
         backdrop="static"
         keyboard={false}
       >
         <Modal.Header closeButton>
           <Modal.Title>เกิดข้อผิดพลาด</Modal.Title>
         </Modal.Header>
         <Modal.Body>
          กรุณาระบุรหัสผ่านให้ตรงกัน
         </Modal.Body>
         <Modal.Footer>
           <Button variant="danger" onClick={handleClose}>
             ปิด
           </Button>
         </Modal.Footer>
       </Modal>
       )
      }
      <Modal show={show} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>กำลังสมัครสมาชิก</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>กรุณารอซักครู่</h5>
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Modal.Body>
      </Modal>
      <Card style={{ width: "40rem", height: "auto" }} className="p-5">
        <Card.Body>
          <Form
            onSubmit={handleSubmit}
            noValidate
            validated={validated}
            action="submit"
          >
            <h3 className="text-center mb-4">Sign Up</h3>
            <div className="mb-3 row">
              <div className="col">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Firstname"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="name@example.com"
                    name="fname"
                    maxLength={30}
                    required
                  />
                  <div class="invalid-feedback">กรุณาระบุชื่อ</div>
                </FloatingLabel>
              </div>
              <div className="col">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Lastname"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="name@example.com"
                    name="lname"
                    maxLength={30}
                    required
                  />
                  <div class="invalid-feedback">กรุณาระบุนามสกุล</div>
                </FloatingLabel>
              </div>
            </div>
            <div className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Username"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="name@example.com"
                  name="username"
                  maxLength={13}
                  minLength={6}
                  required
                />
                <div class="invalid-feedback">
                  กรุณาระบุ username 6-13 ตัวอักษร{" "}
                </div>
              </FloatingLabel>
            </div>
            <div className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Email Address"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  name="email"
                  minLength={6}
                  maxLength={30}
                  required
                />
                <div class="invalid-feedback">กรุณาระบุ email ให้ถูกต้อง </div>
              </FloatingLabel>
            </div>
            <div className="mb-3">
              <InputGroup>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Password"
                  className="mb-3"
                >
                  <Form.Control
                    type={showpassword ? "text" : "password"}
                    placeholder="name@example.com"
                    name="password"
                    onChange={(e)=>setCheck_password(e.target.value)}
                    value={check_password}
                    minLength={6}
                    maxLength={16}
                    required
                  />
                  <div class="invalid-feedback">
                    กรุณาระบุ รหัสผ่าน 6-16 ตัวอักษร
                  </div>
                </FloatingLabel>
                <Button
                  onClick={() => setShowpassword(!showpassword)}
                  style={{
                    width: "50px",
                    height: "58px",
                    border: " 1px solid #dee2e6",
                  }}
                  className="bg-white"
                >
                  {showpassword ? (
                    <FaEyeSlash style={{ color: "#000" }} />
                  ) : (
                    <FaEye style={{ color: "#000" }} />
                  )}
                </Button>
              </InputGroup>
            </div>
            <div className="mb-5">
              <InputGroup>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Confirm Password"
                  className="mb-3"
                >
                  <Form.Control
                    type={showcf_password ? "text" : "password"}
                    placeholder="name@example.com"
                    name="cf_password"
                    isInvalid={check_cf_password!=check_password}
                    maxLength={16}
                    minLength={6}
                    value={check_cf_password}
                    onChange={(e)=>setCheck_cf_password(e.target.value)}
                    required
                  />
                  <div class="invalid-feedback">
                  {check_cf_password.length<=6?"กรุณาระบุ รหัสผ่าน 6-16 ตัวอักษร":"กรุณาระบุรหัสผ่านให้ตรงกัน"}
                  </div>
                </FloatingLabel>
                <Button
                  onClick={() => setShowCf_password(!showcf_password)}
                  style={{
                    width: "50px",
                    height: "58px",
                    border: " 1px solid #dee2e6",
                  }}
                  className="bg-white"
                >
                  {showcf_password ? (
                    <FaEyeSlash style={{ color: "#000" }} />
                  ) : (
                    <FaEye style={{ color: "#000" }} />
                  )}
                </Button>
              </InputGroup>
            </div>

            <div className="d-grid mb-4">
              <button className="btn  bg-danger bg-gradient text-white">
                Sign up
              </button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SignUp;
