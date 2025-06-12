import  {Button}  from '@/components/ui/button';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import LeftSide from '@/components/ui/LeftSide';
import { BackgroundEllipseIcon, ClickIcon, InboxIcon, MailIcon } from '@/assets/sidebar';
import { useEffect } from 'react';


const RegisterCompletePage = () => {


        const navigate=useNavigate();

        useEffect(()=>{
           toast.success('Account activated successfully!', {
           id: 'account-activated',
          });
           sessionStorage.removeItem("signupToken");
        },[])
       


        const HandleSignIn=()=>{
          sessionStorage.removeItem("signupToken");
          navigate("/login");

        }
   
  return (
   <div className="flex flex-col lg:flex-row h-screen w-full overflow-auto ">
     <div className="hidden lg:block flex-[1]"> <LeftSide/></div>

      <div className="flex flex-[1.95] flex-col justify-center items-center w-full max-w-full mx-auto px-4 py-8 bg-[#E6EBFA]"> 
          < div className="success-card ">
            <div className='flex justify-center flex-col items-center'>
             <h2 className="text-2xl font-medium font-poppins text-[#2B5BD4] mb-2">Thanks for signing up!</h2>
              <p className="flex flex-col items-center text-gray-600 mb-4">
              We've sent an activation email to: <span className="font-medium text-blue-600">rambahadur12@gmail.com</span>
              </p>
            </div>
          
          <div className='flex flex-col lg:flex-row justify-around gap-6 mb-8 items-center'>  
           <div className='inbox-section'>
               <div className="relative inline-block ml-2">
                <span className="w-24 h-14 bg-blue-500 rounded-full" ><BackgroundEllipseIcon/></span>
                <span className="absolute top-1/2 left-1/2 text-white text-2xl transform -translate-x-1/2 -translate-y-1/2">
                <InboxIcon/></span>
               </div>
               <div className='text-xs'>Check Inbox</div>
              </div>
            <div className='email-section'>
             <div className="relative inline-block ml-2">
                <span className="w-24 h-14 bg-blue-500 rounded-full" ><BackgroundEllipseIcon/></span>
                <span className="absolute top-1/2 left-1/2 text-white text-2xl transform -translate-x-1/2 -translate-y-1/2">
                <MailIcon/></span>
              </div>
              <div className='text-xs'>Open Email</div>
           </div>
            <div className='click-section'>
              <div className="relative inline-block ml-4">
                <span className="w-24 h-14 bg-blue-500 rounded-full" ><BackgroundEllipseIcon/></span>
                <span className="absolute top-1/2 left-1/2 text-white text-2xl transform -translate-x-1/2 -translate-y-1/2">
                <ClickIcon/></span>
               </div>
              <div className='text-xs'>Click link in email</div>
          </div>


        </div>
          
            </div>
            <div className='flex justify-center flex-col items-center'>
            <Button onClick={HandleSignIn} className="w-[180px] h-[40px] bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md py-2 px-4 transition-colors duration-200 mb-4">
              Sign In
            </Button>
            <p className="mb-2 text-sm text-gray-600">
              Did not get the email? <button className="text-blue-600 hover:underline">We will send it again</button>
            </p>
            <p className="text-sm text-gray-600">
              Wrong address? <button className="text-blue-600 hover:underline">Change it</button>
            </p>
            </div>
        <div className="mt-8 text-center text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-center gap-2">
          <a href="/terms" className="text-blue-600 hover:underline">Terms & Conditions</a>
          <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
        </div>
      </div>
  
    </div>
  );
};

export default RegisterCompletePage;
