import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, updateUser } from '../../services/user.service';
import { getAllLocalsData } from '../../services/local.service';
import '../../styles/user/UserEdit.css'; // Importa el CSS aquí

const UserEdit = () => {
    const { id } = useParams(); // ID del usuario
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: '',
        email: '',
        roles: '',
        local: '',
    });
    const [locals, setLocals] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Obtener datos del usuario
                const userData = await getUserById(id);
                setForm({
                    username: userData.username,
                    email: userData.email,
                    roles: userData.roles,
                    local: userData.local || '',
                });

                // Obtener locales disponibles
                const localData = await getAllLocalsData();
                setLocals(localData);
            } catch (err) {
                setError('Error al cargar los datos del usuario o los locales.');
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUser(id, form); // Llamar al servicio para actualizar el usuario
            alert('Usuario actualizado correctamente.');
            navigate('/users'); // Redirigir a la lista de usuarios
        } catch (err) {
            setError('Error al actualizar el usuario.');
        }
    };

    return (
        <div className="edit-user-container">
            <button className="volver-button" onClick={() => navigate(-1)}>
                Volver
            </button>
            <h1>Editar Usuario</h1>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre de Usuario:
                    <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Rol:
                    <select
                        name="roles"
                        value={form.roles}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>
                            Selecciona un rol
                        </option>
                        <option value="admin">Admin</option>
                        <option value="encargado">Encargado</option>
                        <option value="user">User</option>
                    </select>
                </label>
                <label>
                    Local:
                    <select
                        name="local"
                        value={form.local}
                        onChange={handleChange}
                    >
                        <option value="" disabled>
                            Selecciona un local
                        </option>
                        {locals.map((local) => (
                            <option key={local.id} value={local.id}>
                                {local.name}
                            </option>
                        ))}
                    </select>
                </label>
                <div className="buttons-container">
                    <button className="save-button" type="submit">
                        Guardar Cambios
                    </button>
                    <button className="cancel-button" type="button" onClick={() => navigate('/users')}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserEdit;