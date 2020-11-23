import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
        const response = await fetch('/stats');
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
    <body className="bg-primary">
      {dataLoaded ? (
        <div className="bg-primary">
          <h1 className="text-center">Statistics</h1>
          <div className="container d-flex">
            <h3 className="">Most Played Trivias</h3>
          </div>
          <div className="container d-flex">
            <table className="table-dark table" style={{ margin: '0 auto' }}>
              <thead>
                <tr>
                  <th>Trivia Id</th>
                  <th>Times Played</th>
                </tr>
              </thead>
              <tbody>
                {mostPlayedTrivias &&
                  mostPlayedTrivias.map((trivia, index) => (
                    <tr key={`index-${index}`}>
                      <td>{trivia.fk_trivia}</td>
                      <td>{trivia.trivias_played}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <h3 className="text-center">Most Difficult Questions</h3>
          <div className="container d-flex">
            <table className="table-dark table" style={{ margin: '0 auto' }}>
              <thead>
                <tr>
                  <th>Question Id</th>
                  <th>Description</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {mostDifficultQuestions &&
                  mostDifficultQuestions.map((question, index) => (
                    <tr key={`index-${index}`}>
                      <td>{question.fk_question}</td>
                      <td>{question.description}</td>
                      <td>{question.score}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <br />
          <div className="container d-flex center">
            <div>
              <strong>Total Players:</strong> {totalPlayers ? totalPlayers : 'No players yet'}
            </div>
            <div>
              <strong>Average Players Per Trivia:</strong>{' '}
              {averagePlayersPerTrivia ? averagePlayersPerTrivia : 'No players yet'}
            </div>
            <div>
              <strong>Total Games:</strong> {totalGames ? totalGames : 'No games yet'}
            </div>
            <br />
          </div>
          <br />
          <br />
          <div className="container d-flex center">
            <Link to="/">
              <button className="btn btn-xl bg-secondary text-center text-white border-white">
                Back
              </button>
            </Link>
          </div>
        </div>
      ) : (
        'Loading...'
      )}
    </body>
  );
};

export default DashBoard;
