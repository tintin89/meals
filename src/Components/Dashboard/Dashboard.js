import React,{useEffect,useState} from 'react';
import './Dashboard.css';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';
import {firebaseAuth} from '../../firebase';
import {updateUserA} from '../../store/actions/actionsAuth';
import {updateSelectedR} from '../../store/actions/actionsRestaurants';
import {useDispatch} from 'react-redux';
import {updateBackdrop} from '../../store/actions/actionsUI';
import database from '../../firebase';
import Loader from '../UI/Loader/Loader';
import {tags} from '../../utility/utility';
import Backdrop from '../UI/Backdrop/Backdrop';
import Alert from '../UI/Alerts/Alert';


function Dashboard() {
    const dispatch = useDispatch();
    const [myRestaurants,setMyRestaurants] = useState([]);
    const [loading,setLoading] = useState(true);
    const [showW,setShowW] = useState(false);
    const [idSelected,setIdSelected] = useState("");
   


    const handleStartDeleteR = (id) =>{
        setShowW(true);
        setIdSelected(id);        
    }

    const handleDeleteR=()=>{  
        setLoading(true)   
        database.collection("restaurants").doc(idSelected).delete()        
        .then(()=>{
            setLoading(false);
            setShowW(false);           
            setIdSelected("");          
        })
        .catch(error=>{ 
            setLoading(false);          
            console.log(error)
        })
    }

    const handleEditar = async (id)=>{
        const restaurantRef = await database.collection("restaurants").doc(id);
        restaurantRef.get()
        .then(doc=>{
            if(doc.exists){                
                dispatch(updateSelectedR(doc.data()));
            }
        })
        .catch(error=>console.log(error))  
     } 

    useEffect(()=>{      
            
        const getRestaurants = database.collection("restaurants")
        .onSnapshot(snap=>{            
          setMyRestaurants(snap.docs.map(doc=>doc.data()).sort((a, b) => a.name.localeCompare(b.name)))
          return setLoading(false);
    });

        return ()=>{           
            getRestaurants();}

    },[])


    return (
        <div className="dashboard">
         {showW && <Backdrop show>
         {
          loading ? <Loader/> : <Alert handleDeleteR={()=>handleDeleteR()} cancelDelete={()=>setShowW(false)}/>
         }

         </Backdrop>}
           
            <div className="operationBar">
                <div className="op__add">
                <IconButton onClick={()=>{
                     dispatch(updateBackdrop(true));
                     dispatch(updateSelectedR(""));
                   
                }
                   }>
                        Add Restaurant<AddIcon/></IconButton>
                </div>  
                <div className="op__logout">
                <IconButton onClick={()=>{
                    firebaseAuth.signOut()
                    .then(()=>{
                        localStorage.removeItem("userA");
                        dispatch(updateUserA(null));                        
                    })
                }}>Log out<ExitToAppIcon/></IconButton>
                </div>              
                
            </div>
           {
               loading ? <Loader/> : 
               <table>
               <tbody>
              <tr>
                 <th>Name</th>   
                 <th>Tags</th>
                 <th>Address</th>              
                 <th>Web Site</th>
                 <th>Is favorite?</th>
                 <th>Operations</th>
              </tr>
             {
                 myRestaurants.map((r,index)=>
                 <tr style={{backgroundColor:!r.active && "salmon"}} key={index}>
                 <td style={{color:r.favorite === "Yes" && "#0050AD",width:"15%"}}>{r.name}</td>   
                 <td className="tagsTable" style={{color:r.favorite === "Yes" && "#0050AD",fontSize:"0.7rem",width:"10%"}}>
                     {
                         tags.map(t=>r[t] ? t+", " : "")
                     }
                      </td>   
                 <td style={{color:r.favorite === "Yes" && "#0050AD",width:"25%"}}>{r.address}</td>            
                 <td style={{color:r.favorite === "Yes" && "#0050AD"}}>{r.website}</td>
                 <td style={{width:"5%",textAlign:"center",color:r.favorite === "Yes" && "#0050AD"}}>{r.favorite}</td>
                 <td style={{width:"10%"}}>
                     <IconButton
                     onClick={()=>
                        {   
                            handleEditar(r.restaurantId);
                            dispatch(updateBackdrop(true));
                        }
                        }
                     ><EditIcon/></IconButton>
                     <IconButton
                     onClick={()=>handleStartDeleteR(r.restaurantId)}
                     ><DeleteForeverIcon/></IconButton>
                 </td>
              </tr>
                 )
             }
            
               </tbody>
             </table>
           }
            
        </div>
    )
}

export default Dashboard
