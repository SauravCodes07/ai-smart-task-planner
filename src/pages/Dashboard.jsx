import { useState } from "react";

import {
  signInWithGoogle,
  logoutUser
} from "../firebase/auth";

import {
  motion
} from "framer-motion";

import AIChatbot from "../components/AIChatbot";

export default function Dashboard() {

  const [user, setUser] =
    useState(null);

  const [task, setTask] =
    useState("");

  const [tasks, setTasks] =
    useState([]);

  const login =
    async () => {
      const data =
        await signInWithGoogle();

      setUser(data);
    };

  const addTask =
    () => {
      if (!task.trim())
        return;

      setTasks([
        ...tasks,
        {
          text: task,
          completed: false
        }
      ]);

      setTask("");
    };

  const completeTask =
    (index) => {
      const updated =
        [...tasks];

      updated[
        index
      ].completed =
        !updated[
          index
        ].completed;

      setTasks(
        updated
      );
    };

  const deleteTask =
    (index) => {
      const updated =
        tasks.filter(
          (
            _,
            i
          ) =>
            i !==
            index
        );

      setTasks(
        updated
      );
    };

  if (!user) {
    return (
      <div className="login-screen">

        <h1>
          Sign In
        </h1>

        <button
          onClick={
            login
          }
        >
          Continue with Google
        </button>

      </div>
    );
  }

  const completedCount =
    tasks.filter(
      (t) =>
        t.completed
    ).length;

  const progress =
    tasks.length === 0
      ? 0
      : Math.round(
          (
            completedCount /
            tasks.length
          ) *
            100
        );

  return (
    <div className="dashboard">

      <div className="dashboard-container">

        <div className="topbar">

          <div className="brand">
            AI Smart Task Planner
          </div>

          <div className="profile">

            <img
              src={
                user.photoURL
              }
              alt=""
            />

            <div>

              <h4>
                {
                  user.displayName
                }
              </h4>

              <p>
                {
                  user.email
                }
              </p>

            </div>

            <button
              onClick={
                logoutUser
              }
            >
              Logout
            </button>

          </div>

        </div>

        <div className="stats-grid">

          <div className="stat-card">
            <h3>
              Tasks
            </h3>

            <h1>
              {
                tasks.length
              }
            </h1>
          </div>

          <div className="stat-card">
            <h3>
              Completed
            </h3>

            <h1>
              {
                completedCount
              }
            </h1>
          </div>

          <div className="stat-card">
            <h3>
              Progress
            </h3>

            <h1>
              {progress}%
            </h1>
          </div>

        </div>

        <div className="main-layout">

          <div>

            <div className="task-input">

              <input
                value={
                  task
                }
                onChange={(
                  e
                ) =>
                  setTask(
                    e.target
                      .value
                  )
                }
                placeholder="Add new task..."
              />

              <button
                onClick={
                  addTask
                }
              >
                Add Task
              </button>

            </div>

            <div className="task-list">

              {tasks.map(
                (
                  item,
                  index
                ) => (
                  <motion.div
                    key={
                      index
                    }
                    className="task-card"
                    whileHover={{
                      scale:
                        1.02
                    }}
                  >

                    <div
                      className={
                        item.completed
                          ? "completed"
                          : ""
                      }
                    >
                      {
                        item.text
                      }
                    </div>

                    <div className="task-actions">

                      <button
                        onClick={() =>
                          completeTask(
                            index
                          )
                        }
                      >
                        ✓
                      </button>

                      <button
                        onClick={() =>
                          deleteTask(
                            index
                          )
                        }
                      >
                        ✕
                      </button>

                    </div>

                  </motion.div>
                )
              )}

            </div>

          </div>

          <AIChatbot />

        </div>

      </div>

    </div>
  );
}