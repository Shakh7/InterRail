class UsersApi {
    constructor(jwtToken) {
        this.user_api_url = `${process.env.VUE_APP_USERS_URL}/user`
        this.jwtToken = jwtToken;
    }

    async getUsers(limit) {
        let headers = new Headers();
        headers.append("Authorization", `Bearer ${this.jwtToken}`);

        let requestGetOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };

        let response = await fetch(`${this.user_api_url}/?skip=0&limit=${limit}`, requestGetOptions)
        // let data = await response.json()
        return response
    }

    async createUser(data) {
        let headers = new Headers();
        headers.append("Authorization", `Bearer ${this.jwtToken}`);
        headers.append("Content-Type", `application/json`);

        let response = await fetch(`${this.user_api_url}/open`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        })

        return response
    }

    async updateUsers(id, data) {
        let headers = new Headers();
        headers.append("Authorization", `Bearer ${this.jwtToken}`);
        headers.append("Content-Type", `application/json`);

        let requestGetOptions = {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(data),
            redirect: 'follow'
        };

        let response = await fetch(`${this.user_api_url}/${id}`, requestGetOptions)
        return response
    }

    async deleteUser(id) {
        let headers = new Headers();
        headers.append("Authorization", `Bearer ${this.jwtToken}`);

        let requestGetOptions = {
            method: 'DELETE',
            headers: headers,
            redirect: 'follow'
        };

        let response = await fetch(`${this.user_api_url}/delete/${id}`, requestGetOptions)
        return response
    }
}

export default UsersApi;