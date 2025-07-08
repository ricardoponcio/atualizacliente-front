# AtualizaCliente Frontend

This repository contains the frontend for the AtualizaCliente platform. It provides a web interface for managing clients, projects, updates, file attachments, and email notifications.

## Technologies

- React
- JavaScript (ES6+)
- SCSS
- Webpack
- Babel

## Features

- User registration and authentication
- Client management (create, update, delete)
- Project management (create, update, delete)
- Project updates with file attachments
- Email notifications and configuration
- S3-compatible file storage configuration
- Responsive and user-friendly interface

## Project Structure

- `src/`
  - `api/`: API service modules for backend communication
  - `components/`: Reusable UI components and forms
  - `context/`: React context (e.g., authentication)
  - `pages/`: Application pages (private and public)
  - `utils/`: Utility functions
  - `App.jsx`: Main application component
  - `index.js`: Entry point

## How to Run Locally

1. **Prerequisites**:
   - Node.js (v16+ recommended)
   - npm or yarn

2. **Install dependencies**:
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Start the development server**:
   ```sh
   npm start
   # or
   yarn start
   ```
   The frontend will be available at `http://localhost:3000` (or the port specified in your configuration).

4. **Configuration**:
   - Adjust API endpoints or environment variables as needed in the `api/` folder or via `.env` files.

## Main Pages & Routes

- `/login` — User authentication
- `/setup` — Initial user setup
- `/clientes` — Client management
- `/projetos` — Project management
- `/projetos/detalhe` — Project details and updates
- `/projetos/atualizacoes/nova` — Create new project update
- `/projetos/atualizacao/detalhe` — Project update details
- `/configuracaoEmail` — Email configuration
- `/configuracaoS3` — S3 storage configuration
- `/atualizacao` — Public update consultation
- `/validar` — Public client validation

## Notes

- This frontend is designed to work with the [AtualizaCliente API](../atualizacliente-api).
- For usage details and payload examples, see the backend documentation or the main project README.

---