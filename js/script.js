let date = luxon.DateTime.now().setLocale('pt-br');

const monthDisplay = document.getElementById('month-selector');
const reminderCard = document.getElementById('reminder-cards');
const modal = document.getElementById('modal');
const btnOpenModal = document.getElementById('open-modal');
const btnCloseModal = document.getElementById('close-modal');
const reminders = [];

updateDisplay();

btnOpenModal.onclick = function openModal() {
    modal.style.display = 'flex';
}

btnCloseModal.onclick = function closeModal() {
    modal.style.display = 'none';
}

class Reminder {
    constructor(title, date, index, status) {
        this.title = title;
        this.date = date;
        this.status = status ?? 'to-do';
        this.index = index;
    }

    updateStatus(status) {
        this.status = status;
    }

    createHtml() {
        switch (this.status) {

            case 'to-do':
                return `
                <div class="reminder-card-todo">
                <div class="card-todo">
                    <div class="reminder-status">
                        <p>
                            Pendente
                        </p>
                    </div>
                    <div class="text-todo">
                        <span class="reminder-time-todo">
                            ${this.date.toFormat("HH':'mm")}
                        </span>
                        <p class="reminder-text-todo">
                            ${this.title}
                        </p>
                    </div>
                </div>
                <div class="icon-todo">
                    <button class="reminder-btn" type="button" title="Completar" onclick="updateReminderStatus(${this.index}, 'completed')">
                        <img src='./img/patch-check.svg' onmouseover="this.src='./img/patch-check1.svg';" onmouseout="this.src='./img/patch-check.svg';" />
                    </button>
                    <button class="reminder-btn" type="button" title="Desabilitar" onclick="updateReminderStatus(${this.index}, 'disabled')">
                        <img src='./img/patch-minus.svg' onmouseover="this.src='./img/patch-minus-fill.svg';" onmouseout="this.src='./img/patch-minus.svg';" />
                    </button>
                </div>
                </div>
                `

            case 'completed':
                return `
                <div class="reminder-card-completed">
                <div class="card-completed">
                    <div class="reminder-status">
                        <p>
                            Completo
                        </p>
                    </div>
                    <div class="text-completed">
                        <span class="reminder-time-completed">
                            ${this.date.toFormat("HH':'mm")}
                        </span>
                        <p class="reminder-text-completed">
                            ${this.title}
                        </p>
                    </div>
                </div>
                <div class="icon-completed">
                    <button class="reminder-btn" type="button" title="Remarcar como pendente" onclick="updateReminderStatus(${this.index}, 'to-do')">
                        <img src='./img/patch-check-fill.svg' onmouseover="this.src='./img/patch-check-fill1.svg';" onmouseout="this.src='./img/patch-check-fill.svg';" />
                    </button>
                </div>
                </div>
                `

            case 'disabled':
                return `
                <div class="reminder-card-disabled">
                <div class="card-disabled">
                    <div class="reminder-status-disabled">
                        <p>
                            Desabilitado
                        </p>
                    </div>
                    <div class="text-disabled">
                        <span class="reminder-time-disabled">
                            ${this.date.toFormat("HH':'mm")}
                        </span>
                        <p class="reminder-text-disabled">
                            ${this.title}
                        </p>
                    </div>
                </div>
                <div class="icon-disabled">
                    <button class="reminder-btn" type="button" title="Reativar tarefa" onclick="updateReminderStatus(${this.index}, 'to-do')">
                        <img src='./img/patch-plus.svg' onmouseover="this.src='./img/patch-plus1.svg';" onmouseout="this.src='../img/patch-plus.svg';" />
                    </button>
                </div>
                </div>
                `
        }
    }
}

function previousMonth() {
    date = date.minus({ months: 1 });
    updateDisplay();
}

function nextMonth() {
    date = date.plus({ months: 1 });
    updateDisplay();
}

function updateDisplay() {
    const tReminders = reminders.slice();
    tReminders.sort(function (a, b) { return a.date - b.date; });

    monthDisplay.innerText = date.toFormat('LLLL, yyyy');
    reminderCard.innerHTML = '';

    tReminders.forEach(task => {
        if (task.date.hasSame(date, 'month', 'year')) {
            reminderCard.innerHTML += task.createHtml();
        }
    })

    if (!reminderCard.innerHTML) {
        reminderCard.innerHTML = `
        <div class="reminder-card-none">
            <p>
                Nenhum lembrete criado ainda!
            </p>
        </div>
        `
    }
}

function createReminder() {
    const text = document.getElementById('save-reminder-text').value;
    let time = document.getElementById('save-reminder-time').value;

    if (!text || !time) {
        return;
    }
    
    time = time.split(':').map(n => parseInt(n));
    let reminderDate = date.set({ hour: time[0], minute: time[1] });
    let reminder = new Reminder(text, reminderDate, reminders.length);

    reminders.push(reminder);
    updateDisplay();
}

function updateReminderStatus(index, status) {
    reminders[index].updateStatus(status);
    updateDisplay();
}