import React from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import outlookImg from '../static/img/about/outlook.webp';
import ryanImg from '../static/img/about/ryandai.webp';
import johnImg from '../static/img/about/johnhardy.webp';
import mikeImg from '../static/img/about/mikesmith.webp';

const About = () => {
   return (
     <Container style={{ marginTop: '20px' , minHeight:"80vh" }}>
       <Row className="justify-content-md-center">
         <Col md={8}>
           <h2 className="text-center mb-4">關於 Duck Coffee</h2>
           <Image src={outlookImg} fluid rounded className="mb-4" />
           <p>
             Duck Coffee 成立於 2021 年，我們致力於為咖啡愛好者提供最高品質的咖啡體驗。 我們的咖啡豆均由專業團隊精心挑選，確保每一杯咖啡都能帶給您無與倫比的味覺享受。
           </p>
           <p>
             我們的團隊由一群充滿熱情的咖啡師、烘焙師和設計師組成。 我們共同的目標是打造一個既舒適又時尚的空間，讓每位顧客都能在這裡找到屬於自己的寧靜。
           </p>
         </Col>
       </Row>
       <Row className="mt-4 mb-5">
         <h3 className="text-center mb-4">我們的團隊</h3>
         <Col md={4}>
           <Card>
             <Card.Img variant="top" src={ryanImg} />
             <Card.Body>
               <Card.Title>Ryan DAI</Card.Title>
               <Card.Text>
                 首席咖啡師，擁有超過 10 年的咖啡製作經驗，精通各種咖啡烹飪技巧。
               </Card.Text>
             </Card.Body>
           </Card>
         </Col>
         <Col md={4}>
           <Card>
             <Card.Img variant="top" src={johnImg} />
             <Card.Body>
               <Card.Title>John Hardy</Card.Title>
               <Card.Text>
                 資深烘焙師，負責挑選和烘焙咖啡豆，確保每一顆豆子都達到最佳品質。
               </Card.Text>
             </Card.Body>
           </Card>
         </Col>
         <Col md={4}>
           <Card>
             <Card.Img variant="top" src={mikeImg} />
             <Card.Body>
               <Card.Title>Mike Smith</Card.Title>
               <Card.Text>
                 室內設計師，負責營造舒適和諧的咖啡館環境，為顧客提供最佳體驗。
               </Card.Text>
             </Card.Body>
           </Card>
         </Col>
       </Row>
     </Container>
   );
};

export default About;