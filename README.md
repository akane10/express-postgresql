# EXPRESS POSTGRESQL BOILERPLATE

This boilerplate is integrated with eslint airbnb-base and prettier and using jest for testing library. there's also some basic functional programming stuff (in helpers) like curry, pipe, compose, composePromise, pipePromise, you might need ramda library for beyond. This is not MVC approach, in fact, is referenced to [nodebestpractices](https://github.com/i0natan/nodebestpractices)

## File Structure

```
|-- api
    |-- components
        |-- articles
            |-- controller
                |-- create.js
            |-- ArticleModel.js // model is defined in each component
            |-- index.js // article routes
    |-- helpers
        |-- tests // unit test for helpers
            |-- index.test.js
        |-- fp.js
        |-- index.js
    |-- polices // middleware
        |-- verifyToken.js
    |-- index.js // all routes
    |-- models.js // all models in each components are being centralized here
|-- config
    |-- config.js
    |-- db.js
    |-- dbConfig.js
|-- db
    |-- migrations
        |-- XXXXXXX-some-migration.js
    |-- seeders
        |-- XXXXXXX-some-seeder.js
|-- tests // integration or routes tests
    |-- articles
        |-- create.test.js
    |-- data.js
|-- .env
|-- .eslintignore
|-- .eslintrc.json
|-- .gitignore
|-- .prettierrc
|-- .sequelizerc
|-- app.js
|-- package.json
|-- server.js
|-- yarn.lock
```

## Up and Running

- create `.env` and `.env.test` file (`.env` for development)
- run `yarn` or `npm install` (delete `yarn.lock` first if you want to use `npm`)
- add this to `.env` and `.env.test` file (`NODE_ENV=test` for `.env.test`)
  ```
    NODE_ENV=development
    DBNAME=your_db_name
    DBUSER=your_db_user
    DBPASSWORD=your_db_password
    SECRETKEY=SECRETKEY
  ```
- and you're ready to go, run some commands

  ```
  yarn test // run jest test
  yarn dev // run nodemon along with dotenv
  yarn start // run node server
  ```

## Sequelize Migrations

For more documentation about sequelize [migration](https://sequelize.org/master/manual/migrations.html)

But here is quick start :

- run `npx sequelize-cli migration:generate --name create-article`

  - it creates file `db/migrations/{timestamps}-create-article.js`

- go ahead edit `db/migrations/{timestamps}-create-article.js` file

  ```
  /* eslint-disable no-unused-vars */

  module.exports = {
    up: (queryInterface, Sequelize) => {
      /*
        Add altering commands here.
        Return a promise to correctly handle asynchronicity.

        Example:
        return queryInterface.createTable('users', { id: Sequelize.INTEGER });
      */

      return queryInterface.createTable('articles', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true
        },
        title: {
          allowNull: false,
          type: Sequelize.STRING
        },
        content: {
          type: Sequelize.TEXT
        },
        categories: {
          type: Sequelize.ARRAY(Sequelize.STRING),
          allowNull: false
        },
        isPublish: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      });
    },

    down: (queryInterface, Sequelize) => {
      /*
        Add reverting commands here.
        Return a promise to correctly handle asynchronicity.

        Example:
        return queryInterface.dropTable('users');
      */
      return queryInterface.dropTable('articles');
    }
  };

  ```

- run `yarn migrate`
- run `npx sequelize-cli seed:generate --name demo-article`
  - it creates file `db/seeders/{timestamps}-demo-article`
- edit `db/seeders/{timestamps}-demo-article` file

  ```
  /* eslint-disable no-unused-vars */

  module.exports = {
    up: (queryInterface, Sequelize) => {
      /*
        Add altering commands here.
        Return a promise to correctly handle asynchronicity.

        Example:
        return queryInterface.bulkInsert('People', [{
          name: 'John Doe',
          isBetaMember: false
        }], {});
      */

      return queryInterface.bulkInsert(
        'articles',
        [
          {
            id: 1,
            title: 'some title',
            content: 'some contents',
            categories: ['category', 'category1'],
            isPublish: true,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ],
        {}
      );
    },

    down: (queryInterface, Sequelize) => {
      /*
        Add reverting commands here.
        Return a promise to correctly handle asynchronicity.

        Example:
        return queryInterface.bulkDelete('People', null, {});
      */
      return queryInterface.bulkDelete('articles', null, {});
    }
  };

  ```

- add finally run `yarn seedAll`

## Depedencies

- main
  - body-parser
  - cors
  - express
  - morgan
  - pg
  - pg-hstore
  - sequelize
- dev
  - dotenv
  - eslint
  - eslint-config-airbnb-base
  - eslint-config-prettier
  - eslint-plugin-import
  - eslint-plugin-prettier
  - jest
  - prettier
  - supertest
