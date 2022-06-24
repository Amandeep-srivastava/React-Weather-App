import React from "react";
import "./style.css";
import Wheather from "./wheather";

const Temp = () => {
  const[Searchvalue,setsearchvalue]=React.useState("agra");
  const[finaltempstate,setfinaltempstate]=React.useState({});
  const getweatherinfo= async ()=>{
    try{
    let url ="https://api.openweathermap.org/data/2.5/weather?q="+`${Searchvalue}`+"&units=metric"+"&appid=87ac148ffc1de9b3422e824cfab04a6f";
    let res=await fetch(url);
    let data=await res.json();
    const {temp,humidity,pressure}=data.main;
    const{main:weathermode}=data.weather[0];
    const{name}=data;
    const{speed}=data.wind;
    const{country,sunset}=data.sys;
    const fullweatherinfo={
       temp,humidity,weathermode,name,speed,pressure,country,sunset,
    };
    setfinaltempstate(fullweatherinfo);
    
  }
  catch(error){
    console.log(error);
  }
};
  React.useEffect(() => {
     getweatherinfo();
  }, []);
  

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="🔍Search your city"
            id="search"
            className="searchTerm"
            autoFocus
            value={Searchvalue}
            onChange={(event)=>setsearchvalue(event.target.value)}
          />
          <button className="searchButton" type="button" onClick={getweatherinfo}>
            search
          </button>
        </div>
      </div>
      <Wheather finaltempstate={finaltempstate}/>
      
    </>
  );
};

export default Temp;
