set -e

function cleanup {
  docker-compose down -v
}

function waitForHttp {
  attempt_counter=0
  max_attempts=120

  printf 'Visual regression tests are waiting for the website to start'

  until $(curl --output /dev/null --silent --head --fail $1); do
      if [ ${attempt_counter} -eq ${max_attempts} ];then
        echo "Can't connect to website for visual regression tests"
        exit 1
      fi

      printf '.'
      attempt_counter=$(($attempt_counter+1))
      sleep 5
  done

  printf ' website started!'
}

trap cleanup EXIT

function runBackstopCommand {
  command=$1

  cleanup
  docker-compose build visual_regression_tests
  docker-compose up -d site
  waitForHttp localhost:4000/en/assets/custom/img/blog/swan.png #We wait on an image because Jekyll loads images last
  docker-compose run visual_regression_tests $command
}
