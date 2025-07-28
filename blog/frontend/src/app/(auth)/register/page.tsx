"use client"

import AuthForm from "@/components/Auth_Form"

export default function RegisterPage(){
     return(
        <div className="pt-16 flex flex-col justify-center items-center">
            <AuthForm isLogin={false} />
        </div>
     ) 
}