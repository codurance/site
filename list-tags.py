#!/usr/bin/env python

import pip, sys
 
def require(*packages):
    for package in packages:
        try:
            if not isinstance(package, str):
                import_name, install_name = package
            else:
                import_name = install_name = package
            __import__(import_name)
        except ImportError:
 
            cmd = ['install', install_name]
            if not hasattr(sys, 'real_prefix'):
                cmd.append('--user')
            pip.main(cmd)
 
require('PyYAML')

import yaml
from collections import defaultdict
import os
import operator
import csv

all_tags = defaultdict(int)

for filename in os.listdir('_posts'):
    with open("_posts/" + filename, 'r') as stream:
	try:
	    post_metadata = yaml.load_all(stream).next()
	    if 'tags' in post_metadata:
		for tag in post_metadata['tags']:
		  all_tags[tag] = all_tags[tag] + 1
	except yaml.YAMLError as exc:
	    print(exc)

all_tags_sorted = sorted(all_tags.items(), key=operator.itemgetter(1))

csv_out = csv.writer(sys.stdout)
for tag_with_count in all_tags_sorted:
  csv_out.writerow(tag_with_count)