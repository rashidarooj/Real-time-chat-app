// import socketIO from "socket.io-client";
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Join from "./component/Join/Join";
import Chat from "./component/Chat/Chat"


// const ENDPOINT = 'http://localhost:4500/';
// const socket = socketIO(ENDPOINT, { transports: ['websocket'] });

function App() {

  // socket.on("connect", ()=>{

  // })

  return (
    <>
    
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Join />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </BrowserRouter>
      </div>

    </>

  );
}

export default App;
