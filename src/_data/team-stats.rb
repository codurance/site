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
  "Analyst Craftsman" => "Analyst Craftspeople",
  "Analyst Craftsperson" => "Analyst Craftspeople"
}

team = YAML.load_file('team.yml').map { |person|
  person['role'] = role_aliases[person['role']] || person['role']
  person
}

roles = team.map { |person| person['role'] }.uniq
offices = team.map { |person| person['office'] }.uniq

def office_header(office)
  separator = "#{'-' * office.length}"
  puts separator
  puts office
  puts separator
end

total_employees = 0

offices.each { |office|
  employees = 0
  office_header(office)
  roles.each { |role|
    count = team.count { |person| person['role'] == role and person['office'] == office }
    if count > 0 then
      puts "#{count} #{role}"
      employees += count
    end
  }
  puts "(#{employees} employees at #{office})"
  total_employees += employees
}

puts "-------"
puts "#{total_employees} employees"

