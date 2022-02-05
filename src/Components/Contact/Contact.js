import './Contact.css';
import '../InfoWalls/InfoWalls.css';
import {firebaseF} from '../../firebase';
import {useState} from 'react'; 
import Loader from '../UI/Loader/Loader';
import LabelMessage from '../UI/LabelMessage/LabelMessage';

const sendEmail = firebaseF.httpsCallable('sendEmail');


function Contact(){
    const [sended,setSended]=useState(false);
    const [showM,setShowM] = useState(false);
    const [labelM,setlabelM] = useState("");
    const [loading,setLoading] = useState(false);
    const [contact,setContact] = useState({email:"",name:"",address:"",phoneNumber:"",comments:""});
    
    
    

    const isValid=()=>{
        if(!contact.name.match(/^[A-Z\s]*$/i) || 
        !contact.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/))
        return false;
    }
    const handleSubmit = e =>{
        setLoading(true);
        e.preventDefault();
        if(contact.phoneNumber===""||contact.name===""||contact.email===""||contact.address===""){
            setLoading(false);
            setShowM(true);
            setlabelM("Please complete all the data field!")
        }else{
            if(isValid()===false){
                setLoading(false);
               setShowM(true);
               setlabelM("There are invalid fields!"); 
            }else{
                sendEmail({
                    name:contact.name,
                    email:contact.email,
                    address:contact.address,
                    phoneNumber:contact.phoneNumber,
                    comments:contact.comments
                })
                .then(()=>{           
                    setLoading(false);
                    setContact({email:"",name:"",address:"",phoneNumber:"",comments:""});
                    setlabelM("Thanks for Submitting!");
                    setSended(true);
                    sessionStorage.setItem("sended","sended");
                })
                .catch(e=>
                    {
                        console.log(e);
                        setLoading(false);
                    })
            }
        }       
      
    }

    return (
       <section className="contact">           
           <div className="wall">             
              {
                  (!sessionStorage.getItem("sended") && !sended) ?
                  <>  
                {               
                  (
                    loading ? <Loader/>
                    :
                    <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name</label>                 
                    <input
                     id="name"
                     type="text"
                     value={contact.name} 
                     onChange={e=>
                        {
                            setContact({...contact,name:e.target.value})
                             showM && setShowM(false);
                             showM && setlabelM("");
                        }} 
                     placeholder="Your Name"/>

                    <label htmlFor="email">email</label>   
                    <input 
                    id="email"
                    type="email"
                    value={contact.email} 
                    onChange={e=>{                        
                        setContact({...contact,email:e.target.value});
                        showM && setShowM(false);
                        showM && setlabelM("");
                    }} 
                    placeholder="Email Address"/>

                    <label htmlFor="address">Address</label>
                    <input
                    id="address"
                    type="text"
                    value={contact.address}
                    onChange={e=>{
                        setContact({...contact,address:e.target.value});
                        showM && setShowM(false);
                        showM && setlabelM("");
                    }} 
                    placeholder="Enter your address"/> 

                    <label htmlFor="phone">Phone number</label>
                    <input 
                    id="pone"
                    type="tel"
                    value={contact.phoneNumber}
                    onChange={e=>{
                        setContact({...contact,phoneNumber:e.target.value});
                        showM && setShowM(false);
                        showM && setlabelM("");
                    }} 
                    placeholder="Enter your Phone number"/> 

                    <label htmlFor="comments">Do you want to add something?</label>
                    <textarea 
                    id="comments"
                    type="text"
                    value={contact.comments} 
                    onChange={e=>{
                        setContact({...contact,comments:e.target.value})
                        showM && setShowM(false);
                        showM && setlabelM("");
                    }} 
                    placeholder="Comments/Questions"/>
                     {showM && <LabelMessage colorF="red" message={labelM}/>} 
                     <button  type="submit" className="wallButton">Submit</button>                        
                </form>
                    )
              }

              </>  : <LabelMessage colorF="blue" message="Thanks for Submitting!"/>
              }            
           </div>     
          </section>
    )
}

export default Contact;