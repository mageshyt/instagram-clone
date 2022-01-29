import React from "react";
import { getProviders, signIn as SignIntoProvider } from "next-auth/react";
import Header from "../../components/Header";
import { signInWithGoogle, useAuth } from "../../firebase";
import { useRouter } from "next/dist/client/router";

const SignIn = ({ providers }) => {
  const currentUser = useAuth();
  const router = useRouter();
  console.log("user -->", providers);
  return (
    <div className="">
      <Header />
      <div className="center flex-col">
        <div className="container center py-2 min-h-screen center flex-col text-center px-14 -mt-14">
          {/* <SignInForm providers={providers} /> */}
          <img src="https://links.papareact.com/ocw" className="w-80" alt="" />

          <h2 className="italic font-bold">
            This is Instagram Clone ,This build for educational purpose only
          </h2>

          {/* signIn in button */}
          <div className="mt-20">
            {Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <button
                  className="bg-blue-500 p-2 rounded-lg text-white "
                  onClick={() =>
                    SignIntoProvider(provider.id, { callbackUrl: "/" })
                  }
                >
                  Sign in with {provider.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// server side rendering
export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
export default SignIn;
