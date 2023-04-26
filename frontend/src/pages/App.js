import Login from '../components/Login';
import Welcome from '../components/welcome';
import '../styles/containerLogin.css';

function App() {

  return (
    <div className='containerLogin'>
      <Welcome></Welcome>
      <Login></Login>
    </div>
    
  );
}

export default App;
