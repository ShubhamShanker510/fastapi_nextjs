"use client"

import AuthForm from "@/components/Auth_Form"

export default function LoginPage(){
    return(
            <div className="pt-16">
                <AuthForm isLogin={true} />
            </div>
        ) 
}