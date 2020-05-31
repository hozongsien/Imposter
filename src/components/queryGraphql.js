/* global fetch */

const queryGraphql = async (graphqlQuery) => {
  const baseEndPoint = 'http://localhost:5000/graphql';
  const requestBody = {
    query: graphqlQuery,
  };

  const response = await fetch(baseEndPoint, {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const fetchedData = await response.json();
  return fetchedData;
};

export default queryGraphql;
