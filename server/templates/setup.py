import os
from setuptools import setup

def read(fname):
    return open(os.path.join(os.path.dirname(__file__), fname)).read()

setup(
    name = "{{name}}",
    version = "{{version}}",
    author = "{{author}}",
    description = ("{{overview}}"),
    license = "MIT",
    keywords = "{{keywords}}",
    url = "{{url}}",
    packages=[
        '{{name}}',
        '{{name}}.main'
    ],
    package_data={
      '{{name}}' : ['resources/*']
    },
    long_description=read('README.md'),
    classifiers=[
        "License :: OSI Approved :: MIT License",
    ],
)