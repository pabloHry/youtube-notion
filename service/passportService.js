import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CLIENT_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const token = await jwt.sign(
          {
            id: profile.id,
            created: Date.now().toString(),
            access_token: accessToken,
            refresh_token: refreshToken,
          },
          "123123"
        );
        const jsonContent = {
          fullname: profile.displayName,
          access_token: accessToken,
          refresh_token: refreshToken,
          token: token,
        };
        const jsonDirectory = path.join(process.cwd(), "json");

        fs.writeFile(
          jsonDirectory + "/data.json",
          JSON.stringify(jsonContent),
          "utf8",
          function (err) {
            if (err) {
              console.log(
                "An error occured while writing JSON Object to File."
              );
              return console.log(err);
            }
            console.log("JSON file has been saved.");
          }
        );
        console.log(profile);
        done(null, {
          message: "Auth successful",
          access_token: accessToken,
          refresh_token: refreshToken,
          tokenJwt: token,
        });
      } catch (err) {
        console.error(err);
      }
    }
  )
);
