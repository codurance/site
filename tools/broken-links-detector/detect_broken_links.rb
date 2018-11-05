#
# This is a broken links detector for the codurance website
#
require 'net/http'
require 'open3'



def main
  Dir.glob("src/_posts/**/*.md").each do |file|
    find_links(file)
  end
end

def find_links(file)
  #There is a warning not to use this with too large files. 
  #Here we are reading simple markdown files this should not be a problem
  file_content = File.read(file);
  file_content.scan(/(https.*)\)/).each do |match|
    url = match[0].split(' ')[0].split(')')[0].split('"')[0].split(']')[0]    
    check_link_exists(file, url)
  end  
end

def check_link_exists(source, url)

  Open3.popen3("curl -i -s --head '#{url}' --max-time 5") do |stdin, stdout, stderr|
    response = stdout.read

    #Allow 405 for now - site does not allow head
    if !(response =~ /(HTTP\/2 (200|405)|HTTP\/1.1 200|Status: 200 OK)/)

      status = ""
      begin
        status = response.scan(/HTTP\/(1.1|2)\s(.*)\r\n/ )[0][1]
      rescue
        status = "XXX"
      end  

      puts "Broken link found for: #{source} #{url} #{status}"
    end
  end
  
end  

main

