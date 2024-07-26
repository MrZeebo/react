import { useState, useRef} from 'react';
import ReactDOM from 'react-dom/client';

function SendText(userString) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "https://3oombmq34h.execute-api.us-east-2.amazonaws.com/prod/getResponse", false);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(userString);
    
  return xmlhttp.responseText.substring(1, xmlhttp.responseText.length - 1);
}

function MyForm() {
  const textLog = useRef(null);
  
  const [textarea, setTextarea] = useState(
    "The content of a textarea goes in the value attribute"
  );

  const [userInput, setUserInput] = useState("");
  
  const handleChange = (event) => {
    setTextarea(event.target.value)
  }
  
  const handleUserInputChange = (event) => {
    setUserInput(event.target.value)
  }
  
 const handleSubmit = (event) => {
    setTextarea(textarea + `\nYOU: ${userInput}\n` + "BILLY: " + SendText(userInput));
    setUserInput("");
    textLog.current.scrollTop = textLog.current.scrollHeight;
  }
  


  return (
      <>    
        <p><textarea ref={textLog} value={textarea} onChange={handleChange} rows="20" cols="100"/></p>
      
       <p>YOU: <input type="text" value={userInput} onChange={handleUserInputChange}/> <button onClick={handleSubmit}>Send</button></p>
      </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MyForm />);