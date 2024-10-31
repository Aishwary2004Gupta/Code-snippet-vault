# Hackathon Submission: CodeSnippet Vault

## GitHub handles of Team Member
@Aishwary2004Gupta

## Project Title
**CodeSnippet Vault**

## Project Description    
**CodeSnippet Vault** is a platform that allows users to securely store, manage, and share code snippets. Users can authenticate via GitHub, add code snippets with language tags, vote on snippets, and perform basic code quality checks on stored snippets.

## Inspiration behind the Project  
This project was inspired by the need for developers to have a centralized place to store reusable code snippets. Additionally, having a quality analysis feature and voting mechanism makes it a powerful community-driven repository.

## Tech Stack    
- **Frontend**: Next.js with TypeScript, Tailwind CSS, shadcn/ui components
- **Backend**: Appwrite services (Database, Authentication, Functions)
- **OAuth**: GitHub for user authentication
- **Deployment**: Platforms like Vercel or Netlify

## Project Repo  
[CodeSnippet Vault Repository](https://github.com/Aishwary2004Gupta/Code-snippet-vault)

## Demo Video/Photos  



### Anything Else You Want To Share With Us?

#### Database
- Create a "codeSnippets" database and add a collection "snippets" with the following attributes:
  - **userId** (string), **title** (string), **code** (string), **language** (string), **votes** (integer), **timestamp** (datetime)
- Set permissions: read for all, write for authenticated users.

#### Authentication
- Enable OAuth2 with GitHub for user login. Set up a GitHub OAuth app and add the credentials to Appwrite.

#### Functions (Optional)
- Create a function "analyzeCodeQuality" using Node.js or Python, allowing code quality checks.
