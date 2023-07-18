import {verifDate} from "./formatDate";

const API_URL = 'http://localhost:8080/api';
const API_URL_MICROSANDRINE = 'http://localhost:8000'



// recuperer les menus par date
export const fetchMenuByDate = (date) => {

    if(verifDate(date)){
        return fetch(`${API_URL}/menus/search/menusByDate?date=${date}`)
            .then(response => {
                if (!response.ok) {
                }
                return response.json();
            })
            .then(data => {
                // Parse the descriptionMenu string to JSON
                data.descriptionMenu = JSON.parse(data.descriptionMenu);
                return data;
            })
            .catch();
    }else {
        return Promise.reject(new Error("Invalid date format"));
    }

};

// mise a jour d'un menu
export const updateMenu = (url, updatedMenu) => {
    // Convertit descriptionMenu en une chaîne JSON avant de convertir l'ensemble de updatedMenu en une chaîne JSON
    updatedMenu.descriptionMenu = JSON.stringify(updatedMenu.descriptionMenu);

    return fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedMenu)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error, status = ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Parse the descriptionMenu string to JSON if needed
            data.descriptionMenu = JSON.parse(data.descriptionMenu);
            return data;
        })
        .catch(error => console.error(error));
}

//recuperation de la liste des fichiers uploadés
export const getFichiers = () => {
    return fetch(`${API_URL}/fichiers`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error, status = ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => console.error(error));
}

//suppression d'un fichier
export function deleteFile(url) {
    return fetch(url, {
        method: 'DELETE',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        });
}

//ajout d'un fichier
export const uploadFile = (file) => {
    const formData = new FormData();
    formData.append("file", file);

    return fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData
    })
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error("Il y a eu une erreur lors du téléchargement du fichier", error);
            throw error;
        });
};

//recuperation des formations
export const getFormations = () => {
    return fetch(`${API_URL}/formations`)
        .then((response) => response.json())
        .then(
        (data) => {
            return data
        }).catch((error) => {
        console.log(error)
        }
    )
}

//recuperation des horaires
export const getHoraires = () => {
    return fetch(`${API_URL}/horaires`)
        .then((response) => response.json())
        .then(
        (data) => {
            return data
        }).catch((error) => {
        console.log(error)
        }
    )
}

export const setHoraireFormation = (formationId, horaireId) => {
    return fetch(`${API_URL}/formations/`+formationId+`/horaires/`+horaireId, {
        method: "PUT"
    }
    )
}
export const removeHoraireFormation = (formationId) => {
    return fetch(`${API_URL}/formations/`+formationId+`/horaires/remove`, {
        method: "PUT"
    })
        .then((data)=>{
            console.log(data);
            console.log("ok")}).catch((error) => {
        console.log(error)
        }
    )
}

export const changeActiveFormation = (formationId) => {
    return fetch(`${API_URL}/formations/`+formationId+`/setactive`, {
        method: "GET"
    }).then((data)=>{

    }).catch((error)=>{
        console.log(error);
    })
}

export const deleteFormation = (formationId) => {
    return fetch(`${API_URL}/formations/`+formationId, {
        method: "DELETE"
    }).then((data)=>{

    }).catch((error)=>{
        console.log(error);
    })
}

export const addFormation = (formationNom) => {
    return fetch(`${API_URL}/formations`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nom: formationNom }),
    }).then((data)=>{

    }).catch((error)=>{
        console.log(error);
    })
}

//recupere 2 blagues, 2 citations et les affecte au jour d'aujourd'hui, si elles sont deja affectée simple recupération
export const getDaily = async () => {
    try {
        const response = await fetch(`${API_URL_MICROSANDRINE}/messages/todaySelection`, {
            headers: {
                'Cache-Control': 'no-cache'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation: ' + error.message);
    }
};

export const getDailyMessages = () => {
    return fetch(`${API_URL_MICROSANDRINE}/messages/todaySelection`, {
        method: "GET",
        headers: {
            'Cache-Control': 'no-cache'
        }
    })
        .then((response) => response.json())
        .then(
            (data) => {
                return data
            }
        )
        .catch((error) => {
            console.log(error)
        });
}
export const getIndesirablesMessages = () => {
    return fetch(`${API_URL_MICROSANDRINE}/messages/getindesirables`, {
        method: "GET",
        headers: {
            'Cache-Control': 'no-cache'
        }
    })
        .then((response) => response.json())
        .then(
            (data) => {
                return data
            }
        )
        .catch((error) => {
            console.log(error)
        });
}
export const setunsetMessage = (messageId) => {
    return fetch(`${API_URL_MICROSANDRINE}/message/setunset/`+messageId, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((response) => response.json())
        .then((data)=>{
        return data

    }).catch((error)=>{
        console.log(error);
    })
}

export const getRandomMessages = (id) => {
    return fetch(`${API_URL_MICROSANDRINE}/messages/getrandom/`+id, {
        method: "GET",
        headers: {
            'Cache-Control': 'no-cache'
        }
    })
        .then((response) => response.json())
        .then(
            (data) => {
                return data
            }
        )
        .catch((error) => {
            console.log(error)
        });
}
