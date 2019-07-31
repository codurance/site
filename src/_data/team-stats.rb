#!/usr/bin/env ruby

require 'yaml'

Dir.chdir File.dirname __FILE__

role_aliases = {
  "Software Craftsman and Co-Founder" => "Software Craftspeople",
  "UX Craftswoman" => "UX Craftspeople",
  "Software Craftsman" => "Software Craftspeople",
  "Software Craftswoman" => "Software Craftspeople",
  "Software Craftsperson" => "Software Craftspeople",
  "Principal Craftsperson" => "Software Craftspeople",
  "Head of Recruitment (UK)" => "Head of Recruitment",
  "Head of Sales (Spain)" => "Head of Sales",
  "Head of Professional Services (Spain)" => "Head of Professional Services",
  "Analyst Craftsman" => "Analyst Craftspeople",
  "Analyst Craftsperson" => "Analyst Craftspeople"
}

team = YAML.load_file('team.yml').map { |person|
  person['role'] = role_aliases[person['role']] || person['role']
  person
}

roles = team.map { |person| person['role'] }.uniq
offices = team.map { |person| person['office'] }.uniq

# sites = team.map { |p| p[:] }.uniq
offices.each { |office|
  puts office
  roles.each { |role|
    count = team.count { |person| person['role'] == role and person['office'] == office }
    if count > 0 then
      puts "#{count} #{role}"
    end
  }
}
