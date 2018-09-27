# Sample R Package

This is a sample R package.  It's highly recommended you format your R code
so it can be installed by other users.  This simple package shows you the 
basic layout of a R package as well as how to store and load data (a simple
csv file in this case).

Here is a great resource for creating and mainting your R package.  It's highly
recommended you read: http://r-pkgs.had.co.nz

## NAMESPACE file

The namespace file can be tricky in R and it is not recommended that you manually edit this file.  Please read http://r-pkgs.had.co.nz/namespace.html.

Here is a quick summary of how to expose a package function.

First, add the ```export``` comment:

```r
#' @export
helloworld <- function() {
  print("Hello world");
}
```

Then from the root of you package/repository in a terminal type the following:

```bash
$ r
> library(devtools)
> devtools::document()
```

This will update the NAMESPACE file.