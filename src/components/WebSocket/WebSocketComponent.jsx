import { useEffect } from 'react';
import io from 'socket.io-client';

const WebSocketComponent = () => {
    useEffect(() => {
        const socket = io('wss://task-manager-visualization-production.up.railway.app/6248/cable');

        socket.on('connect', () => {
            console.log('Connected to WebSocket server');
            socket.emit('subscribe', { channel: 'FeatureCommentsChannel', feature_id: '1' });
        });

        socket.on('feature_comments_1', (data) => {
            console.log('Received comment for feature 1:', data);
        });

        socket.on('disconnect', () => {
            console.log('WebSocket connection closed');
        });

        return () => {
            // Cleanup function to close WebSocket connection
            socket.disconnect();
        };
    }, []);

    return null;
};

export default WebSocketComponent;
