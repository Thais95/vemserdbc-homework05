let date = luxon.DateTime.now().setLocale('pt-br');
const monthDisplay = document.getElementById('month-selector');
const reminderCard = document.getElementById('reminder-cards');
const reminders = [];
const modal = document.getElementById('modal');
const btnOpenModal = document.getElementById('open-modal');
const btnCloseModal = document.getElementById('close-modal');
updateDisplay();

btnOpenModal.onclick = function openModal() {
    document.getElementById('modal').style.display = 'flex';
}

btnCloseModal.onclick = function closeModal() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target !==  modal) {
        modal.style.display = 'none';
    }
}

class Reminder{
    constructor(title, date, status) {
        this.title = title;
        this.date = date;
        this.status = status ?? 'to-do';
    }
    
    createHtml() {
        switch(this.status) {

            case 'to-do':
                return `
                <div class="task-card">
                    <p>Status to do</p>
                    <p>${this.title}</p>
                    <p>${this.date.toFormat("HH':'mm")}</p>
                </div>
                `

            case 'completed':
                return `
                <div class="task-card">
                    <p>Status completo</p>
                    <p>${this.title}</p>
                    <p>${this.date.toFormat("HH':'mm")}</p>
                </div>
                `

            case 'disabled':
                return `
                <div class="task-card">
                    <p>Status desativado</p>
                    <p>${this.title}</p>
                    <p>${this.date.toFormat("HH':'mm")}</p>
                </div>
                `
        }
    }
}

function previousMonth() {
    date = date.minus({months:1});
    updateDisplay();
}

function nextMonth() {
    date = date.plus({months:1});
    updateDisplay();
}

function updateDisplay() {
    monthDisplay.innerText = date.toFormat('LLLL, yyyy');
    // reminderCard.innerHTML = '';

    reminders.forEach(task => {
        if(task.date.hasSame(date, 'month', 'year')) {
            reminderCard.innerHTML += task.createHtml();
        }
    })

    if(!reminderCard.innerHTML) {
        return // COLOCAR AQUI CARD SEM NENHUM LEMBRETE
    }
}

function createReminder() {
    const text = document.getElementById('save-reminder-text').value;
    const time = document.getElementById('save-reminder-time').value;
    
    if(!text || !time) {
        return;
    }
    
    let stringTime = time.split(':');
    let hour = parseInt(stringTime[0]);
    let minute = parseInt(stringTime[1]);
    let reminder = new Reminder(text, date.set({
        hour:hour, minute:minute
    }));

    reminders.push(reminder);
    updateDisplay();
}