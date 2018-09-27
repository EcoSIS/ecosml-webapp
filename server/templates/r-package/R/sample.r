#' @export
testloadcsv <- function() {
  file = system.file("resources", "sample.csv", package=packageName())
  print(read.csv(file))
}

#' @export
helloworld <- function() {
  print("Hello world");
}