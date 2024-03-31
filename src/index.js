import express from 'express';

const main = async () => {
    const app = express();

    app.listen(4000, () => {
        console.log("Server initialized on localhost:4000")
    });
}

main().catch((err) => {
    console.error("Error setting up express server")
});