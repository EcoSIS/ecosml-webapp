# Package Data

Here is the recommended location to store package data in a R package.  Please read the following for more information: http://r-pkgs.had.co.nz/data.html.
Note, it is recommended that EcoSML packages use a ```/inst/resources``` directory instead of ```/inst/data```.

To load a data file from this directory, run the following in R.

From a function inside the package:

```r
system.file("resources", "sample.csv", package=packageName())
```

Load package data from outside the package

```r
system.file("resources", "sample.csv", package="[[packageName]]")
```