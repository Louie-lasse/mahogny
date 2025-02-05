export class Connection {
    private username: string | null;
    private password: string | null;
    private token: string | null = null;
    private connected: boolean = false;

    constructor() {
        this.username = null;
        this.password = null;
    }

    async login(username: string, password: string): Promise<boolean> {
        if (!username || !password) {
            return false;
        }

        this.username = username;
        this.password = password;

        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user: this.username, password: this.password }),
        });

        if (response.status >= 200 && response.status < 400) {
            const data = await response.json();
            this.token = data.token;
            this.connected = true;
            return true;
        }

        if (response.status >= 400 && response.status < 500) {
            return false;
        }

        throw new Error("Unknown error occured during login");
    }

    async logout(): Promise<boolean> {
        const response = await fetch("http://localhost:5000/logout", {
            method: "GET",
            headers: { "Authorization": `Bearer ${this.token}` },
            credentials: "include",
        });

        if (response.status >= 200 && response.status < 400) {
            this.token = null;
            this.connected = false;
            return response.ok;
        }

        if (response.status >= 400 && response.status < 500) {
            return false;
        }

        throw new Error("Unknown error occured during logout");
    }


    async getBookings(): Promise<any> {
        if (!this.connected) {
            throw new Error("Not connected");
        }

        const response = await fetch("http://localhost:5000/bookings", {
            method: "GET",
            headers: { "Authorization": `Bearer ${this.token}` },
            credentials: "include",
        });

        if (response.status >= 200 && response.status < 400) {
            return response.json();
        }

        if (response.status >= 400 && response.status < 500) {
            throw new Error("Invalid request");
        }

        throw new Error("Unknown error occured during getBookings");
    }

}
