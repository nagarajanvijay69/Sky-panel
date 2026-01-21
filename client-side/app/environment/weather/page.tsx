'use client'

import axios from 'axios'
import { Search, MapPin, Sun, Droplet, Wind, Sunrise, Sunset } from 'lucide-react'
import { useLayoutEffect, useRef, useState } from 'react'

const Weather = () => {

     const [city, setCity] = useState('Tirunelveli');
     const [temp, setTemp] = useState(24.3);
     const [feels_like, setFeels_like] = useState(0);
     const [humidity, setHumidity] = useState("68");
     const [sunrise, setSunrise] = useState("8:57:51 am");
     const [sunset, setSunset] = useState("8:01:39 pm");
     const [discription, setDiscription] = useState("scattered clouds");
     const [speed, setSpeed] = useState(0);
     const [name, setName] = useState(city);
     const [ai, setAi] = useState("");
     const [load, setLoad] = useState(false);


     const getData = async () => {
          setLoad(true);
          const { data, success } = (await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URI}/weather/${city}`)).data;
          if (!success) {
               setLoad(false);
               return alert('Enter valid City')
          }
          let t = Number(data.temp) - 273.15;
          let t2 = Number(data.feels_like) - 273.15;
          let t3 = Number(data.speed) * 3.6;
          let rise = new Date(data.sunrise * 1000).toLocaleTimeString();
          let set = new Date(data.sunset * 1000).toLocaleTimeString();
          let des = data?.ai?.weather[0]?.description;
          setTemp(t);
          setFeels_like(t2);
          setHumidity(data.humidity);
          setSunrise(rise);
          setSunset(set);
          setDiscription(des);
          setSpeed(t3);
          setName(data.name);
          setAi("");
          setCity("");
          setLoad(false);
     }


     useLayoutEffect(() => {
          getData();
     }, []);

     const search = () => {
          if (!city) return;
          getData();
     }


     return <>
          <div className="Weather w-[95%] md:w-[97%] mx-auto mt-5 pb-10">
               <div className="flex gap-2 lg:mx-70 justify-center items-center">
                    <input type="search" className="outline-none border-2 border-gray-400 rounded-xl h-12 w-[90%] px-3 lg:px-5"
                         placeholder="Search city here...."  onKeyDown={(k) => {
                              if (k.key === 'Enter') search();
                         }} value={city} onChange={(e)=> setCity(e.target.value)} />
                    <div className="location p-2.5 border-2 bg-purple-700 text-white border-purple-600 rounded-2xl cursor-pointer" onClick={search}><Search /></div>
               </div>
               <div className="locate mt-5 flex gap-1 items-center lg:w-[70%] mx-auto">
                    <div className="location">
                         <MapPin />
                    </div>
                    <div className='text-lg'>{load ? "Loading..." : name}</div>
               </div>
               <div className="climate bg-purple-800 rounded-xl md:w-[70%] mx-auto mt-3">
                    <div className="icon flex justify-center mb-5">
                         <div className="text-white mt-10">
                              <Sun height={70} width={70} />
                         </div>
                    </div>
                    <div className="flex justify-center mb-3 text-white text-5xl">
                         <div>{temp.toFixed(1)} °C</div>
                    </div>
                    <div className="flex justify-center mb-3 text-white text-xl">
                         <div>Feels like {feels_like.toFixed(1)} °C</div>
                    </div>
                    <div className="flex justify-center mb-3 text-white text-2xl font-semibold">
                         <div>{discription}</div>
                    </div>
                    <div className="text-white flex flex-col lg:flex-row gap-2 my-10 pb-10 w-[90%] mx-auto">
                         <div className="one flex gap-2 w-full">
                              <div className="bg-purple-500 h-30 w-full flex flex-col justify-center items-center gap-1 rounded-lg">
                                   <div className="flex">
                                        <div className="icon">
                                             <Droplet />
                                        </div>
                                        <div>Humidity</div>
                                   </div>
                                   <div>{humidity}%</div>
                              </div>
                              <div className="bg-purple-500 h-30 w-full flex flex-col justify-center items-center gap-1 rounded-lg">
                                   <div className="flex gap-1 justify-center">
                                        <div className="icon">
                                             <Wind />
                                        </div>
                                        <div>Wind Speed</div>
                                   </div>
                                   <div>{speed.toFixed(1)} km/h</div>
                              </div>
                         </div>
                         <div className="two flex gap-2 w-full">
                              <div className="bg-purple-500 h-30 w-full flex flex-col justify-center items-center gap-2 rounded-lg">
                                   <div className="flex justify-center gap-1">
                                        <div className="icon">
                                             <Sunrise />
                                        </div>
                                        <div>Sunrise</div>
                                   </div>
                                   <div>{sunrise}</div>
                              </div>
                              <div className="bg-purple-500 gap-2 w-full h-30 rounded-lg flex flex-col items-center justify-center">
                                   <div className="flex justify-center gap-1">
                                        <div className="icon">
                                             <Sunset />
                                        </div>
                                        <div>Sunset</div>
                                   </div>
                                   <div>{sunset}</div>
                              </div>
                         </div>
                    </div>
               </div>
               <div className="summary mt-7 bg-white lg:w-[90%] mx-auto rounded-xl py-5 px-1 lg:px-5">
                    <p className='text-2xl font-semibold mb-2'>Today's Summary</p>
                    <p className='text-gray-800'>ai</p>
               </div>
          </div>
     </>
}

export default Weather;