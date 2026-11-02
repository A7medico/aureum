import app from "./app.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✨ AUREUM Core Advisory Engine listening at http://localhost:${PORT}`);
});
