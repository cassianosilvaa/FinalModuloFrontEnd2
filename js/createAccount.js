const checkSession = sessionStorage.getItem("logged");
const checkSession2 = localStorage.getItem("logged");

checkLogged();

document
    .getElementById("createAccount")
    .addEventListener("submit", function (e) {
        e.preventDefault();

        const iptEmail = document.getElementById("ipt-create-Email").value;
        const iptPassword = document.getElementById(
            "ipt-create-password"
        ).value;
        const iptConfirmPassword = document.getElementById(
            "ipt-confirm-password"
        ).value;

            //validações usando modal

        if (iptEmail.length < 5) {
            const validationEmailModal = new bootstrap.Modal(
                "#validationEmailModal"
            );
            validationEmailModal.show();
            setTimeout(() => {
                validationEmailModal.hide();
            }, 3000);
            return;
        } else if (iptPassword.length <= 7) {
            const validationPasswordModal = new bootstrap.Modal(
                "#validationPasswordModal"
            );
            validationPasswordModal.show();
            setTimeout(() => {
                validationPasswordModal.hide();
            }, 3000);
            return;
        } else if (iptPassword !== iptConfirmPassword) {
            const validationConfirmPasswordModal = new bootstrap.Modal(
                "#validationConfirmPasswordModal"
            );
            validationConfirmPasswordModal.show();
            setTimeout(() => {
                validationConfirmPasswordModal.hide();
            }, 3000);
            return;
        }

        if (localStorage.getItem(iptEmail)) {
            const validationEmailUsedModal = new bootstrap.Modal(
                "#validationEmailUsedModal"
            );
            validationEmailUsedModal.show();
            setTimeout(() => {
                validationEmailUsedModal.hide();
            }, 3000);
            return;
        } else {
            let newUser = {
                login: iptEmail,
                password: iptPassword,
                onlyNoteUser: [],
            };
            const loadingModal = new bootstrap.Modal("#loadingModal");
            saveAccount(newUser);
            loadingModal.show();
            setTimeout(() => {
                loadingModal.hide();
                location.assign("login.html");
            }, 2000);
        }
    });

function saveAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

function checkLogged() {
    if (checkSession) {
        window.location.href = "note.html";
    } else if (checkSession2) {
        window.location.href = "note.html";
    } else {
        return;
    }
}
