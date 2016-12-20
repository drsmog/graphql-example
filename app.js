var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Mutation {
  	updatePersonInfo(personalId: String): String
  }
	
  type Query {
    hello: String,
    foo: String,
    person: Person,
    findPersonByName(name: String, lastName: String): Person

  }

  # @me could represent the currently logged in viewer.
  type Person {
  	description: String,
  	# blasdkfmsldkf
  	firstName: String,
  	lastName: String,
  	children: [Person],
  	parents: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
    hello: () => {
        return 'Hello world!';
    },
    foo: function() {
        return 'madafaka';
    },
    person: () => {
        return {
        	description: 'ssssssss',
            firstName: 'irakli',
            lastName: 'svanidze',
            children: [
                { firstName: 'aaaa', lastName: 'aaaa' },
                { firstName: 'bbbb', lastName: 'bbbb' },
                { firstName: 'ccccc', lastName: 'ccccc' }
            ]

        };
    },
    findPersonByName: function (args,a,b,c) {
    	console.log(args,a,typeof(a));
    	return {
            firstName: 'irakli',
            lastName: 'svanidze'
        };
    },
    updatePersonInfo:function (args) {
    	console.log(args);
    	return "holllaaa";
    }
};



var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
    
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
