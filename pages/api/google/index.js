import passport from "passport";
import "../../../service/passportService";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req, res, next) {
  passport.authenticate("google", {
    scope: [
      "profile",
      "email",
      "https://www.googleapis.com/auth/youtube",
      "https://www.googleapis.com/auth/youtube.channel-memberships.creator",
      "https://www.googleapis.com/auth/youtube.force-ssl",
      "https://www.googleapis.com/auth/youtube.readonly",
      "https://www.googleapis.com/auth/youtube.upload",
      "https://www.googleapis.com/auth/youtubepartner",
      "https://www.googleapis.com/auth/youtubepartner-channel-audit",
    ],
    session: false,
  })(req, res, next);
}
