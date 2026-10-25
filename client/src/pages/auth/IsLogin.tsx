import {useEffect} from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks'
import axios from 'axios';
import { IS_LOGIN_API } from '@/app/api';
import { loginSuccess } from '@/redux/reducers/auth.reducers';

export default function IsLogin() {
  const { isLogin } = useAppSelector((state)=> state.auth)
  const dispatch = useAppDispatch();

  const checkIsLogin = async ()=>{
    try{
      const res = await axios.get(IS_LOGIN_API, {withCredentials : true});

      console.log("RESPONSE: ", res.data)
      dispatch(loginSuccess({user: res?.data?.data, isLogin: true}))

    }catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    if(!isLogin){
      checkIsLogin();
    }
  }, [isLogin])

  
  return (
    <></>
  )
}
