# Airtable JSON DB Schema Generator

This is a Next.js application that generates database schemas and workflows based on user input. It is designed to help project managers quickly design databases for clients.

### Functionality

1.  **Input:** The user provides a text description of the client's business requirements.
2.  **AI Processing:** The application uses the Gemini 2.0 Flash model to analyze the input and identify the relevant entities and relationships.
3.  **Database Understanding:** The application displays the AI's understanding of the database tables and relationships.
4.  **Workflows Generation:** The application generates a list of workflows for each entity, including adding, modifying, deleting, listing, and searching.
5.  **Airtable JSON Generation:** The application generates Airtable API JSON to create the tables and relationships in Airtable, including linked fields to represent relationships between tables.

### How to Use

1.  Clone the repository.
2.  Install the dependencies:

```bash
npm install
```

3.  Create a `.env` file and add your Gemini API key:

```
NEXT_PUBLIC_GEMINI_API_KEY=YOUR_API_KEY
```

4.  Run the development server:

```bash
npm run dev
```

5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
6.  Enter a description of the client's business requirements in the input area.
7.  Click the "Generate" button.
8.  Review the AI's understanding of the database, the generated workflows, and the Airtable API JSON.

### Technology Stack

*   Next.js
*   Tailwind CSS
*   Shadcn
*   @google/generative-ai

### Deployment

The application is deployed to Vercel.
