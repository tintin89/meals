import axios from 'axios';
import american from '../assets/american.png';
import bakery from '../assets/bakery.png';
import barb from '../assets/barb.png';
import chickenFried from '../assets/chickenFried.png';
import chinesse from '../assets/chinesse.png';
import cuban from '../assets/cuban.png';
import deli from '../assets/deli.png';
import fastFood from '../assets/fastFood.png';
import fineDining from '../assets/fineDining.png';
import hamb from '../assets/hamb.png';
import indian from '../assets/indian.png';
import italian from '../assets/italian.png';
import jamaican from '../assets/jamaican.png';
import japan from '../assets/japan.png';
import mediterranean from '../assets/mediterranean.png';
import mexican from '../assets/mexican.png';
import pizza from '../assets/pizza.png';
import sandwich from '../assets/sandwich.png';
import seafood from '../assets/seafood.png';
import sushi from '../assets/sushi.png';
import thai from '../assets/thai.png';
import wings from '../assets/wings.png';
import subssandwiches from '../assets/subssandwiches.png';






export const filterbyTags = (elem,mytags)=>{
    let result=false;
    for(let key in elem){
        if(mytags.includes(key) && elem[key]===true){
            result = true;
        }
    }
  
    return result;
}

export const getAddress=(placeId)=>{

    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&language=en&key=AIzaSyBJegJe8F7HQGvBTX33jcb-2OOD2MI7QOE`)
    .then(response=>{
     
       return response.data.results[0].formatted_address;
    })
    .catch(error=>{
        console.log(error);
    })   
   }

export const removeDuplicate=(arr)=>{
   let temp=[];
   arr.forEach(element => {
      if(!temp.find(e=>e.name===element.name))
         temp.push(element) 
   });
   return temp
}
export const arraySplited = (arr,chunkSize) =>{
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
}   

export const tags = [
    {
        name:"American",
        picture:american
    },
    {
        name:"Bar-B-Que",
        picture:barb
    },
    {
        name:"Burgers",
        picture:hamb
    },
    {
        name:"Chicken Sandwiches",
        picture:sandwich
    },    
    {
        name:"Chinese",
        picture:chinesse
    },
    {
        name:"Cuban",
        picture:cuban
    },
    {
        name:"Deli",
        picture:deli
    },
    {
        name:"Fast Food",
        picture:fastFood
    },
    {
        name:"Fine Dining",
        picture:fineDining
    },
    {
        name:"Fried Chicken",
        picture:chickenFried
    },
    {
        name:"Indian",
        picture:indian
    },
    {
        name:"Italian",
        picture:italian
    },
    {
        name:"Jamaican",
        picture:jamaican
    },
    {
        name:"Japanese",
        picture:japan
    },
    {
        name:"Mediterranean",
        picture:mediterranean
    },
    {
        name:"Mexican",
        picture:mexican
    },
    {
        name:"Pizza",
        picture:pizza
    },
    {
        name:"Seafood",
        picture:seafood
    },
    {
        name:"Specialty/Bakery",
        picture:bakery
    },
    {
        name:"Subs/Sandwich",
        picture:subssandwiches
    },
    {
        name:"Sushi",
        picture:sushi
    },
    {
        name:"Thai",
        picture:thai
    },
    {
        name:"Wings",
        picture:wings
    }
    ];

export const neighborhoods = [
    {
        name:"Alamo Heights",
        crds:{
            lat:29.484381054940666,
            lng:-98.4684685367536
        }
    },
    {
        name:"Alamo Ranch",
        crds:{
            lat:29.488471484969892,
            lng:-98.72170232672906
        }
    },
    {
        name:"Helotes",
        crds:{
            lat:29.568951702670244,
            lng:-98.69904373296275
        }
    },
    {
        name:"Leon Valley",
        crds:{
            lat:29.496184556196546,
            lng:-98.61726953223778
        }
    },
    {
        name:"Medical Center",
        crds:{
            lat:29.513664305621774,
            lng:-98.57832741801708
        }
    },
    {
        name:"Castle Hills",
        crds:{
            lat:29.5244480635084,
            lng:-98.51986636422087
        }
    },
    {
        name:"The Rim",
        crds:{
            lat:29.611296423818047,
            lng:-98.59943108380065
        }
    },   
    {
        name:"Shavano Park",
        crds:{
            lat:29.584221047956927,
            lng:-98.55375675779094
        }
    },   
    {
        name:"UTSA Area",
        crds:{
            lat:29.584137197493583,
            lng:-98.61904662089889
        }
    },
    {
        name:"Balcones Heights",
        crds:{
            lat:29.488473195919333,
            lng:-98.55225988447226
        }
    },
    {
        name:"Stone Oak",
        crds:{
            lat:29.636957125555618,
            lng:-98.48626480329656
        }
    },
    {
        name:"Windcrest",
        crds:{
            lat:29.515912973911202,
            lng:-98.38093683411502
        }
    },
    {
        name:"Live Oak",
        crds:{
            lat:29.558468855892244,
            lng:-98.337898010574
        }
    },
    {
        name:"Northstar Mall",
        crds:{
            lat:29.519162062346698,
            lng:-98.49690315107777
        }
    },
    {
        name:"Downtown",
        crds:{
            lat:29.424278566699016,
            lng:-98.49235874255916
        }
    },
    {
        name:"Lackland AFB",
        crds:{
            lat:29.387836157878816,
            lng:-98.61976302558347
        }
    },
    {
        name:"Heritage",
        crds:{
            lat:29.428793046083655,
            lng:-98.67813221185855
        }
    },
    {
        name:"Sea World",
        crds:{
            lat:29.463096026041214,
            lng:-98.70217952927906
        }
    },
    {
        name:"Brooks City Base",
        crds:{
            lat:29.346081779109802,
            lng:-98.44501023401514
        }
    },
    {
        name:"Monte Vista",
        crds:{
            lat:29.46007028553969,
            lng:-98.49180200665575
        }
    },
    {
        name:"South Park Mall",
        crds:{
            lat:29.35841476694379,
            lng:-98.53149279489946
        }
    },
    {
        name:"Rolling Oaks Mall",
        crds:{
            lat:29.59738475828106,
            lng:-98.35065341657562
        }
    }
]



