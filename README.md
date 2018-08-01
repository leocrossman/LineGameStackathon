# Line Game

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

  * Process

    1.  Get the data.
    2.  Define loss function.
        - Parameters _m_ and _b_ from equation of a line are our parameters that we pass to the loss function that allow us to create the predictions on our line to compare with the actual points from our data.
    3.  Define optimizer.
    4.  **Optimizer minimizes the loss function via the learning rate.**
