import { initializeApp } from "firebase/app";

import {
  getAuth
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBPr0uLhWBjL2jfR9S2csfJn_xRY4ixhY4",
  authDomain: "ai-smart-task-planner.firebaseapp.com",
  projectId: "ai-smart-task-planner",
  storageBucket: "ai-smart-task-planner.firebasestorage.app",
  messagingSenderId: "227988954053",
  appId: "1:227988954053:web:41197f5b0dbc79a7b789ac"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;