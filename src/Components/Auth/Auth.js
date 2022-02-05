import React,{useState} from 'react';
import './Auth.css';
import {firebaseAuth} from '../../firebase';
import { useHistory } from 'react-router';
import { useDispatch,useSelector } from 'react-redux';
import {updateUserA} from '../../store/actions/actionsAuth';
import Loader from '../UI/Loader/Loader';
import LabelMessage from '../UI/LabelMessage/LabelMessage';
import { Redirect } from 'react-router-dom';

const mapState = ({authR}) =>({
    userA:authR.userA,
    
      })

function Auth() {
    const {userA} = useSelector(mapState);
    const dispatch = useDispatch();
    const history = useHistory();
    const [form,setForm] = useState({user:"",password:""});
    const [loading,setLoading] = useState(false);
    const [isvalid,setIsvalid] = useState(true);
    const [m,setM] = useState("");


   const handleSubmit=e=>{
       e.preventDefault();
       setLoading(true);
       if(form.user===""||form.user===""){
           setLoading(false);
           setIsvalid(false);
           setM("Please complete all the fields!")
       }else{
        firebaseAuth.signInWithEmailAndPassword(form.user,form.password)
        .then(result=>{
           setLoading(false);
           localStorage.setItem("userA",JSON.stringify(result.user));
           dispatch(updateUserA(result.user));           
           history.push("/admin");
        })
        .catch(error=>{
            setLoading(false);
            setIsvalid(false);
            setM(error.message);
        })

       }
      
   }

   let protectAuth = userA!==null ? <Redirect to="/admin"/> : null;


    return (
        <div className="auth">
            {protectAuth}
          {
              loading ? <Loader/>
              :
              <form onSubmit={handleSubmit}>
              <div className="formAuth__field">
              <label htmlFor="email">User</label>
              <input
               value={form.user} 
               onChange={e=>{
                   if(!isvalid) setIsvalid(true);
                   setForm({...form,user:e.target.value});
               }} 
               type="email" 
               placeholder="user@example.com" 
               id="email"/>                
              </div>
              <div className="formAuth__field">
              <label htmlFor="password">Password</label>
              <input
              value={form.password}
              onChange={e=>{
                  if(!isvalid) setIsvalid(true);
                  setForm({...form,password:e.target.value})
              }}
               type="password" 
               placeholder="Enter your password" 
               id="password"/>
              </div>
              {!isvalid && <LabelMessage sizeF="1rem" colorF="salmon" textA="center" mTop="1rem" message={m}/>}  
              <button type="submit">LOG IN</button>            
          </form>     
          }   
        </div>
    )
}

export default Auth
