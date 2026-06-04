// Hash 路由管理
class Router {
    constructor() {
        this.routes = {};
        this.currentRoute = null;
        window.addEventListener('hashchange', () => this.handleRoute());
        window.addEventListener('load', () => this.handleRoute());
    }

    register(path, handler) {
        this.routes[path] = handler;
    }

    handleRoute() {
        const hash = window.location.hash.slice(1) || '/';
        const handler = this.routes[hash] || this.routes['/'];
        if (handler) {
            this.currentRoute = hash;
            handler();
        }
    }

    navigate(path) {
        window.location.hash = path;
    }
}

export const router = new Router();