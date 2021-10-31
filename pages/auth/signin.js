import React from "react";
import { getProviders, signIn } from "next-auth/react";
const SignIn = ({ providers }) => {
  console.log(providers);
  return (
    <div>
      <>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </>
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
