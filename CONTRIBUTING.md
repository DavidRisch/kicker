# Formatting

All JavaScript files must be formatted according to [Standard JS ](https://standardjs.com/).
- For WebStorm: Settings | Editor | Code style | JavaScript | Set from... | JavaScript Standard Style [source](https://plugins.jetbrains.com/plugin/8396-clangformatij)
- For Visual Studio Code: [Plugin](https://marketplace.visualstudio.com/items?itemName=chenxsan.vscode-standardjs)

Executing `standard --fix` should produce no output.

All other file types may be formatted by any formatter, each file must be consistent within itself.

# Workflow

- Choose a task from the [list of tasks](https://github.com/DavidRisch/kicker/wiki/Tasks)
- Assign that task to yourself (enter your name in the table)
- Create a branch (see [Naming conventions](#naming-conventions))
- Work on the task by pushing commits to your branch
- Create a pull request
- Someone else reviews and merges your changes. Once merged they are deployed to the server automatically.

The workflow is identical for issues. Please mention the issue in the pull request like this: `fixes #123`. This automatically links the pr to the issue.

The description of pull requests should be detailed enough to be helpful resource for the documentation team.

## Creating a new page

- Select an existing page as a base, this example uses `group_creation`
- Pick a short but descriptive name for your page, this example uses `my_page`
- Copy `html/group_creation.html` to `html/my_page.html`
- Copy `page/group_creation.js` to `page/my_page.js`
- Edit `page/my_page.js`:
  - Replace the path parameter of `readFile` with your new path `html/my_page.html`
  - Replace the title parameter of `create_html` with your new title `Meine Seite`
- Add to `page/page.js`:
  ```js
  app.get('/my_page', function (req, res) {
    require('./my_page').page(req, res)
  })
  ```
- Start the server (see [Installation](#installation)), open `localhost:8080/my_page`.  
  You should see a copy of the page you based yours on.
- Now you can modify the previously copied files to create the desired page
- If your page requires a new css file create it in the `css/` directory and 
include it by adding it to the list of css files passed to the `create_html` function in `page/my_page.js`.

# Naming conventions

Git branches must consist only of lowercase letters, numbers and underscores. They must follow one of these patterns:
- `task_X_Y_*` A branch fixing task x.y, include a very short description. Example: `task_2_4_unique_username`
- `iss_X_*` A branch fixing issue number X, include a very short description. Example: `iss_123_sql_injection`

Git commits must start with a capital letter and should describe the content of the commit. [Helpful guide](https://chris.beams.io/posts/git-commit/)

File names should consist only of lower case letters and underscores.

All js variables must be written in `camelCase`. Variables starting with a `_` are private and should not be accessed from outside of a class.

`module.exports` must be written in `snake_case`. The definition of `module.exports` should be located at the bottom of a file.

Api parameters and responses must be written in `camelCase`.

# Directory structure

- _api_: js files for backend post requests, returns json
- _css_: all css files
- _html_: all html files, mostly for use in _pages/_
- _js_: js files for use in the client browser
- _page_: js files generating html on get requests
- _src_: js files for importing in other javascript files

# Installation

- Install nodejs:  
  https://nodejs.org/en/download/
- Clone this repository:  
  ```git clone https://github.com/DavidRisch/kicker.git```  
  Run the following commands from inside the repo.
- Run npm (package manager that comes with nodejs):  
  `npm install`  
  This step must be repeated when dependencies are added to `package.json` (by yourself or by others).
- Run nodejs:  
  `nodejs app.js`  
  This step should be repeated after changes to any *.js or *.env files but it is not required for changes to *.html and *.css files.
- Open in your browser:  
  `localhost:8080`
- Install a local version of the database:
  - Install a mysql server, most versions will work (known working: `10.1.44-MariaDB-0ubuntu0.18.04.1`). 
  - Download `kicker.sql` from http://88.198.69.104/dump_db.
  - Create a new schema `kicker` (with collation `utf8_general_ci`).
  - Run `kicker.sql` with the `kicker` schema selected. In MySQL Workbench: File | Run SQL Script...
  - Enter valid credentials for the db in `config/config.env`.
  
