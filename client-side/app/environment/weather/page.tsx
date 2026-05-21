'use client'

import { initUser, RootState, setLogIn } from '@/app/store/store'
import axios from 'axios'
import { Search, MapPin, Sun, Droplet, Wind, Sunrise, Sunset } from 'lucide-react'
import { use, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import colors from '../../../Color'

const Weather = () => {

     const user = useSelector((state: RootState) => state.user.value);
     const [city, setCity] = useState<String>(user?.weatherCity ?? 'Tirunelveli');
     const [temp, setTemp] = useState(24.3);
     const [feels_like, setFeels_like] = useState(0);
     const [humidity, setHumidity] = useState("68");
     const [sunrise, setSunrise] = useState("8:57:51 am");
     const [sunset, setSunset] = useState("8:01:39 pm");
     const [discription, setDiscription] = useState("scattered clouds");
     const [speed, setSpeed] = useState(0);
     const [icon, setIcon] = useState("");
     const [name, setName] = useState(city);
     const [ai, setAi] = useState("");
     const [load, setLoad] = useState(false);
     const dispatch = useDispatch();
     const [count, setCount] = useState(0);


     const getData = async () => {
          setLoad(true);
          const { data, success } = (await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URI}/weather/${city}`)).data;

          if (!success) {
               setLoad(false);
               return alert('Enter valid City');
          }


          if (count) {
               let res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}/setCity`, { _id: user?._id, city });
               if (!res.data.success) console.error(res.data.message);
               dispatch(initUser(res.data.user));
               dispatch(setLogIn(true));
          }

          let t = Number(data.temp) - 273.15;
          let t2 = Number(data.feels_like) - 273.15;
          let t3 = Number(data.speed) * 3.6;
          let rise = new Date(data.sunrise * 1000).toLocaleTimeString();
          let set = new Date(data.sunset * 1000).toLocaleTimeString();
          let des = data?.ai?.weather[0]?.description;
          let icon = data?.ai?.weather[0]?.icon;
          setIcon(icon);
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
          setCount(prev => prev + 1);
     }


     useLayoutEffect(() => {
          getData();
     }, []);

     const search = () => {
          if (!city) return;
          getData();
     }


     return <>
          <div className="Weather pt-5 pb-10 md:bg-[url('/weather-lg.jpeg')] bg-[url('/weather-sm.jpeg')] bg-cover ">
               <div className="flex gap-2 lg:mx-70 justify-center items-center">
                    <input type="search" className="outline-none border-2 text-white border-violet-500 shadow-lg rounded-xl h-12 w-[75%] md:w-[90%] px-3 lg:px-5"
                         placeholder="Search city here...." onKeyDown={(k) => {
                              if (k.key === 'Enter') search();
                         }} value={`${city}`} onChange={(e) => setCity(e.target.value)} />
                    <div className="location p-2.5 border shadow-lg bg-violet-950 text-white border-violet-600 rounded-2xl cursor-pointer" onClick={search}><Search /></div>
               </div>
               <div className="locate mt-5 flex gap-1 items-center text-white mx-auto w-[90%]">
                    <div className="location">
                         <MapPin />
                    </div>
                    <div className='text-lg'>{load ? "Loading..." : name}</div>
               </div>
               <div className={`climate bg-violet-900/70 border-2 border-violet-900/70 shadow-2xl rounded-xl mx-auto mt-3 py-10 w-[90%]`}>
                    <div className="icon flex justify-center mb-5">
                         <div className="text-white mt-10">
                              {
                                   <img alt='weather icon'
                                        src={`https://openweathermap.org/img/wn/${icon}@2x.png`} />
                              }
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
               </div>
               <div className="text-white flex flex-col lg:flex-row gap-2 my-10 pb-10 w-[90%] mx-auto">
                    <div className="bg-violet-900/70 border-2 border-violet-900/70 shadow-2xl h-40 w-full flex flex-col  justify-center items-center rounded-lg">
                         <div className="flex justify-center flex-col items-center gap-1">
                              <div className="icon mb-3">
                                   <Droplet width={50} height={50} />
                              </div>
                              <div>Humidity</div>
                         </div>
                         <div>{humidity}%</div>
                    </div>
                    <div className="bg-violet-900/70 border-2 border-violet-900/70 shadow-2xl h-40 w-full flex flex-col justify-center items-center rounded-lg">
                         <div className="flex justify-center flex-col items-center">
                              <div className="icon mb-3">
                                   <Wind width={50} height={50} />
                              </div>
                              <div>Wind Speed</div>
                         </div>
                         <div>{speed.toFixed(1)} km/h</div>
                    </div>
                    <div className="bg-violet-900/70 border-2 border-violet-900/70 shadow-2xl h-40 w-full flex flex-col justify-center items-center rounded-lg">
                         <div className="flex justify-center flex-col items-center">
                              <div className="icon mb-3">
                                   <Sunrise width={50} height={50} />
                              </div>
                              <div>Sunrise</div>
                         </div>
                         <div>{sunrise}</div>
                    </div>
                    <div className="bg-violet-900/70 border-2 border-violet-900/70 shadow-2xl w-full h-40 rounded-lg flex flex-col items-center justify-center">
                         <div className="flex justify-center flex-col items-center">
                              <div className="icon mb-3">
                                   <Sunset width={50} height={50} />
                              </div>
                              <div>Sunset</div>
                         </div>
                         <div>{sunset}</div>
                    </div>
               </div>
               <div className="summary mt-7 bg-white w-[90%] mx-auto rounded-xl py-5 px-1 lg:px-5">
                    <p className='text-2xl font-semibold mb-2'>Today's Summary</p>
                    <p className='text-gray-800'>ai</p>
               </div>
          </div>
     </>
}

export default Weather;