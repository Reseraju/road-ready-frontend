import LoginPage from "./Components/Login";
import MenuExampleInverted from "./Components/MenuBar";
import Home from './Components/Home';
import Routing from "./Routing/Routing";

function App(){
    return(

        <div className="main">
            
            <MenuExampleInverted/>
            <Routing />
            <Home />

        </div>
    )
}
export default App