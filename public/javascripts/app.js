
const createContactDialog = document.querySelector("#newcontact-dialog");
if (!createContactDialog.showModal) {
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

function showUpdateContactModal(contactJson) {

    const contact = JSON.parse(contactJson);

    const updateContactDialog = document.querySelector("#updatecontact-dialog");
    if (!updateContactDialog.showModal) {
        dialogPolyfill.registerDialog(updateContactDialog);
    }
    updateContactDialog.querySelector('.update').addEventListener('click', () => {
        updateContactDialog.close();
    })
    updateContactDialog.querySelector('.close').addEventListener('click', () => {
        updateContactDialog.close();
    })
    updateContactDialog.showModal();
    const form = document.querySelector('.update-form');
    form.setAttribute('action', 'contacts/' + contact._id);
    form.querySelector('#username').value = contact.username;
    form.querySelector('#tf-username').MaterialTextfield.checkDirty();

    form.querySelector('#noms').value = contact.noms;
    form.querySelector('#tf-noms').MaterialTextfield.checkDirty();

    form.querySelector('#prenoms').value = contact.prenoms;
    form.querySelector('#tf-prenoms').MaterialTextfield.checkDirty();

    form.querySelector('#state').value = contact.state;
    form.querySelector('#tf-state').MaterialTextfield.checkDirty();

    form.querySelector('#quartier').value = contact.quartier;
    form.querySelector('#tf-quartier').MaterialTextfield.checkDirty();

    form.querySelector('#arrond').value = contact.arrondissement;
    form.querySelector('#tf-arrond').MaterialTextfield.checkDirty();

    form.querySelector('#rs').value = contact.region_sanitaire;
    form.querySelector('#tf-rs').MaterialTextfield.checkDirty();

    const birth = new Date(contact.date_naissance);
    form.querySelector('#date_naissance').value = birth.getFullYear() + "-" + (birth.getMonth() < 10 ? '0' : '') + (birth.getMonth() + 1) + "-" + (birth.getDate() < 10 ? '0' : '') + birth.getDate();
    form.querySelector('#tf-date_naissance').MaterialTextfield.checkDirty();

    form.querySelector('#tel').value = contact.telephone;
    form.querySelector('#tf-tel').MaterialTextfield.checkDirty();
}