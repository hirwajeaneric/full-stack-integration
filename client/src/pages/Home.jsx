import { useEffect, useState } from "react"
import ContactComponent from "../components/ContactComponent"
// import axios from 'axios';

const Home = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/v1/contactapp/list", {
          method: "GET",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            setContacts(data.contacts);
            console.log(data);
          })
          .catch((error) => console.log(error));
    }, []);
    

    return (
        <div className="w-ful flex flex-col justify-center items-center">
            <div className="md:max-w-4xl w-11/12 flex flex-col justify-between py-8">
                <div className="flex w-full justify-between">
                    <h1 className="text-2xl">Welcome to your contacts</h1>
                    <button className="py-4 px-3 bg-black text-white rounded-lg text-base">Add New</button>
                </div>
                <div className="pt-10 flex flex-col justify-start items-start gap-4">
                    {contacts.length === 0 && <p>No contacts yet</p>}
                    {contacts.length !== 0 && contacts.map(contact => {
                        <ContactComponent key={contact._id} contact={contact}/>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Home