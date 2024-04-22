import { useEffect } from 'react';
import io from 'socket.io-client';

const WebSocketComponent = ({ feature_id }) => {
    useEffect(() => {
        const socket = io('wss://task-manager-visualization-production.up.railway.app/cable', {
            secure: true,
            // Esto es necesario si el certificado no está validado por una autoridad de certificación reconocida
            rejectUnauthorized: false
        });

        socket.on('connect', () => {
            console.log('Connected to WebSocket server');
            socket.emit('subscribe', { channel: 'FeatureCommentsChannel', feature_id: feature_id });
        });

        socket.on('feature_comments_' + feature_id, (data) => {
            console.log('Received comment for feature ' + feature_id, data);
        });

        socket.on('disconnect', () => {
            console.log('WebSocket connection closed');
        });

        return () => {
            // Cleanup function to close WebSocket connection
            socket.disconnect();
        };
    }, [feature_id]);

    return null;
};

export default WebSocketComponent;
