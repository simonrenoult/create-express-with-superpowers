Create Express With Superpowers
===

> Generate a new project based on [express-with-superpowers](https://github.com/simonrenoult/express-with-superpowers)


Usage
---
```bash
$ npm init express-with-superpowers ./example && cd ./example
```


CLI
---
```
Usage: npm init express-with-superpowers [options] <project-location>

Options:

  -V, --version                    output the version number
  -D, --description [description]  add a description
  -A, --author [author]            add an author
  -K, --keywords <keywords>        a list of keywords (ex: foo,bar,baz)
  -h, --help                       output usage information
```

Content generated
---
```
├── bin
│   ├── start.js
│   └── stop.js
├── license.txt
├── package.json
├── package-lock.json
├── public
│   └── favicon.ico
├── readme.md
├── src
│   ├── application.js
│   ├── heartbeat
│   │   ├── index.js
│   │   ├── routes-handlers.js
│   │   ├── routes.js
│   │   ├── service.js
│   │   └── swagger.js
│   └── shared
│       ├── api-registrar.js
│       ├── configuration.js
│       ├── logger.js
│       ├── middlewares
│       │   ├── add-dedicated-logger-to-each-request.js
│       │   ├── add-request-id.js
│       │   ├── handle-errors.js
│       │   ├── handle-unknown-routes.js
│       │   ├── index.js
│       │   ├── log-exiting-response.js
│       │   ├── log-incoming-request.js
│       │   └── support-boom-in-response.js
│       └── swagger-base.js
└── test
    └── e2e
        ├── heartbeat.js
        └── hook.js

```


Created by
---

- Simon Renoult


License
---

See license.txt
