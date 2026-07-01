# Instructions for Setting Up the Project with OpenCode

1. **Initialize the Project**  
   Open the terminal and execute the following command to initialize the project:

   ```bash
   /init
   ```

   This will create the `AGENTS.md` file and set up the project environment.

2. **Create the Required Directory Structure**  
   Ensure the following directory structure exists:

   ```
   .opencode/
       agents/
   ```

3. **Create the Frontend Agent**  
   Inside the `.opencode/agents/` directory, create a file named `frontend-react-agent.md` with the following description:

   ```
   This agent is responsible for UI and feature creation with knowledge in:
   - Node.js
   - React
   - Redux Toolkit
   - RTK Query
   - Ant Design
   - ESLint
   - Prettier
   ```

4. **Exit the OpenCode Environment**  
   Quit the OpenCode terminal by running:

   ```bash
   exit
   ```

5. **Reopen OpenCode**  
   Reopen the OpenCode environment by running:

   ```bash
   opencode
   ```

   Verify that the `AGENTS.md` file and `.opencode/agents/frontend-react-agent.md` file have been created with the appropriate content.

6. **Run the Frontend Agent**  
   Use the `frontend-react-agent` to execute the following prompt:

   ```plaintext
   Create a simple Home page saying "Hello" with a link to a login page. Do not implement the login page yet.
   ```

7. **Refactor the Project Structure**

```
   Refactor the project to follow the proper feature-slice structure:
   - Move page components into `src/features/<feature>/pages/` directories.
   - Ensure each component uses SCSS modules. Remove any inline styles and create a `*.module.scss` file for its styles.
```

8. **Implement the Login Page**

```
   Create a `Login` page with the following features:
   - A form containing fields for `username/email` and `password`.
   - A `Login` button to submit the form.
```

Change to `Plan` mode in opencode cli and execute the following prompt:

```plaintext
review the code inside `src/features` — is this scalable and maintainable? What about creating a folder per page?
```

expected output:

````Plan for Refactor: Feature-Slice Structure
Objective
Refactor the current flat structure into a feature-based organization where each feature has its own directory containing pages, components, hooks, and API logic.
---
Current Structure (before refactor)
src/
├── pages/
│   ├── Login.tsx
│   ├── Home.tsx
│   ├── Login.module.scss
│   └── Home.module.scss
---
Proposed Structure
src/
├── features/
│   ├── auth/
│   │   ├── pages/
│   │   │   └── login/
│   │   │       ├── index.tsx
│   │   │       └── login.module.scss
│   │   ├── components/
│   │   ├── api/
│   │   └── routes.tsx
│   └── home/
│       ├── pages/
│       │   └── index.tsx
│       └── routes.tsx
---
**Steps to Implement**
#### 1. **Create Feature Directories**
   - Make feature directories for each domain:
     - `src/features/auth/pages/login/`
     - `src/features/home/pages/`
#### 2. **Move Existing Files**
   - Move `Login.tsx` and `Login.module.scss` into `src/features/auth/pages/login/`.
   - Move `Home.tsx` and `Home.module.scss` into `src/features/home/pages/`.
#### 3. **Add `routes.tsx` for Each Feature**
   - Each feature declares its own routes using `RouteConfig`:
     ```typescript
     // src/features/auth/routes.tsx
     import type { RouteConfig } from "@/app/routing/types";
     export const authRoutes: RouteConfig[] = [
       { path: "/login", element: <LoginPage />, guard: "guest" },
     ];
     ```
#### 4. **Update Imports**
   - Update all imports to use the new feature-based paths:
     ```diff
     - import Login from './pages/Login';
     + import Login from '@/features/auth/pages/login';
     ```
#### 5. **Test the Refactor**
   - Ensure the application compiles and runs without errors:
     - Run the dev server `npm run dev` and verify UI functionality of `Home` and `Login`.
   - Check for broken imports.
````

change to `Plan` mode in opencode cli and execute the following prompt:

```plaintext
proceed with the changes
```
