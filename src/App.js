import MenuExampleInverted from "./Components/MenuBar";
import Routing from "./Routing/Routing";

function App(){
    return(

        <div className="main">
            
            
            
            <div style={{ backgroundColor: 'black', height: '100vh' }}>
            <MenuExampleInverted/>
            <Routing />
            </div>
        </div>
    )
}
export default App