import MenuExampleInverted from "./Components/MenuBar";
import Routing from "./Routing/Routing";
import './App.css';

function App(){
    return(
        
        <div className="main">
            <div style={{ backgroundColor: 'black', height: '100vh', flex: 1, overflowY: 'auto'}}>
            <MenuExampleInverted/>
            <Routing />
            </div>
        </div>
    )
}
export default App