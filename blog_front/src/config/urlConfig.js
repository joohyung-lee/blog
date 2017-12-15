const urlConfig=()=>{
    if(process.env.NODE_ENV === "development"){
        return{
            url: 'http://localhost:4000',
            proxied_url: 'http://localhost:3000',
            GOOGLE_LOGIN_URL:"http://localhost:4000/auth/google",
            FACEBOOK_LOGIN_URL:"http://localhost:4000/auth/facebook",
            GITHUB_LOGIN_URL:"http://localhost:4000/auth/github"
        }      
    }else{
        return{
            url: 'http://108.61.180.96',
            proxied_url: 'http://108.61.180.96',
            GOOGLE_LOGIN_URL:"http://108.61.180.96/auth/google",
            FACEBOOK_LOGIN_URL:"http://108.61.180.96/auth/facebook",
            GITHUB_LOGIN_URL:"http://108.61.180.96/auth/github"
        }
    }
}
export default urlConfig();