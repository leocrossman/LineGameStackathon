# SmartLine

- Tensorflow

  - Background

    - Formula for a line is `y = mx + b`

      - _m_ is slope
      - _b_ is the y-intercept

  * Requirements

    - Data set
      - x and y coords

    * Loss Function

      - Many different loss functions
      - We will use Mean Squared Error
        - `(guess - y)^2`
      - This minimizes the vertical distance from each point to the line going between them.
        - The average of all these distances is the number that we want to minimize.

    * Optimizer
      - **Allows** us to minimize the Loss Function via a Learning Rate
      - FROM THE TF DOCS: Executes the loss function and minimizes the scalar output of the loss function by computing gradients of y with respect to the list of trainable variables provided by varList. If no list is provided, it defaults to all trainable variables.

    - Train
      - Minimize the loss function with the optimizer, adjusting m and b based on the loss function

- Process

  1.  Get the data.
  2.  Define loss function.
      - Parameters _m_ and _b_ from equation of a line are our parameters that we pass to the loss function that allow us to create the predictions on our line to compare with the actual points from our data.
  3.  Define optimizer.
  4.  **Optimizer minimizes the loss function via the learning rate.**

# Improvements

- Emit line's position to players, instead of coordinates.
  - The client would not have had to each make the calculations
  - The line would be in sync in all instances, thus making the game function as intended.
- Wanted to maybe reset the canvas's plotted points and give the line a default start but it was not that pressing an issue.
- Alternative game mode idea would have been to disable players wrapping around edges of the canvas and also make the line smaller and take up maybe a third of the screen.
