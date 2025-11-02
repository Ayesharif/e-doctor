import { Bounce, toast } from "react-toastify";
export const handleSuccess =(msg)=>{
  toast.success(msg, {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "colored",
transition: Bounce,

});

}

export const handleError =(msg)=>{
  toast.error(msg, {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "colored",
transition: Bounce,                                  
});

}
export const handleLoading =(msg)=>{
  toast.loading(msg, {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "colored",
transition: Bounce,                                  
});

}