import React, { useEffect, useState } from "react";
import { Button, Col } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { useParams } from "react-router-dom";
export default function Userprofile(props) {
    const {id} = props
    const [userData,setUserData] = useState("")
    console.log("Hello World");
    const fetchUserprofile = async ()=>{
        const res = await axios.get(`http://localhost:2000/profile/${id}`)
       setUserData(res.data[0])
    }
    useEffect(()=>{
        fetchUserprofile();
    },[id])
    console.log(userData);
  return (
    <div>
      <Container>
        <Row>
          <Card
            className="mt-5 me-3"
            bg="dark"
            text="white"
            style={{ width: "30rem", height: "25rem" }}
          >
            <Card.Body className="d-flex justify-content-center flex-column  align-items-center">
              <img
                src="https://www.shareicon.net/data/512x512/2016/09/15/829472_man_512x512.png"
                alt="profile"
                style={{ width: "200px" }}
                className="mb-4"
              />
              <h2>{userData.username}</h2>
            </Card.Body>
          </Card>
          <Card
            className="mt-5"
            bg="dark"
            text="white"
            style={{ width: "50rem",height:"auto"}}
          >
            <Card.Body>
              <h2>โปรไฟล์ของฉัน</h2>
              <div className="p-3">
                <Row className="mt-5">
                  <Col className="h4" md={3}>
                    ชื่อ-สกุล
                  </Col>
                  <Col className="h4">{userData.fname} {userData.lname}</Col>
                </Row>
                <div className="line mt-3"></div>
                <Row className="mt-5">
                  <Col className="h4" md={3}>
                    ชื่อผู้ใช้งาน
                  </Col>
                  <Col className="h4">{userData.username}</Col>
                </Row>
                <div className="line mt-3"></div>
                <Row className="mt-5">
                  <Col className="h4" md={3}>
                    อีเมล
                  </Col>
                  <Col className="h4">{userData.email}</Col>
                </Row>
                <div className="line mt-3"></div>
              </div>
            </Card.Body>
            <div className="d-flex justify-content-end mb-3">
            <Button href={`/profile/editprofile`} >แก้ไขโปรไฟล์</Button>
            </div>
          </Card>
        </Row>
      </Container>
    </div>
  );
}
