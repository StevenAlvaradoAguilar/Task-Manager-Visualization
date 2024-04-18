import './css/Features.css';
import MuiAlert from '@mui/material/Alert';
import React, { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';

const FeatureItem = ({ id, feature, links, createComment, magType, fetchCommentsForFeature }) => {
    const { external_id, magnitude, place, time, tsunami, mag_type, title, coordinates } = feature;
    const { external_url } = links;

    const [selectedFeatureId, setSelectedFeatureId] = useState(null);
    const [commentBody, setCommentBody] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [comments, setComments] = useState([]);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    // Verificar si coordinates está definido antes de desestructurarlo
    const longitude = coordinates ? coordinates.longitude : null;
    const latitude = coordinates ? coordinates.latitude : null;

    useEffect(() => {
        const fetchComments = async () => {
            const data = await fetchCommentsForFeature(id);
            setComments(data);
        };

        fetchComments();
    }, [fetchCommentsForFeature, id]);

    const handleUrlClick = () => {
        window.open(external_url, '_blank', 'noopener noreferrer');
    };

    const handleCreateComment = async () => {
        // Verificar si el comentario está vació
        if (commentBody.trim() === '') {
            setAlertMessage('El comentario está vacío. Debe contener información para continuar.');
            setAlertOpen(true);
            // Detenemos la ejecución 
            return;
        }

        try {
            const newComment = await createComment(selectedFeatureId, commentBody);
            setComments([...comments, newComment]);
            setShowModal(false);
            setAlertMessage('¡Comentario creado exitosamente!');
            setAlertOpen(true);
        } catch (error) {
            setAlertMessage('Error al crear el comentario. Por favor inténtalo de nuevo.')
            setAlertOpen(true);
        }
    };

    const handleCommentChange = (e) => {
        setCommentBody(e.target.value);
    };

    // Verificar si el tipo de magnitud del feature coincide con el tipo de magnitud seleccionado
    if (magType && magType !== mag_type) return null;

    return (
        <div>
            <div className='container'>
                <div className='title-container'>
                    <h3>{title}</h3>
                </div>
                <div className="text_items">
                    <p>Id: {id}</p>
                    <p>External Id: {external_id}</p>
                    <p>Magnitude: {magnitude}</p>
                    <p>Place: {place}</p>
                    <p>Time: {time}</p>
                    <p>Tsunami: {tsunami ? "Yes" : "No"}</p>
                    <p>Mag Type: {mag_type}</p>
                    <p>Coordinates: [{longitude}, {latitude}]</p>
                    {/* Renderizar los comentarios */}
                    <div className="comments-container">
                        <h3 className="comments-title">Comments:</h3>
                        <ul className="comments-list">
                            {comments
                                .filter(comment => comment && comment.body && comment.body.trim() !== '')
                                .map((comment, index) => (
                                    <li className='comments' key={index}>{comment && comment.body},</li>
                                ))}
                        </ul>
                    </div>
                </div>
                <div className={external_url}>
                    <button className='url' onClick={handleUrlClick}>More info</button>
                </div>
                <div>
                    <button
                        className='button_comment_feature'
                        key={`${feature.id}.button`}
                        onClick={() => {
                            setSelectedFeatureId(id);
                            setShowModal(true);
                            setCommentBody('');
                        }}
                    >
                        Add new comment
                    </button>
                </div>

                {/* Modal */}
                {showModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className='close' onClick={() => setShowModal(false)}>&times;</span>
                            <h2>Add Comment</h2>
                            <textarea name="" value={commentBody} onChange={handleCommentChange}></textarea>
                            <button className='sendComment' onClick={handleCreateComment}>Send Comment</button>
                        </div>
                    </div>
                )}

                {/* Alert */}
                <Snackbar
                    open={alertOpen}
                    autoHideDuration={6000}
                    onClose={() => setAlertOpen(false)}
                    sx={{ alignItems: "flex-start", mt: "42px" }}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right"
                    }}
                >
                    <MuiAlert
                        sx={{ width: '100%' }}
                        variant='filled'
                        onClose={() => setAlertOpen(false)}
                        severity={alertMessage.includes('¡Comentario creado exitosamente!') ? 'success' : 'error'}
                    >
                        {alertMessage}
                    </MuiAlert>
                </Snackbar>
            </div>
        </div>
    );
};


export default FeatureItem;
