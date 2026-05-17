import { useNavigate } from "react-router-dom";

import {
  motion
} from "framer-motion";

export default function LandingPage() {
  const navigate =
    useNavigate();

  return (
    <div className="landing">

      <div className="landing-container">

        <motion.div
          initial={{
            opacity: 0,
            y: 40
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
        >

          <h1>
            AI Smart
            <br />
            Task Planner
          </h1>

          <p>
            Plan smarter.
            Track faster.
            Execute better.
          </p>

          <button
            onClick={() =>
              navigate(
                "/dashboard"
              )
            }
          >
            Start Planning
          </button>

        </motion.div>

        <motion.div
          className="mockup"
          initial={{
            opacity: 0,
            x: 100
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
        >
          <div />
          <div />
          <div />
          <div />
        </motion.div>

      </div>

    </div>
  );
}