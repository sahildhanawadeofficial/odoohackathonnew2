"use client";

import { SessionProvider } from "next-auth/react";
import { ToastContainer } from 'react-toastify'




const NextAuthProvider = ({ children, session }) => {

    // const [logo, setLogo] = useState(null)

    // const { NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID } = UseClientEnvs()


    // useEffect(() => {
    //     const fetchLogo = async () => {
    //         const response = await fetch(`/api/gets3keys?S3Path=${encodeURIComponent("favicon/")}`, {
    //             method: "GET",
    //         });

    //         const res = await response.json()
    //         if (!res?.images?.[0]) {
    //             setLogo(false)
    //         }
    //         else if (res?.images?.[0]) {
    //             setLogo(res?.images?.[0])
    //         }
    //     }


    //     fetchLogo();
    // }, [])

    return <SessionProvider session={session} >
        <ToastContainer
            style={{ fontSize: "20px" }}
            position="bottom-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />


        {/* {logo && <link rel="icon" href={logo} sizes="any" />}
        {logo == false && <link rel="icon" href={"/images/storelogo.svg"} sizes="any" />}


        {NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID && (<>
            <Script id="gtm" strategy="afterInteractive">
                {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}');
        `}
            </Script>

            <noscript>
                <iframe
                    src={`https://www.googletagmanager.com/ns.html?id=${NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}`}
                    height="0"
                    width="0"
                    style={{ display: 'none', visibility: 'hidden' }}
                />
            </noscript>
        </>)
        } */}

        {children}
    </SessionProvider>;
};

export default NextAuthProvider
