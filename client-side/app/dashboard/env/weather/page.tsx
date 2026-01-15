'use client'

import { Search, MapPin, Sun, Droplet, Wind, Sunrise, Sunset } from 'lucide-react'

const Weather = () => {


     return <>
          <div className="Weather w-[95%] md:w-[97%] mx-auto mt-5 pb-10">
               <div className="flex gap-2 lg:mx-70 justify-center items-center">
                    <input type="search" className="outline-none border-2 border-gray-400 rounded-xl h-12 w-[90%] px-3 lg:px-5"
                         placeholder="Search city here...." />
                    <div className="location p-2.5 border-2 bg-purple-700 text-white border-purple-600 rounded-2xl cursor-pointer"><Search /></div>
               </div>
               <div className="locate mt-5 flex gap-1 items-center lg:w-[70%] mx-auto">
                    <div className="location">
                         <MapPin />
                    </div>
                    <div className='text-lg'>Tirunelveli</div>
               </div>
               <div className="climate bg-purple-800 rounded-xl md:w-[70%] mx-auto mt-3">
                    <div className="icon flex justify-center mb-5">
                         <div className="text-white mt-10">
                              <Sun height={70} width={70} />
                         </div>
                    </div>
                    <div className="flex justify-center mb-3 text-white text-5xl">
                         <div>72</div>
                    </div>
                    <div className="flex justify-center mb-3 text-white text-xl">
                         <div>Feel like 70</div>
                    </div>
                    <div className="flex justify-center mb-3 text-white text-2xl font-semibold">
                         <div>Clear Sky</div>
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
                                   <div>65%</div>
                              </div>
                              <div className="bg-purple-500 h-30 w-full flex flex-col justify-center items-center gap-1 rounded-lg">
                                   <div className="flex gap-1 justify-center">
                                        <div className="icon">
                                             <Wind />
                                        </div>
                                        <div>Wind Speed</div>
                                   </div>
                                   <div>12 mph</div>
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
                                   <div>07:32 AM</div>
                              </div>
                              <div className="bg-purple-500 gap-2 w-full h-30 rounded-lg flex flex-col items-center justify-center">
                                   <div className="flex justify-center gap-1">
                                        <div className="icon">
                                             <Sunset />
                                        </div>
                                        <div>Sunset</div>
                                   </div>
                                   <div>06:40 PM</div>
                              </div>
                         </div>
                    </div>
               </div>
               <div className="summary mt-7 bg-white lg:w-[90%] mx-auto rounded-xl py-5 px-1 lg:px-5">
                    <p className='text-2xl font-semibold mb-2'>Today's Summary</p>
                    <p className='text-gray-800'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate officiis
                         blanditiis ad animi recusandae autem unde provident ab tempora neque?</p>
               </div>
          </div>
     </>
}

export default Weather;