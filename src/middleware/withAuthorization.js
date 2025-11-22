import { getToken } from "next-auth/jwt";
import {
    NextRequest,
    NextResponse,
} from "next/server";

export default function withAuthorization(
    middleware,
    requireAuth = {}
) {
    return async (request, next) => {

        const pathname = request.nextUrl.href;
        // const searchParams = request.nextUrl
        // console.log('aaaa', searchParams)

        // console.log('nextauthpathname', pathname)



        for (const [key, value] of Object.entries(requireAuth)) {

            // }
            // const authorizedPath = Object.entries(requireAuth).forEach(([key, value]) => {
            const regtest = new RegExp(key).exec(pathname)

            if (regtest !== null) {

                const token = await getToken({
                    req: request,
                    secret: process.env.NEXTAUTH_SECRET,
                    secureCookie: process.env.NODE_ENV !== "development",
                });

                console.log('token', token)


                // console.log('regex', regtest)
                // const { ProjectId = null } = regtest?.groups
                const ProjectId = process.env.PROJECTID


                console.log(`token.roles[${ProjectId}]`, token?.roles?.[ProjectId])

                // console.log('fsom', token?.roles?.[ProjectId]?.some((element) => value.includes(element)))
                const tokenRoles = token?.roles?.[ProjectId] ?? []
                if (!token) {
                    const url = new URL(`/api/auth/signin`, request.url);
                    url.searchParams.set("callbackUrl ", encodeURI(request.url));
                    // console.log('!token')
                    return NextResponse.redirect(url);
                }
                else if (tokenRoles.length < 1) {

                    const Noaccessurl = request.url.replace(/\/[^/]+$/, '/Noaccess');
                    // console.log('Noaccessurl', Noaccessurl)
                    const url = new URL(`${Noaccessurl}`, request.url);
                    return NextResponse.rewrite(url);

                    return NextResponse.redirect(new URL('/', request.url));
                }
                else if ((tokenRoles?.some((element) => value.includes(element))) == false) {
                    // console.log('token.roles[ProjectId]notincluded', token.roles[ProjectId], value, request.url)
                    // return true
                    const Noaccessurl = request.url.replace(/\/[^/]+$/, '/Noaccess');
                    // console.log('Noaccessurl', Noaccessurl)
                    const url = new URL(`${Noaccessurl}`, request.url);
                    return NextResponse.rewrite(url);
                }
                else {
                    console.log('else', request.url)
                    // // const nameBeforeAt = email.replace(/^([^@]+)@.*/, '$1');
                    // const Noaccessurl = request.url.replace(/\/[^/]+$/, '/Noaccess');
                    // const url = new URL(`${Noaccessurl}`, request.url);
                    // return NextResponse.rewrite(url);
                }
            }
        }

        // console.log('authorizedPath', pathname, authorizedPath)

        // if (requireAuth.some((path) => pathname.startsWith(path))) {
        //     const token = await getToken({
        //         req: request,
        //         secret: process.env.NEXTAUTH_SECRET,
        //     });
        //     if (!token) {
        //         const url = new URL(`/api/auth/signin`, request.url);
        //         url.searchParams.set("callbackUrl ", encodeURI(request.url));
        //         return NextResponse.redirect(url);
        //     }
        //     if (token.role !== "admin") {
        //         const url = new URL(`/403`, request.url);
        //         return NextResponse.rewrite(url);
        //     }
        // }
        return middleware(request, next);
    };
}
