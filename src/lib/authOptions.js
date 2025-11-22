// import AppleProvider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'
// import InstagramProvider from "next-auth/providers/instagram"
// import GitHubProvider from "next-auth/providers/github"
// import GitlabProvider from "next-auth/providers/gitlab"
// import HubspotProvider from "next-auth/providers/hubspot"
// import KakaoProvider from "next-auth/providers/kakao"
// import KeycloakProvider from "next-auth/providers/keycloak"
// import LineProvider from "next-auth/providers/line";
// import LinkedInProvider from "next-auth/providers/linkedin"
// import MailchimpProvider from "next-auth/providers/mailchimp"
// import MailRuProvider from "next-auth/providers/mailru"
// import MediumProvider from "next-auth/providers/medium"
// import NaverProvider from "next-auth/providers/naver"
// import NetlifyProvider from "next-auth/providers/netlify"
// import OktaProvider from "next-auth/providers/okta"
// import OneLoginProvider from "next-auth/providers/onelogin"
// import OssoProvider from "next-auth/providers/osso"
// import OsuProvider from "next-auth/providers/osu"
// import PatreonProvider from "next-auth/providers/patreon"
// import PinterestProvider from "next-auth/providers/pinterest"
// import PipedriveProvider from "next-auth/providers/pipedrive"
// import RedditProvider from "next-auth/providers/reddit"
// import SalesforceProvider from "next-auth/providers/salesforce"
// import TwitterProvider from "next-auth/providers/twitter"
// import ZoomProvider from "next-auth/providers/zoom"
// import SpotifyProvider from "next-auth/providers/spotify"
// import TwitchProvider from "next-auth/providers/twitch"

// import { MongoDBAdapter } from "@/servercomponents/MongoDBAdapter"
// import GetProjectId from '@/servercomponents/GetProjectId'
// import GetEnvs from '@/servercomponents/GetEnvs'
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import mongodb from "@/lib/mongodb"


export const authOptions2 = async (req) => {
    // const requestHeaders = new Headers(req.headers)
    // // const projectId = await GetProjectId()
    // // const envs = await GetEnvs({ envType: "all" })
    // const protocol =
    //     process.env.NODE_ENV === "development"
    //         ? "http"
    //         : requestHeaders.get("referer")?.startsWith("https") ? "https" : "http";

    // const NEXT_PUBLIC_HOST = process.env.NODE_ENV === "development"
    //     ? `${protocol}://${requestHeaders.get("host")}`
    //     : `${protocol}://${requestHeaders.get("host")?.split(':')[0]}`

    // const envs = await fetch(`${NEXT_PUBLIC_HOST}/api/getauthenvs`, {
    //     method: "GET"
    // })

    // const { Auth_Methods_Allowed = [], GOOGLE_ID, GOOGLE_SECRET, EMAIL_SERVER_HOST, EMAIL_SERVER_PORT, EMAIL_SERVER_USER, EMAIL_SERVER_PASSWORD, EMAIL_FROM } = envs


    return {
        adapter: MongoDBAdapter(mongodb),
        providers: [
            // OAuth authentication providers...
            GoogleProvider({
                clientId: process.env.GOOGLE_ID,
                clientSecret: process.env.GOOGLE_SECRET,
            }),
            //     Auth_Methods_Allowed.includes('apple') && AppleProvider({
            //         clientId: envs.APPLE_ID,
            //         clientSecret: envs.APPLE_SECRET
            //     }),
            //     Auth_Methods_Allowed.includes('facebook') && FacebookProvider({
            //         clientId: envs.FACEBOOK_ID,
            //         clientSecret: envs.FACEBOOK_SECRET
            //     }),
            //     Auth_Methods_Allowed.includes('github') && GitHubProvider({
            //         clientId: envs.GITHUB_ID,
            //         clientSecret: envs.GITHUB_SECRET
            //     }),
            //     Auth_Methods_Allowed.includes('gitlab') && GitlabProvider({
            //         clientId: envs.GITLAB_CLIENT_ID,
            //         clientSecret: envs.GITLAB_CLIENT_SECRET
            //     }),
            //     Auth_Methods_Allowed.includes('hubspot') && HubspotProvider({
            //         clientId: envs.HUBSPOT_CLIENT_ID,
            //         clientSecret: envs.HUBSPOT_CLIENT_SECRET
            //     }),
            //     Auth_Methods_Allowed.includes('instagram') && InstagramProvider({
            //         clientId: envs.INSTAGRAM_CLIENT_ID,
            //         clientSecret: envs.INSTAGRAM_CLIENT_SECRET
            //     }),
            //     Auth_Methods_Allowed.includes('kakao') && KakaoProvider({
            //         clientId: envs.KAKAO_CLIENT_ID,
            //         clientSecret: envs.KAKAO_CLIENT_SECRET
            //     }),
            //     Auth_Methods_Allowed.includes('keycloak') && KeycloakProvider({
            //         clientId: envs.KEYCLOAK_ID,
            //         clientSecret: envs.KEYCLOAK_SECRET,
            //         issuer: envs.KEYCLOAK_ISSUER,
            //     }),
            //     Auth_Methods_Allowed.includes('line') && LineProvider({
            //         clientId: envs.LINE_CLIENT_ID,
            //         clientSecret: envs.LINE_CLIENT_SECRET
            //     }),
            //     Auth_Methods_Allowed.includes('linkedin') && LinkedInProvider({
            //         clientId: envs.LINKEDIN_CLIENT_ID,
            //         clientSecret: envs.LINKEDIN_CLIENT_SECRET
            //     }),

            //     Auth_Methods_Allowed.includes('mailchimp') && MailchimpProvider({
            //         clientId: envs.MAILCHIMP_CLIENT_ID,
            //         clientSecret: envs.MAILCHIMP_CLIENT_SECRET
            //     }),
            //     Auth_Methods_Allowed.includes('mailru') && MailRuProvider({
            //         clientId: envs.MAILRU_CLIENT_ID,
            //         clientSecret: envs.MAILRU_CLIENT_SECRET
            //     }),

            //     Auth_Methods_Allowed.includes('medium') && MediumProvider({
            //         clientId: envs.MEDIUM_CLIENT_ID,
            //         clientSecret: envs.MEDIUM_CLIENT_SECRET
            //     }),

            //     Auth_Methods_Allowed.includes('naver') && NaverProvider({
            //         clientId: envs.NAVER_CLIENT_ID,
            //         clientSecret: envs.NAVER_CLIENT_SECRET
            //     }),

            //     Auth_Methods_Allowed.includes('netlify') && NetlifyProvider({
            //         clientId: envs.NETLIFY_CLIENT_ID,
            //         clientSecret: envs.NETLIFY_CLIENT_SECRET
            //     }),

            //     Auth_Methods_Allowed.includes('okta') && OktaProvider({
            //         clientId: envs.OKTA_CLIENT_ID,
            //         clientSecret: envs.OKTA_CLIENT_SECRET,
            //         issuer: envs.OKTA_ISSUER
            //     }),



            //     Auth_Methods_Allowed.includes('onelogin') && OneLoginProvider({
            //         clientId: envs.ONELOGIN_CLIENT_ID,
            //         clientSecret: envs.ONELOGIN_CLIENT_SECRET,
            //         issuer: envs.ONELOGIN_ISSUER
            //     }),


            //     Auth_Methods_Allowed.includes('osso') && OssoProvider({
            //         clientId: envs.OSSO_CLIENT_ID,
            //         clientSecret: envs.OSSO_CLIENT_SECRET,
            //         issuer: envs.OSSO_ISSUER
            //     }),

            //     Auth_Methods_Allowed.includes('osu') && OsuProvider({
            //         clientId: envs.OSU_CLIENT_ID,
            //         clientSecret: envs.OSU_CLIENT_SECRET
            //     }),

            //     Auth_Methods_Allowed.includes('patreon') && PatreonProvider({
            //         clientId: envs.PATREON_ID,
            //         clientSecret: envs.PATREON_SECRET,
            //     }),

            //     Auth_Methods_Allowed.includes('pinterest') && PinterestProvider({
            //         clientId: envs.PINTEREST_ID,
            //         clientSecret: envs.PINTEREST_SECRET
            //     }),

            //     Auth_Methods_Allowed.includes('reddit') && RedditProvider({
            //         clientId: envs.REDDIT_CLIENT_ID,
            //         clientSecret: envs.REDDIT_CLIENT_SECRET
            //     }),

            //     Auth_Methods_Allowed.includes('salesforce') && SalesforceProvider({
            //         clientId: envs.SALESFORCE_CLIENT_ID,
            //         clientSecret: envs.SALESFORCE_CLIENT_SECRET,
            //     }),



            //     Auth_Methods_Allowed.includes('twitch') && TwitchProvider({
            //         clientId: envs.TWITCH_CLIENT_ID,
            //         clientSecret: envs.TWITCH_CLIENT_SECRET
            //     }),

            //     Auth_Methods_Allowed.includes('zoom') && ZoomProvider({
            //         clientId: envs.ZOOM_CLIENT_ID,
            //         clientSecret: envs.ZOOM_CLIENT_SECRET
            //     }),

            //     Auth_Methods_Allowed.includes('spotify') && SpotifyProvider({
            //         clientId: envs.SPOTIFY_CLIENT_ID,
            //         clientSecret: envs.SPOTIFY_CLIENT_SECRET
            //     }),












            //     Auth_Methods_Allowed.includes('twitter') && TwitterProvider({
            //         clientId: envs.TWITTER_CLIENT_ID,
            //         clientSecret: envs.TWITTER_CLIENT_SECRET
            //     }),
            //     // Passwordless / email sign in
            //     Auth_Methods_Allowed.includes('email') && EmailProvider({
            //         server: {
            //             host: EMAIL_SERVER_HOST,
            //             port: EMAIL_SERVER_PORT,
            //             auth: {
            //                 user: EMAIL_SERVER_USER,
            //                 pass: EMAIL_SERVER_PASSWORD
            //             }
            //         },
            //         from: EMAIL_FROM
            //     }),
        ],

        session: { strategy: "jwt" },
        secret: process.env.NEXTAUTH_SECRET,
        NextAuth_Url: process.env.NEXTAUTH_URL,
        callbacks: {
            async jwt({ token, user, session, trigger }) {
                if (trigger == "update") {
                    token.roles = session?.user?.roles ?? {}
                }

                if (user) {
                    return {
                        ...token,
                        roles: user?.roles ?? {}
                    }
                }
                return token
            },
            async session({ session, token, user }) {
                // pass roles(is an array) to session 
                return {
                    ...session,
                    user: {
                        ...session.user,
                        roles: token.roles
                    }
                }
                return session
            }
        }
    }
}



const authOptions = {
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
}

export default authOptions






