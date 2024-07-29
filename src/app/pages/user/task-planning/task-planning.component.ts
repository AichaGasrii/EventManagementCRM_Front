import {Component, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {EventOrgService} from "../../../services/organizerService/eventServiceOrg/event-org.service";
import { Task } from 'src/app/Model/Task';
import {FormsModule} from "@angular/forms";
@Component({
  selector: 'app-task-planning',
  standalone: true,
  imports: [CommonModule,FormsModule], // Include CommonModule in standalone component
  templateUrl: './task-planning.component.html',
  styleUrls: ['./task-planning.component.css']
})
export class TaskPlanningComponent implements OnInit {
  eventId!: number;
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  newTask: Task = { id: 0, description: '', title: '', status: 'todo', bookingId: 0 };
  showNewTaskForm: boolean = false;

  constructor(private route: ActivatedRoute, private taskService: EventOrgService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.eventId = id ? +id : 0;
    if (!this.eventId) {
      console.error("No ID found in the route.");
    } else {
      this.newTask.bookingId = this.eventId; // Set the bookingId for the new task
      this.fetchTasks();
    }
  }

  fetchTasks() {
    this.taskService.getTasksByBookingId(this.eventId).subscribe((tasks: Task[]) => {
      this.tasks = tasks;
      this.filterTasks('all');
    });
  }

  filterTasks(status: string) {
    if (status === 'all') {
      this.filteredTasks = this.tasks;
    } else if (status === 'todo') {
      this.showNewTaskForm = true;
      this.filteredTasks = this.tasks.filter(task => task.status === status);
    } else {
      this.showNewTaskForm = false;
      this.filteredTasks = this.tasks.filter(task => task.status === status);
    }
  }

  createNewTask() {
    this.taskService.createTask(this.newTask, this.eventId).subscribe((task: Task) => {
      this.tasks.push(task);
      this.filterTasks('all');
      this.newTask = { id: 0, title: '', description: '', status: 'todo', bookingId: this.eventId }; // Reset the new task
    });
  }

  changeStatus(task: Task, status: string) {
    task.status = status;
    this.taskService.updateTask(task).subscribe(() => {
      this.filterTasks('all');
    });
  }

}


