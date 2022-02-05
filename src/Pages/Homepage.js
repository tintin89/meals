import '../App.css'
import GetRestaurantsContainer from '../Components/GoogleMapsContainer/GetRestaurantsContainer';
import WhatIs from '../Components/WhatIs/WhatIs';
import ChooseSection from '../Components/ChooseSection/ChooseSection';
import {useSelector} from 'react-redux';
import Loader from '../Components/UI/Loader/Loader';

const mapState = ({uiR}) =>({
    loading:uiR.loading
    })


function Homepage(){
    const {loading} = useSelector(mapState);
return (
    loading ?
    <div className="loadingPage">
    <Loader/>
    </div>  :
    <>
    <GetRestaurantsContainer/>
    <main className="mainHome">
    <ChooseSection/>    
    <WhatIs/>
    </main>    
   </>
)
}


export default Homepage;