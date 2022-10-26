class UsersAuthAPi {
    constructor(jwtToken) {
        this.user_api_url = `${process.env.VUE_APP_BASE_API_URL}/user`
        this.jwtToken = jwtToken;
    }

    async loginAccessToken(email, password) {
        let userCredentials = new FormData();
        userCredentials.append("username", email);
        userCredentials.append("password", password);

        let requestOptions = {
            method: 'POST',
            body: userCredentials,
            redirect: 'follow'
        };

        try {
            let response = await fetch(`${this.user_api_url}/login/access-token`, requestOptions)
            return await response.json()
        } catch {
            return false
        }

    }

    async testToken() {
        let auth = new Headers();
        auth.append("Authorization", `Bearer ${this.jwtToken}`);

        let authOptions = {
            method: 'POST',
            headers: auth,
            redirect: 'follow'
        };

        let response = await fetch(`${this.user_api_url}/login/test-token`, authOptions)
        let user = await response.json()
        return user
    }
}

export default UsersAuthAPi;