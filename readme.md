I. Game Idea
    A. Cathedral Board Game
        a. Two players have identical sets of buildings that have different shapes, and there is a grid board
        b. the purpose of the game is to put as many of your pieces on the board as possible, alternating turns with your opponent, the larger and more building placed on the board grid tally up the number of points you earn E.g. one building that takes up five squares is worth five points, and five buildings with one square accumulate five points.
        c. before gameplay, a large building (cathedral) is placed at random on the board
        d. then players alternate placing buildings and tallying points
        e. when there are no more possible options to place a new building, then the game is over, points are tallied and a winner is declared
II. Tech Stack
    A. Javascript
    B. CSS
    C. HTML
III. WireFrames
    A. Header
    B. H2 Instructions
    C  P with the instructions
    D. Player Board (grid?)
        a. left hand side displays player one's pieces that have not been played
            i. top grid box is static and only says Player One
            ii. Display the game pieces with their point values (and maybe an associated keystroke)
        b. center is the game board where players place the pieces takes up 60% of the space
        c. right hand side displays player two's unused pieces
            i. top grid box is static only says Player Two
            ii. display the unused game pieces with their point value (and maybe an associated keystroke)
    E. Footer
        a. Left side div tallies player one's points
        b. center div announces who's turn it is and then announces the victor
        c. right hand div tallies player two's points
IV. MVP Goals
    1. Render boardgame
    2. Render game pieces that are individualized
    3. Render a randomly generated cathedral
    4. Make java script to select pieces and then move them
V. Stretch Goals
    1.  click and drag feature for the buildings
    2. Make the images for each of the buildings attractive
    3. allow for sections of the board to be closed off if a player creates a line across the entire boared aka enclaves
    4. Add in Medieval music with controls for it
VI. Any roadblocks
    A. Getting the tic-tac-toe assignment finished in addtion to the project will slow me down
    B. I still have difficulty understanding javascript, and how to make it grab items that I would want to use

I. Game Idea
    A. Hnefatafl
        a. there are two teams: attackers and defenders. The attackers have 16 pieces and are trying to kill the king. Defenders have 9 pieces including a king piece, and win if the king reaches the edge of the board
        b. All pieces move in cardinal directions; only one direction at a time; 
        c. pawns of both armies die if they are trapped between two pieces of the opposing army. or between an opponent and the castle (center square)
        d. the king dies if trapped between for pieces of the opposing army or three pieces and the castle
        e. pieces cannot go through each other or the castle
II. Tech Stack
    A. Javascript
    B. CSS
    C. HTML
III. WireFrames
    A. Header
    B. Board
        a. 9 * 9 board
            i. make the board with a flex wrap
            ii. center tile has to have different rules so the it can register collisions and thereby kill pieces
            iii. edge tiles need special rules to register collisions with the king and trigger vicory
        b. center tile is the castle
        c. start tiles for the game pieces are fixed and color coded
    C. Footer: displays turns and winner.
    D. Timed reset after victory
IV. MVP Goals
    A. Fully rendered game board
    B. Fully rendered pieces
        a. piecemeal each of the steps for clicking and move pieces
    C. Pieces able to move appropriately
V. Stretch Goals
    A. Make the tiles stylized
    B. Banner animations for victory or defeat
    C. Add in Medieval music with controls for it
VI. Any roadblocks
    A. Getting the tic-tac-toe assignment finished in addtion to the project will slow me down
    B. I still have difficulty understanding javascript, and how to make it grab items that I would want to use

    *look at minesweeper for win conditions and checking squares next to each other



I. Game Idea
    A. Easy Battle Ship
        a. Two players have individualized grids of 10*10
        b. Each player has ten ships of different lengths randomly generated on the board, and hidden from view
        c. Players take turns selecting tiles which either mark as empty or as a hit
        d. The first player to sink all of the ships of their opponement is declared the winner
        
II. Tech Stack
III. WireFrames
    A. Header
    B. Ten * ten board game for player one's boats
    C. second ten * ten board game for player two's boats
    D. Footer
        a. display for player one to tally hits
        b. center box to display the winner
        c. right hand box to display player two's 
IV. MVP Goals
    A. Fully rendered boards with tiling
    B. Ability to randomly distribute the game pieces
    C. Display features for the points
V. Stretch Goals
    A. Ocean ship and explosion animations
    B. build out four grids: two for the ships and two for the players tracking grids for the players to make selections on
    C. Allow players to place their own ships
    D. Add in music with controls for it
VI. Any roadblocks
    A. Getting the tic-tac-toe assignment finished in addtion to the project will slow me down
    B. I still have difficulty understanding javascript, and how to make it grab items that I would want to use