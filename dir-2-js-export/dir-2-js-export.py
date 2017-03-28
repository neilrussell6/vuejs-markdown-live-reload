#!/usr/bin/python

import getopt
import os
import sys
import argparse
import logging

#--------------------
# utils
#--------------------

def path2Key(path):
    return os.path.splitext(path)[0].replace(args.src, "").strip("./").replace("/", "__").replace("-", "_")

def path2Label(path):
    return os.path.splitext(path)[0].rsplit('/', 1)[-1].replace("-", " ").capitalize()

def path2File(path, ext):
    _path = os.path.splitext(path)[0].replace(args.remove, "").strip("./")
    return '%s.%s' % (_path, ext)

#--------------------
# args
#--------------------

def parse_args():

    parser = argparse.ArgumentParser(description='Creates a JavaScript file containing es6 exports for each targeted file in a targeted directory.')

    parser.add_argument('src', help="target source directory")
    parser.add_argument('-e', '--ext', help="extension to target in source directory")
    parser.add_argument('-o', '--output', help="output file path")
    parser.add_argument('-r', '--remove', help="text to remove from import url")

    return parser.parse_args()

#--------------------
# main
#--------------------

def main(args):

    # get path list
    path_list = []
    for root, subdirs, files in os.walk(args.src):
        files.sort()
        filtered_paths = list(filter(lambda file: file.endswith(args.ext), files))
        path_list += list(map(lambda filename: os.path.join(root, filename), filtered_paths))

    # create result
    result = ""

    # create result : imports
    for path in path_list:
        _key = path2Key(path)
        _file = path2File(path, "html")
        result += 'import _%s from "%s";\n' % (_key, _file)

    result += '\n'

    # create result : consts
    for path in path_list:
        _key = path2Key(path)
        _label = path2Label(path)
        result += 'const %s = { template: _%s, label: "%s" };\n' % (_key, _key, _label)

    result += '\n'

    # create result : export
    key_list = map(path2Key, path_list)
    result += 'export {\n\t%s\n};\n' % (",\n\t".join(key_list))

    # write
    output_file = open(args.output, 'w')
    try:
        output_file.write(result)
    finally:
        output_file.close()

#--------------------
# init
#--------------------

if __name__ == '__main__':
    args = parse_args()
    main(args)
