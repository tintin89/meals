import './PlacesAutocomplete.css'
import usePlacesAutocomplete, {getGeocode, getLatLng,} from "use-places-autocomplete";
import {Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption} from "@reach/combobox";
import "@reach/combobox/styles.css";
import {useDispatch,useSelector} from 'react-redux';
import {updateCoords} from '../../store/actions/actionsRestaurants';
import { updateSelectedC,updateTyping,updateLoadingR } from '../../store/actions/actionsUI';


const mapState = ({uiR}) =>({
   typing:uiR.typing
  })
  
  const PlacesAutocomplete = (props) => {
    const {typing} = useSelector(mapState);
    const dispatch = useDispatch();
    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
    } = usePlacesAutocomplete({
      
      debounce: 300,
    });
   
  
  
    const handleInput = (e) => {        
      // Update the keyword of the input element
      if(e.target.value===""){
        dispatch(updateSelectedC(false));
      }
      setValue(e.target.value);    
      if(!typing){
        dispatch(updateTyping(true));
        props.changeSM(false);
      } 
    };
  
    const handleSelect =
      ({ description }) =>
      () => {
        // When user selects a place, we can replace the keyword without request data from API
        // by setting the second parameter to "false"
        setValue(description, false);
        clearSuggestions();
        dispatch(updateSelectedC(true));  
        dispatch(updateLoadingR(true));
       
  
        // Get latitude and longitude via utility functions
        getGeocode({ address: description })
          .then((results) => getLatLng(results[0]))
          .then(({ lat, lng }) => {            
            dispatch(updateCoords({lat,lng}));           
                      
          })
          .catch((error) => {
            console.log("Error: ", error);
          });
      };
  
    const renderSuggestions = () =>{
     const suggestions = data.map((suggestion) => {
        const {
          place_id,
          structured_formatting: { main_text, secondary_text },
        } = suggestion;
  
        return (         
           <ComboboxOption 
           key={place_id} 
           onClick={handleSelect(suggestion)}
           value={main_text+','+ secondary_text}
            />);
       
      });
      return (
        <>
        {suggestions}
        <li className="logo">
          <img
            src="https://developers.google.com/maps/documentation/images/powered_by_google_on_white.png"
            alt="Powered by Google"
          />
        </li>
        </>
      )

    }
     
  
    return (
         <Combobox onSelect={handleSelect} aria-labelledby="demo">
      <ComboboxInput
       placeholder="Enter your address" 
       value={value} 
       onChange={handleInput} 
       disabled={!ready}  
       style={{maxWidth:"60%", width: "80%",borderRadius:"3px",border:"none",outline:"none" }} />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&         
           renderSuggestions()}        
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
      
    );
  };


  export default PlacesAutocomplete;