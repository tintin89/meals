import React,{useState,useEffect} from 'react';
import './AddRestaurant.css';
import {useDispatch} from 'react-redux';
import {updateBackdrop} from '../../../store/actions/actionsUI';
import {updateSelectedR} from '../../../store/actions/actionsRestaurants';
import database from '../../../firebase';
import {storage} from '../../../firebase';
import Loader from '../../UI/Loader/Loader';
import LabelMessage from '../../UI/LabelMessage/LabelMessage';
import {tags} from '../../../utility/utility';
import {useSelector} from 'react-redux';

const mapState=({restaurantsR})=>({
    selectedR:restaurantsR.selectedR
})




function AddRestaurant() {   
    const dispatch = useDispatch();
    const {selectedR} = useSelector(mapState);
    const [file,setFile] = useState("");
    const [urlPreview,setUrlPreview]=useState("");
    const [restaurant,setRestaurant] = useState(
        {
            name:"",
            address:"",
            website:"",
            favorite:"No",
            active:true,
            "American":false,
           "Bar-B-Que":false,
            "Burgers":false,
            "Chicken Sandwiches":false,
            "Chinese":false,
            "Cuban":false,
            "Deli":false,
            "Fast Food":false,
            "Fine Dining":false,
            "Fried Chicken":false,
            "Indian":false,
            "Italian":false,
            "Jamaican":false,
            "Japanese":false,
            "Mediterranean":false,
            "Mexican":false,
            "Pizza":false,
            "Seafood":false,
            "Specialty/Bakery":false,
            "Subs/Sandwich":false,
            "Sushi":false,
            "Thai":false,
            "Wings":false
        });
    const [errorM,seterrorM] = useState("");
    const [loadgin,setLoading] = useState(false);

  useEffect(()=>{
      if(selectedR!==""){
         setRestaurant(selectedR);
      }

  },[selectedR])


 

  const handleFile = (e) =>{      
    if (file!=="") {      
        setFile("");
        setUrlPreview("");            
      }
      const types = ["image/png", "image/jpeg"];
      
      if(e.target.files.length>0){
          seterrorM(""); 
          if(types.includes(e.target.files[0].type)){           
           const newFile = e.target.files[0];
           setFile(newFile);  
           setUrlPreview(URL.createObjectURL(e.target.files[0])); 
          }else {seterrorM("There are wrong fields!")}      
         
      }else{
        console.log("entro al else")
        seterrorM("There are wrong fields!")
      }
      

  }
 

    const handleSubmitR = async e =>{
        e.preventDefault();
        setLoading(true);
        let restaurantRef;
        if(restaurant.name === "" || restaurant.website === "" || restaurant.address===""){
            seterrorM("PLease complete all data fields!");
            setLoading(false);
        }else{
            try{
             if(selectedR===""){
              restaurantRef = await database.collection("restaurants").doc();

             }else{
                restaurantRef = await database.collection("restaurants").doc(selectedR.restaurantId);
             }
            
             const restaurantId = await restaurantRef.id;
             restaurantRef.set({
                 restaurantId,
                 name:restaurant.name,
                 address:restaurant.address,
                 website:restaurant.website,
                 favorite:restaurant.favorite,
                 active:restaurant.active,
                 "American":restaurant["American"],
                 "Bar-B-Que":restaurant['Bar-B-Que'],
                  "Burgers":restaurant["Burgers"],
                  "Chicken Sandwiches":restaurant["Chicken Sandwiches"],
                  "Chinese":restaurant["Chinese"],
                  "Cuban":restaurant["Cuban"],
                  "Deli":restaurant["Deli"],
                  "Fast Food":restaurant["Fast Food"],
                  "Fine Dining":restaurant["Fine Dining"],
                  "Fried Chicken":restaurant["Fried Chicken"],
                  "Indian":restaurant["Indian"],
                  "Italian":restaurant["Italian"],
                  "Jamaican":restaurant["Jamaican"],
                  "Japanese":restaurant["Japanese"],
                  "Mediterranean":restaurant["Mediterranean"],
                  "Mexican":restaurant["Mexican"],
                  "Pizza":restaurant["Pizza"],
                  "Seafood":restaurant["Seafood"],
                  "Specialty/Bakery":restaurant["Specialty/Bakery"],
                  "Subs/Sandwich":restaurant["Subs/Sandwich"],
                  "Sushi":restaurant["Sushi"],
                  "Thai":restaurant["Thai"],
                  "Wings":restaurant["Wings"]
             },{merge:true}).then(async ()=>{
                setRestaurant({
                    name:"",
            address:"",
            website:"",
            favorite:"No",
            active:true,
            "American":false,
           "Bar-B-Que":false,
            "Burgers":false,
            "Chicken Sandwiches":false,
            "Chinese":false,
            "Cuban":false,
            "Deli":false,
            "Fast Food":false,
            "Fine Dining":false,
            "Fried Chicken":false,
            "Indian":false,
            "Italian":false,
            "Jamaican":false,
            "Japanese":false,
            "Mediterranean":false,
            "Mexican":false,
            "Pizza":false,
            "Seafood":false,
            "Specialty/Bakery":false,
            "Subs/Sandwich":false,
            "Sushi":false,
            "Thai":false,
            "Wings":false
                });
                    if(file!==""){
                        
                        const urlR = new Promise ((resolve,reject)=>{
                            const up = storage
                            .ref()
                            .child(`pictures/${restaurantId}/${file.name}`)
                            .put(file);
                            up.on("state_changed",
                            (snapshot)=>{
                                /*
                                const progress = Math.round(
                                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                                  );
                                  console.log("progress:", progress);
                                  */
                            },
                            reject,
                            ()=>{
                                up.snapshot.ref.getDownloadURL().then(url=>{
                                    resolve(url)
                                })
                            }
                            )
                        })
                    urlR.then((result)=>{
                        restaurantRef.update({
                            pictureUrl:result
                        })                   
                        .then(()=>{
                            setLoading(false);                       
                            dispatch(updateBackdrop(false));
                            dispatch(updateSelectedR(""));
                        })
                    })
                    .catch(error=>{
                        setLoading(false);
                        seterrorM(error.message);
                    })
                    } else{
                           setLoading(false);                       
                            dispatch(updateBackdrop(false));
                            dispatch(updateSelectedR(""));

                    }        
         
               
             })
            
            }
            catch(error){
               console.log(error);
               setLoading(false);
            }
          
        }
        
    }



    return (
       loadgin ? <Loader/> : 
       <form onSubmit={handleSubmitR} className="addRestaurant">
       <div className="up__form">
       <div className="addR__field Name">
           <label htmlFor="nameR">Restaurant's Name</label>
           <input
            type="text"
            name="nameR"
            id="nameR" 
            placeholder="Enter the Restaurant's Name"
            value={restaurant.name}
            onChange={e=>{
                seterrorM("");
                setRestaurant({...restaurant,name:e.target.value});
            }}
            />
       </div>

       <div className="addR__field Address">
           <label htmlFor="address">Restaurant's Address</label>
           <input
            type="text"
            name="address"
            id="address" 
            placeholder="Enter the Restaurant's Address"
            value={restaurant.address}
            onChange={e=>{
                seterrorM("");
                setRestaurant({...restaurant,address:e.target.value});
            }}
            />
       </div>
        </div>
       <div className="up__form">
       <div className="addR__field Website">
           <label htmlFor="website">Website</label>
           <input
            type="url"
            id="website"
            placeholder="Enter the Restaurant's Website"
            name="website"
            value={restaurant.website}
            onChange={e=>{
                seterrorM("");
                setRestaurant({...restaurant,website:e.target.value})
            }}
            />
       </div>
       <div className="uploadPicture">
               <label htmlFor="picture">Restaurant's Logo</label>
               <input onChange={handleFile} id="picture" type="file"/> 
               <div className="logo__show">
                 {file!=="" &&  <img alt="logoR" src={urlPreview}/>}
               </div>
           </div>

       </div>
       <div className="addR__endField">
          
       <div className="addR__field__select">
           <label htmlFor="isfavorite">is Favorite?</label>
           <select id="isfavorite" value={restaurant.favorite} onChange={e=>{
                seterrorM("");
               setRestaurant({...restaurant,favorite:e.target.value})
           }}>
               <option value="Yes">Yes</option>
               <option value="No">No</option>
           </select>            
       </div>
       <div className="addR__field__switch">
          Disable / Activate
           <div className="addR__field__switch">
                 <label className="switch">
                     <input
                      type="checkbox"
                      id="isActive"
                      name="isActive" 
                      checked={restaurant.active}
                      onChange={e=>{
                          seterrorM("");
                          setRestaurant({...restaurant,active:e.target.checked ? true : false})
                      }}                         
                      />
                     <div className="slider"></div>
                   </label>                     
                   </div>
                   </div>

       </div>
       <h4>Tags:</h4>
       <div className="addR__tags">
           
         {
             tags.map((t,index)=>(
                <div key={index} className="tag">                 
                 <input id={t.name} name={t.name} checked={restaurant[t.name]} type="checkbox"
                  onChange={e=>setRestaurant(prevState=>({...prevState,[e.target.name]:e.target.checked ? true : false}))}/>
                  <label htmlFor={t.name}>{t.name}</label>
                </div>
             ))
         }

       </div>
       {errorM!=="" && <LabelMessage sizeF="1rem" colorF="red" message={errorM}/>}
       <div className="addR__buttons">
       <button type="submit">{selectedR ? "Update" : "Add +"}</button>
       <button 
       onClick={()=>dispatch(updateBackdrop(false))} 
       type="button" 
       style={{backgroundColor:"lightgray",color:"#0050AD",fontWeight:"bold"}}>Cancel</button>    
       </div>
       
       
   </form>
    )
}

export default AddRestaurant
