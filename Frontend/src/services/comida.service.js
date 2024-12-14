import axios from './root.service';

export const createComida = async (formData, jwt) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${jwt}`
            },
         };
        const response = await axios.post('/comida', formData, config);
        return response;
    } catch (error) {
        if (error.response) {
            return error.response;
         } else if (error.request) {
            return { status: 500, data: null, error: "No response received from server" };
         } else {
            return { status: 500, data: null, error: error.message };
        }
    }
};

export const updateComida = async (formdata, id) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        const response = await axios.put(`/comida/${id}`, formdata, config);
        return response;
    } catch (error){
        return { status: 500, data: [error], error: error.message };
    }
};

export const getComida = async (id) => {
    try {
        const response = await axios.get(`/comida/${id}`);
        return data = response.data;
        return [data];
    } catch (error) {
        console.error('Error en la solicitud: ', error);
        return { status: 500, data: [error], error: error.message };
    }
}

export const deleteComida = async (id) => {
    try {
        const response = await axios.delete(`/comida/${id}`);
        return response;
    } catch (error) {
        console.error('Error en la solicitud: ', error);
        return { status: 500, data: [error], error: error.message };
    }
};

//FALTA HACER ESTO
 //export const obtenerMisComidas = (idlocal)