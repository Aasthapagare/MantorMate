# TODO - Register Form Implementation

## Task: Make login and register pages properly according to backend DTOs

### Files to Edit:
- [ ] src/components/RegisterForm.jsx - Complete rewrite with proper form fields and validation

### RegisterForm.jsx Implementation:
- [ ] Add enrollmentNumber input field with validation
- [ ] Add name input field with validation
- [ ] Add email input field with validation
- [ ] Add password input field with show/hide toggle
- [ ] Add client-side validation matching backend DTO:
  - enrollmentNumber: required
  - name: required
  - email: required, valid email format
  - password: required
- [ ] Add form submission handler calling authService.registerUser
- [ ] Add error/success message display
- [ ] Add loading state handling

### Status: In Progress
