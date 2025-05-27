import { StarIcon } from "@/assets/sidebar"
function LeftSide(){

    return(
      
      <div className="flex-[0.9] bg-[#2146A1] min-h-screen p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col justify-between items-start">
        <div className=" text-2xl font-medium font-[Poppins] text-[#ffffff] mb-6 ">SmartLaw</div>
        <div className="mb-12">
          <h1 className=" font-medium font-poppins text-[#ffffff] text-2xl sm:text-3xl md:text-4xl mb-4 max-w-md">
            Let's setup your Smart Case Management System
          </h1> 
                    <p className="text-base font-light font-poppins text-[#FFFFFF]">All-in-one solution for individual and corporate firms.</p>
                </div>
                <div className="testimonial-card bg-[#2B5BD4] font-poppins p-4 sm:p-6 md:p-8 rounded-md shadow-md">
                    <p className="quote  text-[#ffffff]  mb-4 font-semibold">I barely had to do anything</p>
                    <p className="testimonial-text font-normal font-poppins text-sm text-[#ffffff] leading-relaxed mb-4 sm:mb-6">
                        I love the experience, got my business setup and all necessary details
                        in about a month and I barely had to do anything. Excellent
                        customer support!
                    </p>
                    <div className="testimonial-info flex items-center justify-between">
                        <div className="user flex items-center">
                            <div className="avatar w-10 h-10 rounded-full bg-gray-400 mr-3"></div>
                            <span className="name font-medium text-[#ffffff]">Ram Prasad Yadav</span>
                        </div>
                       <div className="flex text-yellow-500 text-lg">
                       {[...Array(5)].map((_, i) => (
                       <StarIcon key={i} />
                       ))}
                      </div>
          </div>
        </div>
      </div>
  
    )

}
export default LeftSide;