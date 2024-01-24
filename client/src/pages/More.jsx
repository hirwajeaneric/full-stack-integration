import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

const More = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [contact, setContact] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/contactapp/contact/findById?id=${params.contactId}`)
      .then(response => {
          setContact(response.data.contact);
      })
      .catch(err => { console.error(err);})
  }, [params.contactId])

  const deleteContact = (e) => {
    e.preventDefault();

    setError('');
    setMessage('');

    axios.delete(`http://localhost:3000/api/v1/contactapp/delete?id=${params.contactId}`, contact)
    .then(response => {
      if (response.status === 200) {
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
  };

  return (
    <div className="w-ful flex flex-col justify-center items-center">
      <div className="md:max-w-4xl w-11/12 flex flex-col justify-between py-8">
        {message && <p className="bg-green-200 text-green-900 p-5 rounded-lg">{message}</p>}
        {error && <p className="bg-red-200 text-red-900 p-5 rounded-lg">{error}</p>}
        <div className="flex w-full justify-between mt-5">
          <h1 className="text-3xl mb-3 font-semibold">{contact.fullName}</h1>
          <div className="flex gap-4">
            <button onClick={() => navigate(`/update/${contact._id}`)} className="py-3 px-6 bg-slate-600 text-white rounded-lg text-base">Update</button>
            <button type="button" onClick={deleteContact} className="py-3 px-6 bg-red-600 text-white rounded-lg text-base">Delete</button>
          </div>
        </div>
        <div>
          <p>Email: {contact.email}</p>
          <p>Phone: {contact.phone}</p>
          <p>Create on: {new Date(contact.createdAt).toUTCString()}</p>
          <p>Updated on: {new Date(contact.updatedAt).toUTCString()}</p>
        </div>
      </div>
    </div>
  )
}

export default More