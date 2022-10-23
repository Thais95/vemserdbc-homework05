let date = luxon.DateTime.now().setLocale('pt-br');
const monthDisplay = document.getElementById('month-selector');
const reminderCard = document.getElementById('reminder-cards');
const reminders = [];
const modal = document.getElementById('modal');
const btnOpenModal = document.getElementById('open-modal');
const btnCloseModal = document.getElementById('close-modal');
updateDisplay();

btnOpenModal.onclick = function openModal() {
    modal.style.display = 'flex';
}

btnCloseModal.onclick = function closeModal() {
    modal.style.display = 'none';
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
                    <button class="reminder-btn" type="button" title="Completar" onclick="statusCompleted()">
                        <img src='./img/patch-check.svg' onmouseover="this.src='./img/patch-check1.svg';" onmouseout="this.src='./img/patch-check.svg';" />
                    </button>
                    <button class="reminder-btn" type="button" title="Desabilitar">
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
                            ${this.date.toFormat("HH':'mm")}
                        </p>
                    </div>
                    <div class="text-completed">
                        <span class="reminder-time-completed">
                            18:30
                        </span>
                        <p class="reminder-text-completed">
                            ${this.title}
                        </p>
                    </div>
                </div>
                <div class="icon-completed">
                    <button class="reminder-btn" type="button" title="Remarcar como pendente">
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
                            ${this.date.toFormat("HH':'mm")}
                        </p>
                    </div>
                    <div class="text-disabled">
                        <span class="reminder-time-disabled">
                            18:30
                        </span>
                        <p class="reminder-text-disabled">
                            ${this.title}
                        </p>
                    </div>
                </div>
                <div class="icon-disabled">
                    <button class="reminder-btn" type="button" title="Reativar tarefa">
                        <img src='./img/patch-plus.svg' onmouseover="this.src='./img/patch-plus1.svg';" onmouseout="this.src='../img/patch-plus.svg';" />
                    </button>
                </div>
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
    reminderCard.innerHTML = '';

    reminders.forEach(task => {
        if(task.date.hasSame(date, 'month', 'year')) {
            reminderCard.innerHTML += task.createHtml();
        }
    })

    if(!reminderCard.innerHTML) {
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
    reminders.sort(function(a, b){return a.date - b.date;});
    updateDisplay();
    console.log(reminders)
}

// function statusCompleted(indice) {
//     reminders[indice].status = 'completed';
//     updateDisplay()
// }