import { Component } from '@angular/core';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent {
  // Define the employee object with all necessary properties

    // Define the property to track modal state
    isModalOpen = false;

  clients = [
    {
      name: 'John ',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      type: 'Software Engineer',
      
    },
    {
      name: 'John ',
      email: 'jane.smith@example.com',
      phone: '987-654-3210',
      type: 'Project Manager',
      
    }
  ];

  // Add a property for new client
 client = {
    name: '',
    email: '',
    phone: '',
    type: '',
  };

  

  // Method to open the modal
  openModal(): void {
    const modal = document.getElementById('addClientModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      this.isModalOpen = true; // Show backdrop
    }
  }

  // Method to close the modal
  closeModal(): void {
    const modal = document.getElementById('addClientModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      this.isModalOpen = false; // Hide backdrop
    }
  }

  // Method to handle form submission
  onSubmit(): void {
    // Push the new employee to the employees array
    this.clients.push({ ...this.client });  // Using spread operator to avoid reference issues
  
    // Optionally clear the form after submitting
    this.client = {
      name: '',
      email: '',
      phone: '',
      type: '', 
    };
  
    // Close the modal after submission
    this.closeModal();
  }
}
