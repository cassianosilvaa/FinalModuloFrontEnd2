const formNotes = document.querySelector("#recados");
const tableNote = document.querySelector("#forms");

// const iptEditDsc = document.getElementById("iptEditDsc");
// const iptEditDtl = document.getElementById("iptEditDtl");
const btnLogout = document.getElementById("btnLog");

const attLocal = (userData) => {
    localStorage.setItem(userData.login, JSON.stringify(userData));
};

let userData;
recuperaLocal();

formNotes.addEventListener("submit", saveNote);
btnLogout.addEventListener("click", logout);

function saveNote(event) {
    event.preventDefault();

    const d = new Date();
    let id = d.getTime();

    const iptDsc = formNotes.iptText.value;
    const iptDetail = formNotes.iptDetail.value;

    if (iptDsc == null || iptDsc == "") {
        const validationFields = new bootstrap.Modal("#validationFields");
        validationFields.show();
        setTimeout(() => {
            validationFields.hide();
        }, 3000);
    } else if (iptDetail == null || iptDetail == "") {
        const validationFields = new bootstrap.Modal("#validationFields");
        validationFields.show();
        setTimeout(() => {
            validationFields.hide();
        }, 3000);
    } else {
        let objNote = {
            id: id,
            description: iptDsc,
            detail: iptDetail,
        };
        userData.onlyNoteUser.push(objNote);
        saveUser();
        createTable();
        const successNote = new bootstrap.Modal("#successNote");
        successNote.show();
        setTimeout(() => {
            successNote.hide();
        }, 1000);
        event.target.reset();
    }
}
function recuperaLocal() {
    const checkSession = sessionStorage.getItem("logged");
    const checkSession2 = localStorage.getItem("logged");

    let userLocal = JSON.parse(localStorage.getItem(checkSession2));

    if (userLocal) {
        userData = JSON.parse(localStorage.getItem(checkSession2));
    } else {
        userData = JSON.parse(localStorage.getItem(checkSession));
    }
}
function createTable() {
    tableNote.innerHTML = "";
    let idCount = 1;
    for (let note of userData.onlyNoteUser) {
        tableNote.innerHTML += `
        <tr>
            <th>${idCount}</th>
            <td>${note.description}</td>
            <td>${note.detail}</td>
            <td>
                <button type="button"  class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop${note.id}">
                    Excluir
                </button>
                
                <div
                    class="modal fade"
                    id="staticBackdrop${note.id}"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabindex="-1"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                >
                <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1
                                    class="modal-title fs-5"
                                    id="staticBackdropLabel"
                                >
                                    Excluir recado?
                                </h1>
                                <button
                                    type="button"
                                    class="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div class="modal-body">
                               <p class="fw-bolder"> Tem certeza que deseja excluir o recado?</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" onclick="deleteRowTable(${note.id})" data-bs-dismiss="modal" class="btn btn-danger">
                                    Sim
                                </button>
                                <button
                                    type="button"
                                    class="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Sair
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <button type="button"  class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#staticBackdropEdit${note.id}">
                   Editar
                </button>
                
                <div
                class="modal fade"
                id="staticBackdropEdit${note.id}"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabindex="-1"
                aria-labelledby="staticBackdropLabelEdit"
                aria-hidden="true"
            >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1
                        class="modal-title fs-5"
                        id="staticBackdropLabelEdit"
                    >
                        Editar recado!
                    </h1>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
            <div class="modal-body">
                <form>
                    <div class="mb-3">
                        <label for="iptEditDsc" class="form-label fw-bolder"
                            >Nova descrição!</label
                            >
                        <input
                            type="text"
                            class="form-control"
                            id="iptEditDsc${note.id}"
                        />
                    </div>
                    <div class="mb-3">
                        <label for="iptEditDtl" class="form-label fw-bolder"
                            >Novo detalhe!</label
                        >
                        <input
                            type="text"
                            class="form-control"
                            id="iptEditDtl${note.id}"
                        />
                    </div>
                    <div class="modal-footer">
                        <button type="button" onclick="editNotesTable(${note.id})" data-bs-dismiss="modal" class="btn btn-primary">
                            Editar
                        </button>
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                        Sair
                        </button>
                    </div>
                </form>
            </div>
        </div>
            </div>
            </td>
        </tr>
    `;
        idCount++;
    }
}

/* <input type="button" class="btn btn-danger" value="Excluir" onclick="deleteRowTable(${note.id})"> 
    <input type="button" class="btn btn-secondary" value="Editar" onclick="editNotesTable(${note.id})"> */

checkLoggedNote();

function checkLoggedNote() {
    if (!userData) {
        const notUser = new bootstrap.Modal("#notUser");
        notUser.show();
        setTimeout(() => {
            notUser.hide();
            window.location.href = "createAccount.html";
        }, 3000);
    }
}

function saveUser() {
    localStorage.setItem(userData.login, JSON.stringify(userData));
}

createTable();

function deleteRowTable(id) {
    const idNotes = userData.onlyNoteUser.findIndex(
        (recado) => recado.id === id
    );
    if (idNotes < 0) return;
    userData.onlyNoteUser.splice(idNotes, 1);
    const successRemoveNote = new bootstrap.Modal("#successRemoveNote");
    successRemoveNote.show();
    setTimeout(() => {
        successRemoveNote.hide();
        attLocal(userData);
        createTable();
    }, 1000);
}

function editNotesTable(id) {
    const editDtl = document.querySelector(`#iptEditDtl${id}`);
    const editDsc = document.querySelector(`#iptEditDsc${id}`);

    const editNotes = userData.onlyNoteUser.findIndex(
        (recado) => recado.id === id
    );

    userData.onlyNoteUser[editNotes].description = editDsc.value;
    userData.onlyNoteUser[editNotes].detail = editDtl.value;

    

    const successEditNote = new bootstrap.Modal("#successEditNote");
    successEditNote.show();
    setTimeout(() => {
        successEditNote.hide();
        attLocal(userData);
        createTable();
    }, 1000);
}

function logout() {
    const logoutModal = new bootstrap.Modal("#logoutModal");
    logoutModal.show();
    setTimeout(() => {
        logoutModal.hide();
        window.location.href = "login.html";
        const checkSession2 = localStorage.getItem("logged");
        const checkSession = sessionStorage.getItem("logged");
        if (checkSession2 || checkSession) {
            localStorage.removeItem("logged");
            sessionStorage.removeItem("logged");
            window.location.href = "login.html";
        }
    }, 3000);
}
