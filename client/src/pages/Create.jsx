import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Create() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [contact, setContact] = useState({});


  // Function to update 
  const createContact = (e) => {
    e.preventDefault();

    setError('');
    setMessage('');

    axios.post(`http://localhost:3000/api/v1/contactapp/contact/add`, contact)
    .then(response => {
      if (response.status === 201) {
        setMessage(response.data.message);
        
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    })
    .catch(err => { 
      setError(err);
      console.error(err);
    })
  }

  const handleInputs = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  }

  return (
    <div className="w-ful flex flex-col justify-center items-center">
      <div className="md:max-w-4xl w-11/12 flex flex-col justify-between py-8">
        <h1 className="text-3xl mb-3 font-semibold">Add Contact</h1>
        <form onSubmit={createContact} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="fullName">Full name</label>
            <input 
              type="text" 
              name="fullName" 
              required
              value={contact.fullName || ''} 
              id="fullName" 
              onChange={handleInputs} 
              className="border-black border rounded-lg p-3"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              name="email" 
              required
              value={contact.email || ''} 
              id="email" 
              onChange={handleInputs} 
              className="border-black border rounded-lg p-3"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="phone">Phone</label>
            <input 
              type="number" 
              name="phone"
              minLength={10}
              maxLength={10}
              required 
              value={contact.phone || ''} 
              id="phone" 
              onChange={handleInputs} 
              className="border-black border rounded-lg p-3"
            />
          </div>
          
          <button type="submit" className="mt-5 py-3 px-6 bg-slate-600 text-white rounded-lg text-base">Create</button>
          {message && <p className="bg-green-200 text-green-900 p-5 rounded-lg">{message}</p>}
          {error && <p className="bg-red-200 text-red-900 p-5 rounded-lg">{error}</p>}
        </form>
      </div>
    </div>
  )
}