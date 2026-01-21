

const chessLayout = ({ children } :  Readonly<{
     children: React.ReactNode
}>)=> {
     return <>
          <div className="w-[97%] mx-auto text-gray-100">
            {children}
          </div>
     </>
}

export default chessLayout;