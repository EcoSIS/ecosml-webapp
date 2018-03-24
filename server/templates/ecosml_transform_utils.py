from os import path
from pandas import read_csv

def load_input(csv_name, folder='input'):
    dir, filename = path.split(__file__)
    return read_csv(path.join(dir, '..', folder, csv_name))