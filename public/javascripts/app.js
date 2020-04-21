import dialogPolyfill from '/module/index.js';

const createContactDialog = document.querySelector("#newcontact-dialog");
if (! createContactDialog.showModal) {
    dialogPolyfill.registerDialog(createContactDialog);
}
createContactDialog.querySelector('.create').addEventListener('click', () => {
    createContactDialog.close();
})
createContactDialog.querySelector('.close').addEventListener('click', () => {
    createContactDialog.close();
})
document.querySelector("#add-contact-button").addEventListener('click', () => {
    createContactDialog.showModal();
})