# The Shortlist Blog Client

A Typescript React Frontend Client for Food Fascinations!

Check out the blog here: [The Shortlist](https://the-shortlist.herokuapp.com/).

## To Run Locally

### Must have the server app `the-shortlist-server` running as well
Can find it here: [the-shortlist-server](https://github.com/ehirshfield/the-shortlist-server)

In the client project directory, you can then run:

### `npm run start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### If making changes to the GraphQL Schemas on the server side, you will need to generate the schemas and interfaces with the following commands:

To automatically create the new graphql schema

### `npm run codegen:schema`

Then to generate the interfaces

### `npm run codegen:generate`
