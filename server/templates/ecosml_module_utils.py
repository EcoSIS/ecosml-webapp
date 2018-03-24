from os import path
from pandas import read_csv

def load_coefficients(csv_name, folder='coefficients'):
    dir, filename = path.split(__file__)
    return read_csv(path.join(dir, '..', folder, csv_name))