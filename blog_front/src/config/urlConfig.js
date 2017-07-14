module.exports={
    production: {
        url: 'http://localhost:4000',
        proxied_url: 'http://localhost:4000',
        GOOGLE_LOGIN_URL:"http://localhost:4000/auth/google"
    },
    development: {
        url: 'http://localhost:4000',
        proxied_url: 'http://localhost:3000',
        GOOGLE_LOGIN_URL:"http://localhost:4000/auth/google"
    }
}