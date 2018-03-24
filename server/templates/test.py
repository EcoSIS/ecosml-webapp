## import main source
from os import path
# import python unittest class
import sys, unittest
# add the root package page to python system path so
# we can import the main package module
sys.path.append(path.join('..', '..'))

# import pandas csv reader and frame unit tester
from pandas import read_csv
from pandas.testing import assert_frame_equal

# import the transform functions
# TODO: uncomment if you have a transform for this example
# from transform.normalize import transform

# import the main package module model 
# TODO: rename to your package
import {{name}}.main.model as model

# helper function to load example inputs from input folder
def load(csv, folder='input'):
  dir, filename = path.split(__file__)
  return read_csv(path.join(dir, folder, csv))

class TestPackage(unittest.TestCase):

  def setUp(self):
    # load your example spectra from the inputs folder
    # TODO: rename to whatever your spectra file is called
    self.spectra = load('ExampleInputSpectra.csv')

  def test_model(self):
    # Assert your transform fuction workers
    # TODO: uncomment if you have a transform for this example
    # self.spectra = transform(self.spectra)
    # TODO: rename to normalized spectra example file in output folder
    # assert_frame_equal(self.spectra, load('ExampleSpectra_Normalized.csv', 'output'))

    # actually run the model
    result = model.run(self.spectra)
    # assert the model gives the desired results
    # TODO: rename to output spectra CSV file
    assert_frame_equal(result, load('ExampleOutput_Predictions.csv', 'output'))

if __name__ == '__main__':
  unittest.main()