`Document the problems encountered in react and the attempted solutions and some new features`

[声明]： 以下结论来源于https://profy.dev/article/react-tech-stack

## React Tech Stack

> 1 most popular React framework

Next.js

> 2 most popular React state management library

Redux: Only the native Context API seems to get close; along with RTK, RTK-query

> 3 popular React fetching library

react-query or Apollo: The problem with Apollo: It’s built for GraphQL APIs.

I would recommend not hand-writing data fetching code no matter what you're using. If you're already using Redux, you should probably use RTK Query. If you're using just React, you should probably look at React Query.

> 4 most popular React form library

React Hook Form. or Formik: Formik closely followed by React Hook Form. But it's obvious that the latter is quickly increasing adoption.

> 5 most popular React UI library

styled-components or MUI

> 6 Most popular developer tools used with React

1. Prettier (for code formatting)
2. ESLint (to catch problematic patterns)
3. TypeScript (for type checking)

> 7 Most popular React testing frameworks and tools

1. Jest (as most popular React testing framework)
2. React Testing Library (as most popular React integration testing lib)
3. Cypress (as most popular end-to-end testing tool)
4. Storybook (as most popular React UI testing and documentation tool)

> 8 Most popular React developer workflows

1. Create a new branch from the main branch.
2. Commit your code on this branch and push it to the remote repo (e.g. on GitHub).
3. Open a Pull Request (aka Merge Request) in the remote repo.
4. Run linter, type checks, and tests.
5. Let your team members review your code.
6. Merge the branch into the main branch.
