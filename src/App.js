//import css
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

//import router
import {BrowserRouter, Routes, Route} from 'react-router-dom';

//import Components
import Home from './components/home';
import ReadTask from './components/readTask';
import EditTask from './components/editTask';
import CreateTask from './components/createTask';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
       <Navbar bg="dark" data-bs-theme="dark">
        <Container>
         <Navbar.Brand href="/">Task Manager</Navbar.Brand>
         <Nav className="me-auto">
           <Nav.Link href="/">Home</Nav.Link>
           <Nav.Link href="/readTask">Daily Tasks</Nav.Link>
           <Nav.Link href="/createTask">Create Task</Nav.Link>
         </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/readTask' element={<ReadTask></ReadTask>}></Route>
        <Route path='/createTask' element={<CreateTask></CreateTask>}></Route>
        <Route path='/editTask/:id' element={<EditTask></EditTask>}></Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
}


export default App;
