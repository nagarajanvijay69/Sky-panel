
const layout =({children}: Readonly<{children: React.ReactNode}>)=>{
  return <>
   <div className="bg-gray-200 w-[97%] mx-auto">
     {children}
   </div>
  </>
}

export default layout;