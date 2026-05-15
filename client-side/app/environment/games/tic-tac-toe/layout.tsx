
const layout =({children}: Readonly<{children: React.ReactNode}>)=>{
  return <>
   <div className="bg-gray-200">
     {children}
   </div>
  </>
}

export default layout;