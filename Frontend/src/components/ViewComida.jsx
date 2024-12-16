import { useState, useEffect } from 'react';
import Navbar from '../components/navbar.jsx';
import { useNavigate } from 'react-router-dom';
import axios from '../services/root.service.js';
import { deleteComida } from '../services/comida.service.js';
import { addEtiqueta } from '../services/etiqueta.service.js';
import { showDeleteTarea, DeleteQuestion } from '../helpers/swaHelper.js';

export default function VerComidas() {

    const navigate = useNavigate();
    const [comidas, setComidas] = useState([]);
    const [searchQuery, setSearchQuerty] = useState('');
    const [showEtiquetaModal, setShowEtiquetaModal] = useState(false);
    const [selectedComida, setSelectedComida] = useState(null);
    const [newEtiqueta, setNewEtiqueta] = useState("");
    const [etiquetasDisponibles, setEtiquetasDisponibles] = useState([]);
    const [selectedEtiqueta, setSelectedEtiqueta] = useState("");
    // local = JSON.parse(localStorage.getItem('user')).local;

    useEffect(() => {
        fetchData();
    }, []);


    const fetchData = () => {
        axios.get('/comida')
            .then((response) => {
                if (Array.isArray(response.data)) {
                    setComidas(response.data);
                } else {
                    setComidas([]); // Asegura que comidas sea un array
                }
            })
            .catch((error) => {
                setComidas([]); // Fallback a un array vacío
            });
    };

useEffect(() => {
    // Llamada al backend para obtener las etiquetas disponibles
    const fetchEtiquetas = async () => {
      try {
        const response = await axios.get("/etiqueta");
        setEtiquetasDisponibles(response.data);
      } catch (error) {
        console.error("Error al obtener etiquetas:", error);
      }
    };
    fetchEtiquetas();
  }, []);

const handleSearchChange = (e) => {
    setSearchQuerty(e.target.value);
};

const filteredComidas = comidas.filter(comida => 
    comida.nombreComida.toLowerCase().includes(searchQuery.toLowerCase())
);

const handleEditClick = (comida) => {
    navigate(`/comida/modificar`, {
        state: { comida },
    });
};

const handleDeleted = async (comida) => {
    const isConfirmed = await DeleteQuestion();
    if (isConfirmed) {
        try {
            const response = await deleteComida(comida._id);
            if (response.status === 200) {
                await showDeleteTarea();
                setComidas((prevComidas) => prevComidas.filter((c) => c._id !== comida._id));
            }
        } catch (error) {
            console.error('Error al eliminar la comida', error);
        }
    }
};


const handleAddEtiqueta = (comida) => {
    setSelectedComida(comida); // Guarda la comida seleccionada
    setShowEtiquetaModal(true); // Muestra el modal
  };

  const closeEtiquetaModal = () => {
    setShowEtiquetaModal(false);
    setNewEtiqueta("");
  };

  const saveEtiqueta = async () => {
    if (selectedEtiqueta) {
      try {
        const response = await addEtiqueta(selectedComida._id, selectedEtiqueta);
        console.log(`Etiqueta añadida: ${selectedEtiqueta}`, response.data);
  
        setComidas((prevComidas) =>
          prevComidas.map((comida) =>
            comida._id === selectedComida._id ? response.data : comida
          )
        );
        closeEtiquetaModal();
      } catch (error) {
        console.error("Error al guardar la etiqueta:", error);
      }
    }
  };


/*const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};*/

const TrashIcon = (props) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M3 6h18" />
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
);

function UserIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="8" r="4" />
            <path d="M6 20c0-4 4-6 6-6s6 2 6 6" />
        </svg>
    );
}

function PencilIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            <path d="m15 5 4 4" />
        </svg>
    );
}

function CopyIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
    );
}

  function DownloadIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
    );
}

const containerStyle = {
    display: 'flex',
    marginRight:'250px',
    marginTop: '64px',
    justifyContent: 'center',
    alignItems: 'center',
};

const BoxStyle = {
    alignItems: 'center',
    paddingTop: '64px',
    width: '800px',
    padding: '1rem',
    borderRadius: '8px',
    textAlign: 'left',
    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
};

const BoxStyle2 = {
    alignItems: 'center',
    paddingTop: '10px',
    padding: '1rem',
    borderRadius: '10px',
    textAlign: 'left',
    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#fff',
    marginBottom: '10px',
};

return (
    <div style={containerStyle}>
    <Navbar />
    <div style={BoxStyle}>
        <div className="has-text-centered">
            <h1 className="title is-2">Lista de Comidas</h1>
        </div>
        <div>
            <div className="field">
                <label className="label" htmlFor="search">Filtrar por nombre:</label>
                <div className="control">
                    <input
                        id="search"
                        type="text"
                        className="input search-input"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Buscar por nombre de comida..."
                    />
                </div>
            </div>
            {filteredComidas.length === 0 ? (
                <p>No hay comidas existentes con ese nombre.</p>
            ) : (
                // Contenedor que organiza comidas en grid
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)', // 3 columnas
                    gap: '1rem', // Espaciado entre columnas y filas
                    marginTop: '1rem'
                }}>
                    {filteredComidas.reverse().map((comida, index) => (
                        <div key={index} style={BoxStyle2}>
                            <div className="content">
                                <h2 className="title is-4">
                                    {comida.nombreComida.charAt(0).toUpperCase() + comida.nombreComida.slice(1).toLowerCase()}
                                </h2>
                                <div className="contenedor-texto">
                                    <strong>Precio:</strong>&nbsp;
                                    <span>{(comida.precio)}</span>
                                </div>
                                <div className="contenedor-texto">
                                    <strong>Calorías:</strong>&nbsp;
                                    <span>{(comida.calorias)}</span>
                                </div>
                                <p className="is-flex is-align-items-center">
                                    {comida.imagen ? (
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <img
                                                src={comida.imagen}
                                                alt="Imagen de comida"
                                                style={{ width: '150px', height: '150px', marginRight: '1rem' }}
                                            />
                                        </div>
                                    ) : (
                                        <span className="ml-2">No hay imagen adjunta</span>
                                    )}
                                </p>
                                <div className="button-container">
                                    <button
                                        className="button is-primary is-outlined is-asignar"
                                        onClick={() => handleEditClick(comida)}
                                    >
                                        <span className="icon is-small">
                                            <PencilIcon />
                                        </span>
                                        <span>Editar</span>
                                    </button>
                                    <button
                                        className="button is-primary is-outlined is-asignar"
                                        onClick={() => handleAddEtiqueta(comida)}
                                    >
                                        <span className="icon is-small">
                                            <PencilIcon />
                                        </span>
                                        <span>Añadir etiqueta</span>
                                    </button>
                                    <button
                                        className="button is-danger is-outlined mr-2 is-eliminar"
                                        onClick={() => handleDeleted(comida)}
                                    >
                                        <span className="icon is-small">
                                            <TrashIcon />
                                        </span>
                                        <span>Eliminar</span>
                                    </button>
                                </div>
                                        {/* MODAL PARA AÑADIR ETIQUETA */}
        {showEtiquetaModal && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                padding: "2rem",
                borderRadius: "8px",
                boxShadow: "0 5px 10px rgba(0, 0, 0, 0.3)",
                width: "400px",
              }}
            >
              <h2 className="title is-4">Añadir Etiqueta</h2>
              <p>
                Comida seleccionada: <strong>{selectedComida.nombreComida}</strong>
              </p>
              <div className="field">
                <label className="label">Etiqueta:</label>
                <div className="control">
                    <div className="select">
                    <select
                        value={selectedEtiqueta}
                        onChange={(e) => setSelectedEtiqueta(e.target.value)}
                    >
                        <option value="" disabled>
                        Selecciona una etiqueta
                        </option>
                        {etiquetasDisponibles.map((etiqueta) => (
                        <option key={etiqueta._id} value={etiqueta.nombre}>
                            {etiqueta.nombre}
                        </option>
                        ))}
                    </select>
                    </div>
                </div>
                </div>
              <div className="buttons">
                <button className="button is-success" onClick={saveEtiqueta}>
                  Guardar
                </button>
                <button className="button" onClick={closeEtiquetaModal}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
</div>
);
}
