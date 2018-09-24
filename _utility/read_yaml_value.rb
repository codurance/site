# read_yaml_value.rb
require 'yaml'

file = ARGV[0]
key = ARGV[1]

keySegments = key.split(".")
yamlResult = YAML.load_file(file)

currentResult = yamlResult;

for segment in keySegments
   currentResult = currentResult[segment]
end

puts currentResult