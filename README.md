# Next DnD FormBuilder

Next DnD FormBuilder is a drag-and-drop form builder built with Next.js, Prisma, and TypeScript. This project allows users to create dynamic forms by simply dragging and dropping form elements onto a canvas. Below is an overview of the project structure and setup instructions.

## Prerequisites

Before running the project, ensure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/devmahmud/next-dnd-formbuilder.git
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

3. For authentication, This project uses [Clerk](https://clerk.com/). Create a free clerk account and from `Developers/API Keys` you will get Publishable key and secret key for the Next.js project

3. Set up environment variables:

   Create a `.env` file in the root directory and provide the following variables:

   ```plaintext
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=

   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

   POSTGRES_PRISMA_URL=postgresql://username:password@hostname:port/database_name
   POSTGRES_URL_NON_POOLING=postgresql://username:password@hostname:port/database_name

   ```

   Ensure to replace the placeholders with your actual values.

4. Initialize Prisma:

   ```bash
   npx prisma generate
   # or
   yarn prisma generate
   ```

5. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Scripts

- `dev`: Start the development server.
- `build`: Build the Next.js application for production.
- `start`: Start the production server.
- `lint`: Lint the code using Next.js linting configurations.
- `postinstall`: Generate Prisma client.

## Project Structure

- `app/`: Contains Next.js pages.
- `public/`: Contains static assets.
- `components/`: Contains All the react components for the project.
- `prisma/`: Contains Prisma schema and migrations.
- `lib`: Contains helper functions.
- `schema`: Contains zod form schema.

## Usage

- Visit the homepage to access the drag-and-drop form builder interface.
- Drag form elements from the toolbox onto the canvas to create your form.
- Customize form element properties as needed.
- Save the form configuration and integrate it with your application.

Feel free to modify and extend the project according to your requirements!

## License

This project is licensed under the [MIT License](LICENSE).