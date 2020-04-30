# Formatting

All JavaScript files must be formatted according to [Standard JS ](https://standardjs.com/).
- For WebStorm: Settings | Editor | Code style | JavaScript | Set from... | JavaScript Standard Style [source](https://plugins.jetbrains.com/plugin/8396-clangformatij)
- For Visual Studio Code: [Plugin](https://marketplace.visualstudio.com/items?itemName=chenxsan.vscode-standardjs)

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