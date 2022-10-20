import { resolve } from 'path';
import { Octokit } from 'octokit';
import dotenv from 'dotenv';

// .....................................
// App set up
// .....................................

// Expose keys in .env file
dotenv.config();

// create octokit instance from Github API
// token taken from .env
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// .....................................
//            Functions
// .....................................

/**
 * @desc function to call when client hits search user POST request
 * */
const callGithubSearch = async (request, response) => {
  console.log('post: attempting search');

  const { searchParams } = request.body;
  let query = searchParams.name;

  // define the valid optional search params
  // Can be extended in the future to expand scope of search feature
  const validOptionalParams = ['location'];

  // add optional params into query string
  validOptionalParams.forEach((param) => {
    if (param in searchParams) {
      query += ` ${param}:${searchParams[param]}`;
    }
  });

  // try call to Github search API
  try {
    const results = await octokit.request('GET /search/users', { q: `${query}` });
    response.send(results.data.items);
  } catch (error) {
    console.log('error', error);
    response.send('error');
  }
};

// .....................................
//               Routes
// .....................................

export default function routes(app) {
  // Root route renders Webpack-generated main.html file
  app.get('/', (request, response) => {
    response.sendFile(resolve('dist', 'main.html'));
  });

  // send search parameters to backend server
  app.post('/searchUser', callGithubSearch);
}
