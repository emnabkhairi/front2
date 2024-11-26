import { Component , OnInit} from '@angular/core';
import { ProjectService } from '../services/project.service';
import {  Project } from '../models/project.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent  implements OnInit {

  projects: Project[] = [];
  project: Project = {
    id: 0,
    name: '',
    startDate: new Date(),
    endDate: new Date(),
    team:'',
    client: '',
  };
  selectedProject: Project = {
    id: 0,
    name: '',
    startDate: new Date(),
    endDate: new Date(),
    team:'',
    client: '',

};

  isModalOpen = false;
  isUpdateModalOpen = false;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe(
      (data) => (this.projects = data),
      (error) => console.error('Failed to fetch projects:', error)
    );
  }

  // Open Add Modal
  openModal(): void {
    const modal = document.getElementById('addProjectModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      this.isModalOpen = true;
    }
  }

  // Close Add Modal
  closeModal(): void {
    const modal = document.getElementById('addProjectModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      this.isModalOpen = false;
    }
  }

  // Add project
  onSubmit(): void {
    this.projectService.addProject(this.project).subscribe(
      () => {
        this.loadProjects();
        this.closeModal();
        this.resetProjectForm();
      },
      (error) => console.error('Failed to add project:', error)
    );
  }

  resetProjectForm(): void {
    this.project = {
      id: 0,
      name: '',
      startDate: new Date(),
      endDate: new Date(),
      team:'',
      client: '',
    };
  }



  

  
  // Open Update Modal
  openUpdateModal(project: Project): void {
    this.selectedProject = { ...project };

    const modal = document.getElementById('updateprojectModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      this.isUpdateModalOpen = true;
    }
  }

  // Close Update Modal
  closeUpdateModal(): void {
    const modal = document.getElementById('updateProjectModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      this.isUpdateModalOpen = false;
    }

    this.selectedProject;
  }

  // Update Employee
  onUpdateSubmit(): void {
    if (this.selectedProject) {
      this.projectService.updateProject(this.selectedProject.id, this.selectedProject).subscribe(
        () => {
          this.loadProjects();
          this.closeUpdateModal();
        },
        (error) => console.error('Failed to update project:', error)
      );
    }
  }

  
  fetchEmployees(): void {
    this.projectService.getProjects().subscribe(
      (data) => {
        this.projects = data; // Assuming `employees` is an array
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }
  
  deleteProject(id: number): void {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(id).subscribe(
        () => {
          console.log(`project with ID ${id} deleted successfully.`);
          this.fetchEmployees(); // Refresh the project list after deletion

        },
        (error) => {
          console.error('Error deleting project:', error);
        }
      );
    }
  }
}

