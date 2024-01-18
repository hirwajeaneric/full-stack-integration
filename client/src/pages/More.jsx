import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

const More = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [contact, setContact] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/contactapp/findById?id=${params.contactId}`)
      .then(response => {
          setContact(response.data.contact);
      })
      .catch(err => { console.error(err);})
  }, [params.contactId])

  return (
    <div className="w-ful flex flex-col justify-center items-center">
      <div className="md:max-w-4xl w-11/12 flex flex-col justify-between py-8">
        <div className="flex w-full justify-between">
          <h1 className="text-3xl mb-3 font-semibold">{contact.fullName}</h1>
          <button onClick={() => navigate(`/update/${contact._id}`)} className="py-3 px-6 bg-slate-600 text-white rounded-lg text-base">Update</button>
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