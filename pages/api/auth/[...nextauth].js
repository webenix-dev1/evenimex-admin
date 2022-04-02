import axios from "axios";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import apiRouter from "../../../utils/apiRouter";
import { axiosPost } from "../../../utils/axois";
import router from "../../../utils/router";

const options = {
  // @link https://next-auth.js.org/configuration/providers
  providers: [
    Providers.Credentials({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        let result = await axiosPost(apiRouter.LOGIN, credentials);
        if (result.status) return { token: result.data.token };
        else throw `${router.LOGIN}?error=${result.message}`;
      },
    }),

    Providers.Google({
      clientId: process.env.NEXTAUTH_GOOGLE_ID,
      clientSecret: process.env.NEXTAUTH_GOOGLE_SECRET,
    }),
    Providers.Facebook({
      clientId: process.env.NEXTAUTH_FACEBOOK_ID,
      clientSecret: process.env.NEXTAUTH_FACEBOOK_SECRET,
    }),
  ],

  // @link https://next-auth.js.org/configuration/options#session
  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `jwt` is automatically set to `true` if no database is specified.
    jwt: true,
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 7 * 24 * 60 * 60, // 7 days
    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },

  // @link https://next-auth.js.org/configuration/options#jwt
  jwt: {
    // A secret to use for key generation - you should set this explicitly
    // Defaults to NextAuth.js secret if not explicitly specified.
    secret: "INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw123",
    // Set to true to use encryption. Defaults to false (signing only).
    // encryption: true,
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },

  // @link https://next-auth.js.org/configuration/callbacks
  callbacks: {
    /**
     * Intercept signIn request and return true if the user is allowed.
     *
     * @link https://next-auth.js.org/configuration/callbacks#sign-in-callback
     * @param  {object} user     User object
     * @param  {object} account  Provider account
     * @param  {object} profile  Provider profile
     * @return {boolean}         Return `true` (or a modified JWT) to allow sign in
     *                           Return `false` to deny access
     */
    signIn: async (user, account, profile) => {
      //console.log("user", user);
      if (account.provider != "credentials") {
        let credentials = {
          firstName: "",
          lastName: "",
          email: user.email,
          profile: user.image,
          socialId: user.id,
          loginType: "",
        };

        if (account.provider == "google") credentials.loginType = "google";

        if (account.provider == "facebook") credentials.loginType = "facebook";

        if (user.name) {
          let name = user.name;
          name = name.split(" ");
          if (name.length > 0) {
            credentials.firstName = name[0];
            if (name.length > 1) credentials.lastName = name[1];
          }
        }

        let result = await axiosPost(apiRouter.SOCIALLOGIN, credentials);
        if (result.status) user.token = result.data.token;
      }

      return true;
    },

    /**
     * @link https://next-auth.js.org/configuration/callbacks#session-callback
     * @param  {object} session      Session object
     * @param  {object} user         User object    (if using database sessions)
     *                               JSON Web Token (if not using database sessions)
     * @return {object}              Session that will be returned to the client
     */
    session: async (session, user) => {
      let result = await axios.get(
        process.env.API_URL + apiRouter.REFRESHTOKEN,
        {
          headers: {
            Authorization: `Bearer ${user.user}`,
          },
        }
      );
      session.token = result.data.token;
      session.user = result.data.data;

      return session;
    },

    /**
     * @link https://next-auth.js.org/configuration/callbacks#jwt-callback
     * @param  {object}  token     Decrypted JSON Web Token
     * @param  {object}  user      User object      (only available on sign in)
     * @param  {object}  account   Provider account (only available on sign in)
     * @param  {object}  profile   Provider profile (only available on sign in)
     * @param  {boolean} isNewUser True if new user (only available on sign in)
     * @return {object}            JSON Web Token that will be saved
     */
    jwt: async (token, user, account, profile, isNewUser) => {
      user && (token.user = user.token);
      return token;
    },
    redirect: async (url, _) => {
      if (url === router.LOGIN) {
        return Promise.resolve(router.HOME);
      }
      return Promise.resolve(router.LOGIN);
    },
  },

  // @link https://next-auth.js.org/configuration/pages
  pages: {
    signIn: router.LOGIN,
    //signOut: '/api/auth/signout',
    //error: '/api/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: null, // If set, new users will be directed here on first sign in
  },
  events: {
    async error(message) {
      console.log("error msg==>", message);
    },
  },
  // Additional options
  // secret: 'abcdef123456789' // Recommended (but auto-generated if not specified)
  debug: false, // Use this option to enable debug messages in the console
};

const Auth = (req, res) => NextAuth(req, res, options);

export default Auth;
