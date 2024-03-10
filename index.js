class TrainingDate {
    constructor(name) {
        this.name = name;
        this.trainees = [];
    }

    addTrainee(name, title, area, phone) {
        this.trainees.push(new Trainee(name, title, area, phone));
    }
}

class Trainee {
    constructor(name, title, area, phone) {
        this.name = name;
        this.title = title;
        this.area = area;
        this.phone = phone;
    }
} 

class TrainingService {
    static url = 'https://65ece5380ddee626c9b10514.mockapi.io/Week12/trainee';

    static getAllTrainees() {
        return $.get(this.url);
    }

    static getTrainee(id) {
        return $.get(this.url + `/${id}`);
    }

    static createTrainee(trainee) {
        return $.post(this.url, trainee);
    }

    static updateTrainee(trainee) {
        return $.ajax({
            url: this.url + `/${trainee._id}`,
            dataType: 'json',
            data: JSON.stringify(trainee),
            contenttype: 'application/json',
            type: 'PUT'
        });
    }

    static deleteTrainee(id) {
        return $.ajax({
            url: this.url + `/${id}`,
            type: 'DELETE'
        });
    }
}

class DOMManager {
    static trainees;

    static getAllTrainees() {
        TrainingService.getAllTrainees().then(trainees => this.render(trainees));
    }

    static render(trainees) {
        this.trainees = trainees;
        $('#app').empty();
        for (let trainee of trainees) {
            $('#app').prepend(
                `<div id="${trainee._id}" class="card">
                    <div class="card-header">
                        <h2>${trainee.name}</h2>
                        <button class="btn-danger" onclick="DOMManager.deleteTrainee('${house._id}')">Delete</button>
                    </div>
                </div>        
                `

            );
        }
    }

}

DOMManager.getAllTrainees