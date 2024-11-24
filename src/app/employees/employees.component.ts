import { Component } from '@angular/core';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {
  // Define the employee object with all necessary properties

    // Define the property to track modal state
    isModalOpen = false;

  employees = [
    {
      firstname: 'John ',
      lastname : ' Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      position: 'Software Engineer',
      profile: 'Developer',
      status: 'active'
    },
    {
      firstname: 'John ',
      lastname : ' Doe',
      email: 'jane.smith@example.com',
      phone: '987-654-3210',
      position: 'Project Manager',
      profile: 'Management',
      status: 'inactive'
    }
  ];

  // Add a property for new employee
  employee = {
    firstname: '',
    lastname : '',
    email: '',
    phone: '',
    position: '',
    profile: '',
    status: 'active'
  };

  // Method to capitalize the status in the table
  getCapitalizedStatus(status: string): string {
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  }

  // Method to open the modal
  openModal(): void {
    const modal = document.getElementById('addEmployeeModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      this.isModalOpen = true; // Show backdrop
    }
  }

  // Method to close the modal
  closeModal(): void {
    const modal = document.getElementById('addEmployeeModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      this.isModalOpen = false; // Hide backdrop
    }
  }

  // Method to handle form submission
  onSubmit(): void {
    // Push the new employee to the employees array
    this.employees.push({ ...this.employee });  // Using spread operator to avoid reference issues
  
    // Optionally clear the form after submitting
    this.employee = {
      firstname: '',
      lastname : '',
      email: '',
      phone: '',
      position: '',
      profile: '',
      status: 'active'
    };
  
    // Close the modal after submission
    this.closeModal();
  }




   // Track the selected employee for updating
   selectedEmployee: any = null;

   isUpdateModalOpen = false;
 
   // Open the Update Modal with backdrop
  openUpdateModal(employee: any): void {
    this.selectedEmployee = { ...employee }; // Clone employee to avoid direct mutation

    const modal = document.getElementById('updateEmployeeModal');
    const backdrop = document.getElementById('updateModalBackdrop');
    if (modal && backdrop) {
      this.isUpdateModalOpen = true;
      modal.classList.add('show');
      modal.style.display = 'block';

      backdrop.classList.add('show');
      backdrop.style.display = 'block';
    }
  }

  // Close the Update Modal and hide the backdrop
  closeUpdateModal(): void {
    const modal = document.getElementById('updateEmployeeModal');
    const backdrop = document.getElementById('updateModalBackdrop');
    if (modal && backdrop) {
      this.isUpdateModalOpen = false;
      modal.classList.remove('show');
      modal.style.display = 'none';

      backdrop.classList.remove('show');
      backdrop.style.display = 'none';
    }

    this.selectedEmployee = null; // Clear selected employee
  }

  // Submit the Update Form
  onUpdateSubmit(): void {
    // Find and update the employee in the array
    const index = this.employees.findIndex(
      (emp) => emp.email === this.selectedEmployee.email
    );
  
    if (index > -1) {
      this.employees[index] = { ...this.selectedEmployee }; // Update the employee
      this.employees = [...this.employees]; // Replace the array with a new reference
    }
  
    // Close the modal
    this.closeUpdateModal();
  }
  deleteEmployee(employee: any): void {
    // Find the index of the employee in the array
    const index = this.employees.findIndex(
      (emp) => emp.email === employee.email
    );
  
    if (index > -1) {
      this.employees.splice(index, 1); // Remove the employee from the array
    }
  }
  
}
