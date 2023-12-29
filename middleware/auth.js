const { validateToken } = require("../services/auth");

// working as a closure
function checkForAuthenticationCookie(cookieName){
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];
        if(!tokenCookieValue) {
            return next();
        }
        
        // check for this afterwards
        try {
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
        } catch (error) {}

        return next();

            
               
    }
}

module.exports = {
    checkForAuthenticationCookie
}