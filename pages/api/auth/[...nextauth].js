import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/lib/mongodb";
import User from "@/Models/User";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();

        const user = await User.findOne({ username: credentials.username });

        if (user && user.password === credentials.password) {
          // Include the user's name in the returned object
          return {
            id: user._id,
            email: user.email,
            name: user.fullName, // Assuming `fullName` is the field in your User model
          };
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/api/auth/error",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        await dbConnect();
        const existingUser = await User.findOne({ email: profile.email });
        if (!existingUser) {
          const newUser = new User({
            username: profile.email,
            email: profile.email,
            fullName: profile.name, // Save the name from Google profile
          });
          await newUser.save();
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      // Add name to the token
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name; // Add the user's name to the JWT token
      }
      return token;
    },
    async session({ session, token }) {
      // Add user ID, email, and name to the session object
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name; // Include name in the session
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
  