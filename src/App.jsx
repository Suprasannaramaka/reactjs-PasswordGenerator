import { useState , useCallback, useEffect,useRef } from 'react'

function App() {
const[length , setLength] = useState(8)
const[numberAllowed , setNumberAllowed] = useState(false);
const[charAllowed , setCharAllowed] = useState(false)
const [password , setPassword] = useState("")
//useRef hook
const passwordRef = useRef(null)
const passwordGenerator = useCallback(() => {
 let pass = ""
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if(numberAllowed) str += "0123456789"
  if(charAllowed) str += "!@#$%^&*[]{}+_-*&"
  for(let i=1;i<=length;i++)
  {
    let char = Math.floor(Math.random() * str.length + 1)
    pass += str.charAt(char)
  }
  setPassword(pass)
},[length,numberAllowed ,charAllowed])
const copyPasswordToClipboard = useCallback(() => {
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0,5);
  window.navigator.clipboard.writeText(password)
}, [password])
useEffect(() =>
{
  passwordGenerator()
},[length,numberAllowed,charAllowed,passwordGenerator])
  return (
    <>
<div className="w-full max-w-md px-4 mx-auto my-10 text-orange-500 bg-gray-700 rounded-lg shadow">
  <h1 className='my-5 text-center text-white'>PasswordGenerator</h1>
  <div className="flex mb-5 overflow-hidden rounded-lg shadow"><input type="text" value={password} className='outline-none w-full  py-4  px-5 placeholder="Password" ref={passwordRef} read-only'/>
 <button onClick={copyPasswordToClipboard} className="px-5 py-0 text-white bg-blue-800 outline-none shrink-0">Copy</button>
</div>
<div className="flex text-sm gap-x-2">
 <input type="range" min={6} max={50} className='cursor-pointer' value={length} onChange={(e) => {setLength(e.target.value)}}/>
 <label>Length: {length}</label>
<div className="flex items-center gap-x-1">
  <input type="checkbox" defaultChecked = {numberAllowed} id = "numberInput" onChange={() =>{setNumberAllowed((prev) => !prev);  
  }
}
/>
<label htmlFor="numberInput">Numbers</label>
</div>
<div className="flex items-center gap-x-1">
  <input type="checkbox" defaultChecked = {charAllowed} id = "charInput" onChange={() =>{setCharAllowed((prev) => !prev);  
  }
}
/>
<label htmlFor="numberInput">Characters</label>
</div>
</div> 
</div>
    </>
  )
}

export default App
