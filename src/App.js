import LoginPage from "./Components/Login";
import MenuExampleInverted from "./Components/MenuBar";
import Routing from "./Routing/Routing";

function App(){
    return(

        <div className="main">
            
            <MenuExampleInverted/>
            <Routing />
        </div>
    )
}
export default App