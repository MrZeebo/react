import { useState, useRef, useEffect} from 'react';
import ReactDOM from 'react-dom/client';

function SendText(userString) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "https://3oombmq34h.execute-api.us-east-2.amazonaws.com/prod/getResponse", false);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(userString);
    
  return xmlhttp.responseText.substring(1, xmlhttp.responseText.length - 1);
}

function GetHistory() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "https://3oombmq34h.execute-api.us-east-2.amazonaws.com/prod/getHistory", false);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send("Greg");
  return xmlhttp.responseText;
}

function BillyHistory() {
  const historyRef = useRef(null);
  
  const [historyText, setHistoryText] = useState("TEST");
  
    // Scroll to bottom when textarea changes
  useEffect(() => {
    historyRef.current.scrollTop = historyRef.current.scrollHeight;
  }, [historyText]);
  
  useEffect(() => {
   let history = "";
  
   let jsonText = GetHistory(); 
  
   let historyFromServer = JSON.parse(jsonText);  
  
   for (let i in historyFromServer) {
   
     let item = historyFromServer[i];

     history += "YOU> " + (item.userInput == null ? "" : item.userInput) + "\nBILLY> " + item.billyResponse + "\n";
  }
  
  setHistoryText(history);
  
  }, []);
  
  return (
    <>
        <p><textarea ref={historyRef} value={historyText} rows="20" cols="100"/></p>
      
    </>
  )
}

function ChatTextBox({ textarea }) {
  const textLog = useRef(null); 

  // Scroll to bottom when textarea changes
  useEffect(() => {
    textLog.current.scrollTop = textLog.current.scrollHeight;
}, [textarea]); 


  return (
      <>    
        <p><textarea ref={textLog} value={textarea} rows="20" cols="100"/></p>      

      </>
  )
}

function UserInput({ setTextarea, textarea }) {
  const [userInput, setUserInput] = useState("");  

  const handleUserInputChange = (event) => {
    setUserInput(event.target.value)
  }
  
 const handleSubmit = (event) => {
    setTextarea(textarea + `\nYOU: ${userInput}\n` + "BILLY: " + SendText(userInput));
    setUserInput("");   
  }

  return (
      <>      
       <p>YOU: <input type="text" value={userInput} onChange={handleUserInputChange}/> <button onClick={handleSubmit}>Send</button></p>
      </>
  ) 
}

function MyForm() {  
  const [textarea, setTextarea] = useState(
    "BILLY> Hi, my name's Billy.  What's on your mind?"
  );

  return (
      <>      
       
        <ChatTextBox textarea={textarea} />
      
        <UserInput setTextarea={setTextarea } textarea={textarea} />
        
       <BillyHistory />
      </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MyForm />);