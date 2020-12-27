import {Card, Container, Row, Col} from "react-bootstrap";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import tutor_logo from "../../assets/images/logo/tutor-logo.png";
import student_logo from "../../assets/images/logo/student-logo.png";
import SelectStudent from "./SelectStudent.js";
import "./Questionaire.css";
import { useState } from "react";


export default function Questionaire() {
    const [role, setRole] = useState("");
    let roleSelect;
    if(role === 'student'){
      roleSelect = <SelectStudent />
    } else if(role === 'tutor'){
      roleSelect = <h1>SelectTutor Component</h1> 
    }

    return(
    <Container>
        <Row>
            <Col  md={4}>
                <Card 
                  style={{ width: '18rem', cursor: 'pointer' }}
                  onClick={() => setRole('tutor')}
                >
                  <Card.Img variant="top" src={tutor_logo} style={{width: "200px"}}/>
                  <Card.Body style={{color:"black"}}>
                    <Card.Title>Become a Tutor</Card.Title>
                    <Card.Text>
                      Create your own courses and get paid by teaching other 
                    </Card.Text>
                  </Card.Body>
                </Card>
            </Col>
            <Col md={{ span: 4, offset: 4 }}>
                <Card 
                  style={{ width: '18rem', cursor: 'pointer' }}
                  onClick={() => setRole('student')}
                  >
                  <Card.Img variant="top" src={student_logo} style={{width: "200px"}}/>
                  <Card.Body style={{color:"black"}}>
                    <Card.Title>Become a Student</Card.Title>
                    <Card.Text >
                      Join course and become a pro with low costs  
                    </Card.Text>
                  </Card.Body>
                </Card>            
            </Col>
        </Row>
        <Container>
          {roleSelect}
        </Container>
     
      </Container>

    )
}