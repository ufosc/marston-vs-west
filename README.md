# Marston-VS-West

## Table of Contents
- [Game Link](#game-link)
- [About the Game](#about-the-game)
- [Future Goals](#future-goals)
- [Controls](#controls)
  - [Player 1](#player-1)
  - [Player 2](#player-2)
- [Tutorial: Running the Game Locally](#tutorial-running-the-game-locally)
  - [Using Python's Built-in HTTP Server](#using-pythons-built-in-http-server)
  - [Using Visual Studio Code (with Live Server Extension)](#using-visual-studio-code-with-live-server-extension)
- [Contributing](#contributing)
- [Maintainers](#maintainers)
- [License](#license)

## Game link
link to playable web version of the game [https://ufosc.github.io/marston-vs-west](https://ufosc.github.io/marston-vs-west)


## About the Game
Marston-VS-West is a simple video game project inspired by the gameplay mechanics of Smash Bros. 
The game revolves around the ongoing debate for the best library at UF. 
This project is made using javascript and the Phaser framework


## Future Goals
For the project include implementing a more refined NPC fighter as well as more items and game modes.


## Controls
#### Player 1:
* A - Walk Left
* D - Walk Right
* E - Punch (pickup item)
* R - Special
* T - Jump
* Y - Block (use item)

#### Player 2:
* Left Arrow - Walk Left
* Right Arrow - Walk Right
* I - Punch (pickup item)
* O - Special
* P - Jump
* [ - Block (use item)


## Tutorial: Running the Game Locally
Before running the game locally for development testing you must have repository be downloaded in a directory on your computer.

#### Using Python's Built-in HTTP Server
1. **Open a Terminal or Command Prompt**:
   - Navigate to the directory where your repository is located using the `cd` command.
2. **Start the Local Web Server**:
   - Run the following command:
     ```
     python -m http.server
     ```
     This command starts a IPV6 web server on port 8000 by default.
     
   - If this fails try specifying a IPV4 port by using this command:
     ```
     python -m http.server --bind 127.0.0.1 8000
     ```
3. **Open Game in Browser**:
   - Open a web browser and navigate to `http://localhost:8000` or `http://127.0.0.1:8000/` depending on which command you used in the previous step.
   - You should now be able to access and test marston vs west locally.

#### Using Visual Studio Code (with Live Server Extension)
1. **Install the Live Server Extension**:
   - Open Visual Studio Code and install the "Live Server" extension from the Extensions Tab.
2. **Open the Repository Directory in Visual Studio Code**:
3. **Start the Local Server**:
   - Right-click on the index.HTML file, which is the games entry point.
   - Select "Open with Live Server" from the context menu.
   - This will start a local web server and automatically open your game in the default web browser.


## Contributing
To contribute to this repository, please follow the following steps:

1. Fork the project.
2. Clone Your Forked Repository:
   `git clone <your-forked-repository>`
3. Create your feature branch to work on changes.
   `git checkout -b <your-feature-branch-name>`
4. Commit your changes to your feature branch.
   `git add <name-of-changed-file>`
   `git commit -m "<your-message>"`
5. For your first push to the new branch use the following:
   `git push --set-upstream origin <your-feature-branch-name>`
   Otherwise to push to current branch use the following:
   `git push`
6. Open a pull request to the original repository.


## Maintainers
This project is not actively being maintained.


## License
This project is distributed under the terms of the MIT license. Please review the license file for information on the terms of use and distribution.
