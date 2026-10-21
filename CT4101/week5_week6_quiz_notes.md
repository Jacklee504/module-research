# CT4101 quiz notes: Weeks 5 and 6

## Lecture 3862706: Week 5, linear and logistic regression

- **Choose by target:** Linear regression predicts a continuous value. Logistic regression predicts a class probability from a linear score. Both use weighted feature sums.
- **Linear regression:** ŷ = β<sub>0</sub> + Σβ<sub>j</sub>x<sub>j</sub>. A residual is **observed − predicted** (y − ŷ). Ordinary least squares minimises Σ(y − ŷ)<sup>2</sup>, so large errors have extra influence. A coefficient is the predicted change for one unit of its feature, holding other represented features fixed.
- **Check the residuals:** A random residual-versus-fitted cloud supports the chosen linear form; a curve suggests missing nonlinear structure, and a funnel suggests changing error variance. Correlated predictors can make individual coefficients unstable even when predictions are adequate.
- **Regularisation:** Ridge adds an L2 penalty (Σβ<sub>j</sub><sup>2</sup>) and usually shrinks coefficients without setting them to zero. Lasso adds an L1 penalty (Σ|β<sub>j</sub>|) and can set some exactly to zero. Scale features and choose penalty strength using training-fold cross-validation.
- **Logistic regression:** p(y = 1 | x) = 1/(1 + e<sup>−z</sup>), where z = β<sub>0</sub> + Σβ<sub>j</sub>x<sub>j</sub>. At z = 0, p = 0.5. The model is linear in **log-odds**: log[p/(1 − p)] = z. e<sup>β<sub>j</sub></sup> is the odds multiplier for a one-unit increase in x<sub>j</sub>; it is not the probability increase.
- **Classification choices:** Log loss heavily penalises confident wrong probabilities. The classification threshold is chosen separately from fitting, based on validation evidence and error costs. In scikit-learn logistic regression, smaller **C** means stronger regularisation.
- **MCQ traps:** Linear predictions can fall outside [0, 1], so they are unsuitable as binary probabilities. Coefficients show conditional association, not causation. Fit preprocessing inside a pipeline and keep the final test set out of tuning.

## Lecture 3894876: Week 6, kNN and decision trees

- **How they predict:** k-nearest neighbours (kNN) stores labelled examples and uses the closest **k** at prediction time. Classification uses a vote; regression uses an average. A decision tree learns feature tests during training and follows one root-to-leaf path at prediction time.
- **Distance for kNN:** Euclidean is √Σ(a<sub>i</sub> − b<sub>i</sub>)<sup>2</sup>; Manhattan is Σ|a<sub>i</sub> − b<sub>i</sub>|. Minkowski with p = 1 gives Manhattan and p = 2 gives Euclidean. Scale features, or a large-unit feature can dominate the distance.
- **Choose k carefully:** Small k gives a flexible, noise-sensitive boundary (higher variance); large k smooths it (higher bias) and can favour a majority class. Distance weighting gives nearer points more influence. Tune k, distance, and weights with cross-validation on the training data.
- **kNN limitation:** Irrelevant features and high dimensions make neighbours less meaningful. Training is cheap, but storing examples and searching for neighbours makes prediction and memory use relatively costly.
- **Tree splitting:** A root is the first test, branches are test outcomes, and leaves give predictions. A good split reduces class impurity. Entropy = −Σp<sub>i</sub>log<sub>2</sub>p<sub>i</sub>; Gini = 1 − Σp<sub>i</sub><sup>2</sup>. Information gain is **parent entropy − weighted child entropy**; choose the greatest gain. Pure nodes have zero impurity.
- **Control overfitting:** Deep trees with tiny leaves have low bias and high variance. Limit depth, require larger leaves, or prune; choose these settings with cross-validation. Trees usually need no numerical scaling, but categorical inputs still need suitable encoding in scikit-learn.
- **MCQ traps:** kNN uses local examples; trees use axis-aligned rules. Compare them using the same data splits and metrics. Neither a tree split nor a model coefficient proves causation, and neither model extrapolates well.
