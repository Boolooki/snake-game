🐍 Snake Game <br>
A modern twist on the classic Snake arcade game — built with Next.js, TypeScript, and Tailwind CSS for a sleek, responsive experience.

🚀 Features<br>
Playable directly in the browser

Built with Next.js for fast performance and server-side rendering

Written in TypeScript for type safety and maintainability

Styled using Tailwind CSS

Uses next/font to automatically load and optimize the Geist font

📦 Tech Stack<br>
Technology	Purpose
Next.js	Web framework
TypeScript	Static typing
Tailwind CSS	Styling
Vercel	Deployment platform
🛠️ Getting Started<br>
To run the project locally:

bash
npm install
npm run dev
Or use your preferred package manager:

bash
yarn dev
<br>or<br>
pnpm dev
<br>or<br>
bun dev
Then open http://localhost:3000 in your browser.
or<br>
https://snake-game-seven-kappa.vercel.app/

📁 Project Structure<br>
Code<br>
 ┣─ public/              # Static assets<br>
 ┣ 📦src<br>
 ┣ 📂app<br>
 ┃ ┣ 📜favicon.ico<br>
 ┃ ┣ 📜globals.css<br>
 ┃ ┣ 📜layout.tsx<br>
 ┃ ┗ 📜page.tsx<br>
 ┣ 📂components<br>
 ┃ ┣ 📜Board.tsx<br>
 ┃ ┣ 📜Food.tsx<br>
 ┃ ┣ 📜Score.tsx<br>
 ┃ ┗ 📜Snake.tsx<br>
 ┣ 📂constants<br>
 ┃ ┗ 📜gameConstants.ts<br>
 ┣ 📂hooks<br>
 ┃ ┗ 📜useSnakeGame.ts<br>
 ┣ 📂types<br>
 ┃ ┗ 📜index.ts<br>
 ┗ 📂utils<br>
 ┃ ┗ 📜gameUtils.ts<br>
 ┣── README.md            # Project documentation<br>
 ┣── package.json         # Dependencies and scripts<br>
 ┣── tsconfig.json        # TypeScript configuration<br>
 ┣── next.config.ts       # Next.js configuration<br>
 
🌐 Deployment
Deploy easily with Vercel, the platform built by the creators of Next.js..

📄 License
No license specified yet. Consider adding one to clarify usage and contributions.
