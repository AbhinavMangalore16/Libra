# Libra


---

## Overview

Libra is a powerful AI/ML-powered web application designed to revolutionize your creativity and productivity. With features like a chatbot, code generator, image and video generation, and a PDF-based Q&A system, Libra offers tools to assist users in various domains, leveraging cutting-edge AI capabilities.

---

## Features

- **Chatbot**: Engage in intelligent, natural conversations powered by advanced NLP models. 🧠
- **CodeKraft**: Generate efficient code snippets seamlessly for your projects.
- **Visionary**: Create stunning AI-generated visuals *(coming soon)*. 🎨
- **StoryForge**: Generate captivating AI-powered videos *(work in progress)*. 🎥
- **SoundWave**: Compose beautiful AI-assisted music *(coming soon)*. 🎵
- **AskPDF**: Ask questions about uploaded PDFs for instant insights *(work in progress)*. 📄

---

## Getting Started

To run the project locally:

1. **Clone the repository**

   ```bash
   git clone https://github.com/AbhinavMangalore16/libra.git
   cd libra
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   This project requires a `.env` file containing sensitive environment variables. To obtain the `.env` file, contact the author **Abhinav Mangalore** at [abhinavm16104@gmail.com](mailto\:abhinavm16104@gmail.com). Place the `.env` file in the root directory.

4. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

---

## Running with Docker

The Docker image for this application is also available on [Docker Hub](https://hub.docker.com/repository/docker/abhinavmangalore/libra/general). You can pull it directly using the command:

```bash
docker pull abhinavmangalore/libra
```

To run the application using Docker, follow these steps:

1. **Obtain the ********`.env`******** File**
   This project requires a `.env` file for environment-specific configurations. **The ********`.env`******** file is not included in the repository**. Contact the author to obtain it and place it in the root directory.

2. **Build the Docker Image**

   ```bash
   docker build -t libra-app .
   ```

3. **Run the Docker Container**
   Use the following command to run the application:

   ```bash
   docker run --rm -it --env-file .env -p 3000:3000 libra-app
   ```

   - **`--rm`**: Automatically removes the container after it stops.
   - **`-it`**: Runs the container interactively.
   - **`--env-file .env`**: Loads environment variables from the `.env` file.
   - **`-p 3000:3000`**: Maps port 3000 of the container to port 3000 on the host.

4. **Access the Application**
   Open [http://localhost:3000](http://localhost:3000) in your browser to interact with Libra.

---

## Deployment

The easiest way to deploy Libra is via the [Vercel Platform](https://vercel.com/new?utm_medium=default-template\&filter=next.js\&utm_source=create-next-app\&utm_campaign=create-next-app-readme). For details, check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment).

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs): Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn): Interactive tutorials for Next.js.
- [Framer Motion](https://www.framer.com/motion/): Powering Libra’s animations.

---

## Author

**Abhinav Mangalore**

- [Twitter](https://x.com/PhoenixRFTA16)
- [Facebook](https://www.facebook.com/profile.php?id=100008360348028)
- [LinkedIn](https://www.linkedin.com/in/abhinav-mangalore-919b0a193/)

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Disclaimer

The `.env` file contains sensitive credentials and configurations. Ensure it is kept secure and shared only with authorized individuals.

---

Thank you for using Libra! Your feedback and contributions are welcome.
