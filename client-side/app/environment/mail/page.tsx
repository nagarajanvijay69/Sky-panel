import MailNav from "./components/MailNav";
import MailSidebar from "./components/MailSidebar";

const Mail = () => {
  return <>
   <div className="mail-container h-[100dvh] overflow-x-hidden">
     <MailNav />
     <div className="w-[97dvw] mx-auto">
      <MailSidebar />
     </div>
   </div>
  </>
}

export default Mail;