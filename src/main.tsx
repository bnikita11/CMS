import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from 'sonner';


// import {createBrowserRouter, RouterProvider} from "react-router-dom";
// import LoginPage from './pages/login/LoginPage.tsx';
// import RegisterPage from './pages/register/FirstPage.tsx';
// import RegisterPage2 from './pages/register/SecondPage.tsx';
// import RegisterPage3 from './pages/register/ThirdPage.tsx';
// import RegisterCompletePage from './pages/register/CompleteRegister.tsx';


// const router=createBrowserRouter([{
//   path:"/",
//   element:<App/>,
//   children:[
//     {
//       path:"login",
//       element:<LoginPage/>
//     },
//     {
//       path:"Get Started",
//       element:<RegisterPage/>,
//       children:[
//         {
//           path:"Sign Up",
//           element:<RegisterPage2/>

//         },
//         {
//           path:"Contact Info",
//           element:<RegisterPage3/>
//         },
//         {
//           path:"Account Activate",
//           element:<RegisterCompletePage/>
//         }
//       ]
//     }

//   ]
// }

// ])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
          <App />
           <Toaster richColors position="top-right" />
    </AuthProvider>
    </BrowserRouter>
    
  </StrictMode>,
)
