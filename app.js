//vars formulario
const formulario         = document.getElementById( 'formulario'          );
const cardsEstudiantes   = document.getElementById( 'cards-estudiantes'   );
const cardsProfesores    = document.getElementById( 'cards-profesores'    );
const templateEstudiante = document.getElementById( 'template-estudiante' ).content;
const templateProfesor   = document.getElementById( 'template-profesor'   ).content;
const alert              = document.querySelector( '.alert'               );

//vars objects
const estudiantes = [];
const profesores = [];

//events
document.addEventListener('click', (e) => { 
    if (e.target.dataset.uid) { 
        if (e.target.matches('.btn-success')) { 
            estudiantes.map(item => {
                if (item.uid === e.target.dataset.uid) {
                    item.setEstado = true;
                }
                return item;
            });
        }

        if (e.target.matches('.btn-danger')) { 
            estudiantes.map(item => {
                if (item.uid === e.target.dataset.uid) {
                    item.setEstado = false;
                }
                return item;
            });
        }

        Persona.pintarPersonaUI(estudiantes, "Estudiante");
    }
});

//class
class Persona {
    constructor(nombre, edad, email) {
        this.uid = `${Date.now()}`;
        this.nombre = nombre;
        this.edad = edad;
        this.email = email;
    }

    static pintarPersonaUI(personas, tipo) {
        if (tipo === 'Estudiante') {
            cardsEstudiantes.textContent = "";
            const fragment = document.createDocumentFragment();

            personas.forEach((item) => { 
                fragment.appendChild(item.agregarNuevoEstudiante());
            });

            cardsEstudiantes.appendChild(fragment);
        }
        if(tipo === 'Profesor') {
            cardsProfesores.textContent = "";
            const fragment = document.createDocumentFragment();

            personas.forEach((item) => { 
                fragment.appendChild(item.agregarNuevoProfesor());
            });

            cardsProfesores.appendChild(fragment);
        }
    }
}

//extends class
class Estudiante extends Persona{
    #estado = false;
    #estudiante = 'Estudiante';

    set setEstado(estado) {
        this.#estado = estado;
    }

    get getEstudiante() {
        return this.#estudiante;
    }

    agregarNuevoEstudiante() {
        const clone = templateEstudiante.cloneNode(true);
        clone.querySelector('.text-primary').textContent = this.nombre;
        clone.querySelector('h6').textContent = this.getEstudiante;
        clone.querySelector('.lead').textContent = this.edad;
        clone.querySelector('.text-muted').textContent = this.email;

        if (this.#estado) {
            clone.querySelector('.badge').className = 'badge bg-success';
            clone.querySelector('.btn-success').disabled = true;
            clone.querySelector('.btn-danger').disabled = false;
        }
        else { 
            clone.querySelector('.badge').className = 'badge bg-danger';
            clone.querySelector('.btn-success').disabled = false;
            clone.querySelector('.btn-danger').disabled = true;
        }
        clone.querySelector('.badge').textContent = this.#estado
            ? 'A'
            : 'F';
        
        clone.querySelector('.btn-success').dataset.uid = this.uid;
        clone.querySelector('.btn-danger').dataset.uid = this.uid;

        return clone;
    }
}

class Profesor extends Persona{
    #profesor = 'Profesor';

    agregarNuevoProfesor() { 
        const clone = templateProfesor.cloneNode(true);
        clone.querySelector('h5').textContent = this.nombre;
        clone.querySelector('h6').textContent = this.#profesor;
        clone.querySelector('.lead').textContent = this.edad;
        clone.querySelector('.text-muted').textContent = this.email;

        return clone;
    }
}

//actions   
formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const datos = new FormData(formulario);
    const [nombre, edad, email, opcion] = [...datos.values()];

    if (!nombre.trim() || !edad.trim() || !email.trim()) { 
        alert.classList.remove('d-none');
        return
    } else { alert.classList.add('d-none'); }
    
    if (opcion === 'Estudiante') {
        const estudiante = new Estudiante(nombre, edad, email);
        estudiantes.push(estudiante);
        Persona.pintarPersonaUI(estudiantes, opcion);
    }

    if (opcion === 'Profesor') { 
        const profesor = new Profesor(nombre, edad, email);
        profesores.push(profesor);
        Persona.pintarPersonaUI(profesores, opcion);
    }    
});