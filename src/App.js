import MenuExampleInverted from "./Components/MenuBar";
import Routing from "./Routing/Routing";

function App(){
    return(

        <div className="main">
            
            <MenuExampleInverted/>
            
            <div style={{ backgroundColor: 'black', height: '100vh' }}>
            <Routing />
            </div>
        </div>
    )
}
export default App