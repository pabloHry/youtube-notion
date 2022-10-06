import { setCookies } from "cookies-next";
import passport from "passport";
import "../../../service/passportService";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req, res, next) {
  passport.authenticate("google", (err, user) => {
    if (err || !user) {
      return res.redirect("/?a=auth_fail");
    }

    // set cookie and send redirect
    res.redirect("/dashboard");
  })(req, res, next);
}
