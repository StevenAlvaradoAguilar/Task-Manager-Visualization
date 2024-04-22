import React from 'react';
import { Snackbar, MuiAlert } from '@mui/material';
import useSismicData from './useSismicData';

const AlertComponent = () => {
    const { alertOpen, setAlertOpen, alertMessage } = useSismicData();

    return (
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
    )
}

export default AlertComponent