import { Button, Col, Container, Form, Row } from "react-bootstrap";

export default function SearchBar() {
  return (
    <Container className="mt-5">
      <Row>
        <Col sm={4}>
          <Form className="d-flex">
            <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
            <Button>Search</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
