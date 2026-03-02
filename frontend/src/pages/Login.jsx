import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { ButtonLoading } from '../components/Loading'
import { toast } from 'react-toastify'

const Login = () => { 

  const [currenctState, setCurrenctState] = useState('Login')
  const {token, setToken,navigate,backendUrl}= useContext(ShopContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')  
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [showResendButton, setShowResendButton] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    try {
      if (currenctState === 'Sign Up') {
        
        // Check if password is at least 8 characters long
        if (password.length < 8) {
          toast.error("Password must be at least 8 characters long")
          setIsLoading(false)
          return
        }
        
        // Check if passwords match
        if (password !== confirmPassword) {
          toast.error("Passwords don't match")
          setIsLoading(false)
          return
        }

        const response = await axios.post(backendUrl + '/api/user/register',{name,email,password})
        if (response.data.success) {
          toast.success(response.data.message)
          // Don't auto-login, user needs to verify email first
          setCurrenctState('Login')
          setShowResendButton(true)
        }else{
          toast.error(response.data.message)
        }
        
      }else{
        const response = await axios.post(backendUrl + '/api/user/login',{email,password})
        
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        }else{
          toast.error(response.data.message)
          // If login failed due to unverified email, show resend button
          if (response.data.needsVerification) {
            setShowResendButton(true)
          }
        }
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const resendVerification = async () => {
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    
    setIsResending(true);
    try {
      const response = await axios.post(backendUrl + '/api/user/resend-verification', { email });
      if (response.data.success) {
        toast.success(response.data.message);
        setShowResendButton(false);
      } else {
        toast.error(response.data.message);
      }
    } catch {
      toast.error('Failed to resend verification email');
    } finally {
      setIsResending(false);
    }
  };

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[token])

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col gap-4 items-center w-[90%] sm:max-w-96 m-auto mt-14 text-gray-800 border border-gray-500 p-8 rounded-lg shadow-md'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl '>{currenctState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div> 
      {currenctState ==='Login' ? '' :  <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder='Name' className='w-full px-3 py-2 border border-gray-800 rounded-md' required/>}
      <input onChange={(e)=>setEmail(e.target.value)} value={email}  type="Email" placeholder='Email' className='w-full px-3 py-2 border border-gray-800 rounded-md' required/>
      <div className='relative w-full'>
        <input 
          onChange={(e)=>setPassword(e.target.value)} 
          value={password}  
          type={showPassword ? "text" : "password"} 
          placeholder='Password' 
          className='w-full px-3 py-2 pr-10 border border-gray-800 rounded-md' 
          required
        />
        <button 
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800'
        >
          {showPassword ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L2.05 2.05m7.828 7.828L12 12m-2.122-2.122l2.122 2.122M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          )}
        </button>
      </div>
      {currenctState === 'Sign Up' && (
        <div className='relative w-full'>
          <input 
            onChange={(e)=>setConfirmPassword(e.target.value)} 
            value={confirmPassword}  
            type={showConfirmPassword ? "text" : "password"} 
            placeholder='Confirm Password' 
            className='w-full px-3 py-2 pr-10 border border-gray-800 rounded-md' 
            required
          />
          <button 
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800'
          >
            {showConfirmPassword ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L2.05 2.05m7.828 7.828L12 12m-2.122-2.122l2.122 2.122M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>
      )}
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot your password</p>
        {
          currenctState === 'Login' 
          ? <p onClick={()=>setCurrenctState('Sign Up')} className='cursor-pointer'>Create an account</p> 
          : <p onClick={()=>setCurrenctState('Login')} className='cursor-pointer'>Already have an account? Log In</p>
        }
      </div>

      {/* Resend Verification Button */}
      {showResendButton && currenctState === 'Login' && (
        <div className='w-full text-center'>
          <p className='text-sm text-gray-600 mb-2'>Didnt receive verification email?</p>
          <ButtonLoading 
            type="button"
            onClick={resendVerification}
            isLoading={isResending}
            disabled={isResending}
            className='text-blue-600 hover:text-blue-800 text-sm underline disabled:opacity-50'
            variant="link"
          >
            Resend verification email
          </ButtonLoading>
        </div>
      )}

      <ButtonLoading 
        type='submit'
        isLoading={isLoading} 
        className='py-2 px-8 mt-4 bg-blue-600 text-white font-light hover:bg-blue-700 transition-colors'
        disabled={isLoading}
      >
        {currenctState === 'Login' ? 'Log In' : 'Sign Up'}
      </ButtonLoading>
    </form>
  )
}

export default Login
