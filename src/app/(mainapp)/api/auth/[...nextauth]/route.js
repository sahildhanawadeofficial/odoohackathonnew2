import NextAuth from 'next-auth'
import { authOptions2 } from "@/lib/authOptions"

const handler = async (req, res) => {
    const response = await NextAuth(req, res, await authOptions2(req));
    return response;
}


export { handler as GET, handler as POST }