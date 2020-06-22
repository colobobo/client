import React, { FC } from "react";

// styles
import "./index.scss";

const InterfaceLeaderboardTable: FC = () => {
  /* ----------------------------------------- */
  /* ----- WAITING FOR REAL DATA FROM DB ----- */
  /* ----------------------------------------- */

  // return

  return (
    <table className="leaderboard-table">
      <tbody className="leaderboard-table__list">
        <tr className="leaderboard-table__team">
          <td>Superhéros</td>
          <td>6 joueurs</td>
          <td>600</td>
        </tr>
        <tr className="leaderboard-table__team">
          <td>Les Boulets</td>
          <td>4 joueurs</td>
          <td>320</td>
        </tr>
        <tr className="leaderboard-table__team">
          <td>Totally Spies</td>
          <td>3 joueurs</td>
          <td>289</td>
        </tr>
        <tr className="leaderboard-table__team">
          <td>DreamTeam</td>
          <td>3 joueurs</td>
          <td>123</td>
        </tr>
      </tbody>
    </table>
  );
};

export default InterfaceLeaderboardTable;
