import * as React from 'react';
import '../../../tailwind.css';
import { ITestProps } from './ITestProps';
import { MSGraphClient} from '@microsoft/sp-http';
import { useEffect } from "react";
import { useState } from "react";
import  UI  from './UI';

export default function Test({context}: ITestProps) {
  //states
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAllUsers, setshowAllUsers] = useState(false);

   //fetch all users when the page loads
   useEffect(() => {
    setshowAllUsers(false);
    context.msGraphClientFactory
      .getClient()
      .then((client: MSGraphClient) => {
        client
          .api("users")
          .version("v1.0")
          .select("displayName, mail, id, jobTitle")
          .get((err, res) => {
            if (err) {
              //log error in console
              console.error("MSGraphAPI Error" + err);
              return;
            }
            //set users data
           setUsers(res.value);
           //log data in console
           console.log(res.value);  
          });
      });
      //run the function again if the state changes
  }, [showAllUsers]);

  //search for single user or letter
  const searchUser = (e) => {
    e.preventDefault();
    console.log(searchTerm);
    //search for a user if there is a search term
    if(searchTerm){
      context.msGraphClientFactory
      .getClient()
      .then((client: MSGraphClient) => {
        client
          .api("users")
          .version("v1.0")
          .filter(`startswith(displayName, '${searchTerm}')`)
          .get((err, res) => {
            if (err) {
              console.error("MSGraphAPI Error");
              console.error(err);
              return;
            }
            //set users 
           setUsers(res.value);
            //reset search term
          setSearchTerm("");
          });
      });
    } else{
      //set state to true when you remove search term
      setshowAllUsers(true);
    }
  };

  //get search term value
  const handleChange = (e) =>{
    //set search term
    setSearchTerm(e.target.value);
  };
  
  return (
    <div className="app"> 
      <h1 className='text-2xl text-center'>Users</h1>
     <form onSubmit={searchUser}>
       <div className="mt-4 mb -4 w-full">
       <input type="text" placeholder='Search for user' onChange={handleChange} value={searchTerm} className="bg-gray-800 text-gray-300 p-2 rounded border-2 border-none"/>
       </div>
     </form>
     {users && (
       users.map((user) => (
        <UI key={user.id} displayName={user.displayName} mail={user.mail} jobTitle={user.jobTitle}/>
       ))

     )}
     {users.length === 0 && (
       <div className="error-message">
         <h2 className='text-2xl text-red-600'>User doesn't exist</h2>
       </div>
     )}
    </div>
  )
}

