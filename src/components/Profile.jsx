import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

export default function Profile(props) {
  const {id} = props
  const [data, setData] = useState("");
  const [fname,setFName] = useState("")
  const [lname,setLName] = useState("")
  const [username,setUsername] = useState("")
  const [email,setEmail] = useState("")
  const [show,setShow] = useState(false)


  const fettchAPI_Users = async () => {
    const res = await axios.get(`http://localhost:2000/profile/${id}`);
    const user_data = res.data[0]
    setData(user_data);
    setFName(user_data.fname)
    setLName(user_data.lname)
    setUsername(user_data.username)
    setEmail(user_data.email)
  };
  const updateProfile = async (id) => {
    await axios.put("http://localhost:2000/edituser",{fname:fname,lname:lname,username:username,email:email,id:3})
    setShow(true)
    setTimeout(()=>{
      window.location=`/profile/`
    },2000)
  };
  useEffect(() => {
    fettchAPI_Users();
  }, [id]);
  return (
    <div>
      <Modal show={show} size="xs">
        <Modal.Body style={{height:'20rem'}} className="d-flex justify-content-center align-items-center flex-column">
        <Spinner animation="border" variant="success" style={{width:'5rem',height:'5rem'}} />
        <h2 className="mt-1">กำลังบันทึกข้อมูล</h2>
        </Modal.Body>
      </Modal>

      <Container className="d-flex justify-content-center align-items-center flex-column">
        <Card className="mt-5" style={{ width: "40rem", height: "26rem" }}>
          <Card.Body>
            <Card.Title className="text-center">
              <h3>แก้ไขโปรไฟล์</h3>
            </Card.Title>
            <form>
              <div className="row mt-3">
                <div className="col">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="ชื่อ"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="name@example.com"
                      value={fname}
                      name ="fname"
                      onChange={(e)=>setFName(e.target.value)}
                    />
                  </FloatingLabel>
                </div>
                <div className="col">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="นามสกุล"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="name@example.com"
                      value={lname}
                      name ="lname"
                      onChange={(e)=>setLName(e.target.value)}
                    />
                  </FloatingLabel>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="ชื่อผู้ใช้งาน"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="name@example.com"
                      value={username}
                      name="username"
                      onChange={(e)=>setUsername(e.target.value)}
                    />
                  </FloatingLabel>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="อีเมล"
                    className="mb-3"
                  >
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      name="email"
                      onChange={(e)=>setEmail(e.target.value)}
                    />
                  </FloatingLabel>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col">
                  <Button style={{ width: "100%" }} onClick={()=>updateProfile(id)}>แก้ไขโปรไฟล์</Button>
                </div>
              </div>
            </form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
