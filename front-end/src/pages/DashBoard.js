import { useState, useEffect } from "react";

const DashBoard = () => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [mostPlayedTrivias, setMostPlayedTrivias] = useState(null);
  const [mostDifficultQuestions, setMostDifficultQuestions] = useState(null);
  const [totalPlayers, setTotalPlayers] = useState(null);
  const [averagePlayersPerTrivia, setAveragePlayersPerTrivia] = useState(null);
  const [totalGames, setTotalGames] = useState(null);

  useEffect(() => {
    if (!dataLoaded) {
      const fetchStats = async () => {
        const response = await fetch("/stats");
        const {
          mostPlayedTrivias: newMostPlayedTrivias,
          mostDifficultQuestions: newMostDifficultQuestions,
          totalPlayers: newTotalPlayers,
          averagePlayersPerTrivia: newAveragePlayersPerTrivia,
          totalGames: newTotalGames,
        } = await response.json();

        setMostPlayedTrivias(newMostPlayedTrivias);
        setMostDifficultQuestions(newMostDifficultQuestions);
        setTotalPlayers(newTotalPlayers);
        setAveragePlayersPerTrivia(newAveragePlayersPerTrivia);
        setTotalGames(newTotalGames);

        setDataLoaded(true);
      };

      fetchStats();
    }
  }, [dataLoaded]);

  return (
    <div>
      <div>Statistics</div>
      <div>
        Most Played Trivias: {mostPlayedTrivias ? mostPlayedTrivias : "0"}
      </div>
      <div>
        Most Difficult Questions:{" "}
        {mostDifficultQuestions ? mostDifficultQuestions : "0"}
      </div>
      <div>Total Players: {totalPlayers ? totalPlayers : "0"}</div>
      <div>
        Average Players Per Trivia:{" "}
        {averagePlayersPerTrivia ? averagePlayersPerTrivia : "0"}
      </div>
      <div>Total Games: {totalGames ? totalGames : "0"}</div>
    </div>
  );
};

export default DashBoard;
