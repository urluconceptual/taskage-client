class WebSocketService {
  private sockets: { [key: string]: WebSocket | null } = {};
  private callbacks: { [key: string]: { [action: string]: (data: any) => void } } = {};

  connect(route: string) {
    if (!this.sockets[route]) {
      const socket = new WebSocket(`ws://localhost:5001/core/ws/${route}`);
      this.sockets[route] = socket;
      this.callbacks[route] = {};

      socket.onopen = () => {
        console.log(`WebSocket connection to ${route} established`);
      };

      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.action && this.callbacks[route][message.action]) {
          this.callbacks[route][message.action](message);
        }
      };

      socket.onclose = () => {
        console.log(`WebSocket connection to ${route} closed`);
        this.sockets[route] = null;
      };
    }
  }

  disconnect(route: string) {
    if (this.sockets[route]) {
      this.sockets[route]?.close();
      delete this.sockets[route];
      delete this.callbacks[route];
    }
  }

  on(route: string, action: string, callback: (data: any) => void) {
    if (!this.callbacks[route]) {
      this.callbacks[route] = {};
    }
    this.callbacks[route][action] = callback;
  }

  off(route: string, action: string) {
    if (this.callbacks[route]) {
      delete this.callbacks[route][action];
    }
  }

  send(route: string, action: string, data: any) {
    if (this.sockets[route]) {
      this.sockets[route]!.send(JSON.stringify({ action, ...data }));
    }
  }
}

export default new WebSocketService();