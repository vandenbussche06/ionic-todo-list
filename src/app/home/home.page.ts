import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  currentDate: string;
  myTask: string;
  addTask: boolean;
  tasks: any;

  constructor(public afDB: AngularFireDatabase) {
    const dateFormat = Intl.DateTimeFormat();
    const today = dateFormat.format(Date.now());
    this.currentDate = today;
    this.myTask = '';
    this.addTask = false;
    this.tasks = [];

    this.getTasks();
  }

  addTaskToFirebase() {
    console.log('myTask : ' + this.myTask);

    this.afDB.list('Task/').push({
      tache: this.myTask,
      date: new Date().toISOString(),
      termine: false
    });
    this.showForm();
  }

  showForm() {
    this.addTask = !this.addTask;
    this.myTask = '';
  }

  getTasks() {
    this.afDB.list('Task/').snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
      this.tasks = [];
      actions.forEach(action => {
        console.log('Tache : ' + action.payload.exportVal().tache + " " + action.payload.exportVal().date);
        this.tasks.push({
          key: action.key,
          tache: action.payload.exportVal().tache,
          date: action.payload.exportVal().date.substring(0, 10),
          termine: action.payload.exportVal().termine
        });
      });
    });
  }

  changeCheckState(ev: any) {
    console.log('checked: ' + ev.termine);
    this.afDB.object('Task/' + ev.key + '/termine/').set(ev.termine);
  }

  deleteTask(task: any) {
    this.afDB.list('Task/').remove(task.key); 
  }

}
