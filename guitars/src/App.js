import logo from './logo.svg';
import './index.css';
import Card  from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';


import './App.css';

function App() {
  return (
    <div  className="wrapper">
    <div className="wrapper">
    <Card style={{ width: '18rem' }}>
      <Card.Img width="20%" height="20%" src="https://musicgoround.imgix.net/images/40015-S000265601-2?auto=compress,format&fit=clip&w=800"/>
      <Card.Body>
        <Card.Title>Test</Card.Title>
        <Card.Text>Test</Card.Text>
      </Card.Body>
    </Card>
    </div>

    <div className="wrapper">
    <Card style={{ width: '18rem' }}>
      <Card.Img width="20%" height="20%" src="https://musicgoround.imgix.net/images/40015-S000265601-2?auto=compress,format&fit=clip&w=800"/>
      <Card.Body>
        <Card.Title>Test</Card.Title>
        <Card.Text>Test</Card.Text>
      </Card.Body>
    </Card>
    </div>

    </div>
    
  );
}

export default App;
