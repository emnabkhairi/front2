import { Component , OnInit} from '@angular/core';
import { TeamService } from '../services/team.service';
import {  Team } from '../models/team.model';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent  implements OnInit {

  teams: Team[] = [];
  team: Team = {
    id: 0,
    name: '',
    members: 0,
    teamLeader:'',
  };
  selectedTeam: Team = {
    id: 0,
    name: '',
    members: 0,
    teamLeader:'',

};

  isModalOpen = false;
  isUpdateModalOpen = false;

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.loadTeams();
  }

  loadTeams(): void {
    this.teamService.getTeams().subscribe(
      (data) => (this.teams = data),
      (error) => console.error('Failed to fetch teams:', error)
    );
  }

  // Open Add Modal
  openModal(): void {
    const modal = document.getElementById('addTeamModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      this.isModalOpen = true;
    }
  }

  // Close Add Modal
  closeModal(): void {
    const modal = document.getElementById('addTeamModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      this.isModalOpen = false;
    }
  }

  // Add team
  onSubmit(): void {
    this.teamService.addTeam(this.team).subscribe(
      () => {
        this.loadTeams();
        this.closeModal();
        this.resetTeamForm();
      },
      (error) => console.error('Failed to add team:', error)
    );
  }

  resetTeamForm(): void {
    this.team = {
      id: 0,
      name: '',
      members: 0,
    teamLeader:'',
    };
  }



  

  
  // Open Update Modal
  openUpdateModal(team: Team): void {
    this.selectedTeam = { ...team };

    const modal = document.getElementById('updateTeamModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      this.isUpdateModalOpen = true;
    }
  }

  // Close Update Modal
  closeUpdateModal(): void {
    const modal = document.getElementById('updateTeamModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      this.isUpdateModalOpen = false;
    }

    this.selectedTeam;
  }

  // Update Employee
  onUpdateSubmit(): void {
    if (this.selectedTeam) {
      this.teamService.updateTeam(this.selectedTeam.id, this.selectedTeam).subscribe(
        () => {
          this.loadTeams();
          this.closeUpdateModal();
        },
        (error) => console.error('Failed to update team:', error)
      );
    }
  }

  
  fetchEmployees(): void {
    this.teamService.getTeams().subscribe(
      (data) => {
        this.teams = data; // Assuming `employees` is an array
      },
      (error) => {
        console.error('Error fetching teams:', error);
      }
    );
  }
  
  deleteTeam(id: number): void {
    if (confirm('Are you sure you want to delete this team?')) {
      this.teamService.deleteTeam(id).subscribe(
        () => {
          console.log(`team with ID ${id} deleted successfully.`);
          this.fetchEmployees(); // Refresh the team list after deletion

        },
        (error) => {
          console.error('Error deleting team:', error);
        }
      );
    }
  }

}
