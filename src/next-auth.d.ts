//import NextAuth from 'next-auth'
import { InterUser } from '../interface'

declare module "next-auth" {
    interface Session {
        user: {
            _id: string,
            name: string,
            email: string,
            role: string,
            token: string,
            user: InterUser,
        }
    }
}