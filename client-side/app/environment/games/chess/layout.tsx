

const chessLayout = ({ children } :  Readonly<{
     children: React.ReactNode
}>)=> {
     return <>
          <div className="text-gray-100">
            {children}
          </div>
     </>
}

export default chessLayout;