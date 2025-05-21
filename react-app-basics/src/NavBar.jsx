import { Navbar, Nav, Container } from "react-bootstrap";
export default function NavBar() {
    return (
        <Navbar bg="primary" data-bs-theme="dark" expand="md">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        src="https://pluspng.com/img-png/react-logo-png-react-js-logo-history-design-history-and-evolution-5500x3094.png"
                        style={{ height: 50, width: 90 }}
                        alt="React Logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar-nav" />
                <Navbar.Collapse id="main-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/register">Register</Nav.Link>
                        <Nav.Link href="/employees">All Employees</Nav.Link>
                        <Nav.Link href="/admin">Admin Panel</Nav.Link>
                        <Nav.Link href="/hr">HR Panel</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}